import axios from 'axios'
import { Parser } from 'xml2js'
import lodash from 'lodash'
import VehicleMake from './models/VehicleMake.js'
import VehicleType from './models/VehicleType.js'

// Constants
const parser = new Parser()
const { get } = lodash
const DOCUMENT_UPDATE_OPTIONS = {
  upsert: true,
  new: true,
  setDefaultsOnInsert: true
}

/**
 * Returns the API formatted data
 *
 * @param {string} url The URL to fetch the data from
 * @return {object} The API data formatted from XML to JS Object
 */

const fetchData = async (url) => {
  let returnData
  try {
    const { data } = await axios(url)
    returnData = await parser.parseStringPromise(data)
  } catch (err) {
    console.log('Fetch Data erro ', err.messgae, url)
  }

  return returnData
}

/**
 * Stores Vehicle Makes and Vehicle Types documents to Datastore
 *
 * @param {object} data The object that has vehicleTypes data for each vehicle make
 * @param {string} makeId The Make Id of the vehicleMakes data
 * @param {string} makename The Make Name of the vehicleMakes data
 */

const saveDocumentToDataStore = async (data, makeId, makeName) => {
  const vehicleTypePromises = []
  const responseCount = get(data, 'Response.Count[0]')

  /**
   * If a Vehicle make has associated vehicle types, then save them
   * and attach them to vehicleMake document
   */
  if (responseCount && parseInt(responseCount, 10) > 0) {
    const vehicleTypes = get(
      data,
      'Response.Results[0].VehicleTypesForMakeIds',
      []
    )
    vehicleTypes.forEach(async (vehicleType) => {
      const typeId = get(vehicleType, 'VehicleTypeId[0]')
      const typeName = get(vehicleType, 'VehicleTypeName[0]')

      const query = { typeId }
      vehicleTypePromises.push(
        VehicleType.findOneAndUpdate(
          query,
          { typeId, typeName },
          DOCUMENT_UPDATE_OPTIONS
        )
      )
    })
  }

  try {
    const query = { makeId }
    const updateData = {
      makeId,
      makeName,
      vehicleTypes: []
    }

    /**
     * If the Vehicle Makes has associated vehicleTypes,
     * store the vehicleTypes in datastore if they are not already in the datastore
     * and then store VehicleMake in the datastore
     */

    if (vehicleTypePromises.length > 0) {
      const vehicleTypedata = await Promise.all(vehicleTypePromises)
      const vehicleTypeDocumentIds = vehicleTypedata.map(
        (document) => document._id
      )
      updateData.vehicleTypes = vehicleTypeDocumentIds

      await VehicleMake.findOneAndUpdate(
        query,
        updateData,
        DOCUMENT_UPDATE_OPTIONS
      )
    } else {
      await VehicleMake.findOneAndUpdate(
        query,
        updateData,
        DOCUMENT_UPDATE_OPTIONS
      )
    }
  } catch (err) {
    console.log('Error saving the vehiclemake', err.message)
  }
}

/**
 * Takes the Vehicle Makes data and sends chunks of requests to
 * fetch vehicleTypes for Each vehicle make
 *
 * @param {object[]} vehicleMakesArray Vehicle Makes Data as an Array
 */

const processRequestChunks = async (vehicleMakesArray) => {
  while (vehicleMakesArray.length) {
    await Promise.all(
      vehicleMakesArray.splice(0, 10).map(async (vehicleMake) => {
        const makeId = get(vehicleMake, 'Make_ID[0]', '')
        const makeName = get(vehicleMake, 'Make_Name[0]', '')
        const vehicleTypeUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=XML`

        return fetchData(vehicleTypeUrl)
          .then((data) => saveDocumentToDataStore(data, makeId, makeName))
          .catch((err) => console.log(
              ' Error processing in the request chunks',
              err.message,
              makeId
            ))
      })
    )
  }
}

/**
 * This Function is Responsible for fetching VehicleMakes Data
 */

const processDocumentsData = async () => {
  const vehicleMakesURL =
    'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML'

  try {
    const vehicleMakesDataset = await fetchData(vehicleMakesURL)
    if (vehicleMakesDataset) {
      const responseCount = get(vehicleMakesDataset, 'Response.Count[0]')

      if (responseCount && parseInt(responseCount, 10) > 0) {
        const vehicleMakesArray = get(
          vehicleMakesDataset,
          'Response.Results[0].AllVehicleMakes',
          []
        )
        processRequestChunks(vehicleMakesArray)
      }
    }
  } catch (err) {
    console.log('The error message: ', err.message, vehicleMakesURL)
  }
}

export default processDocumentsData
