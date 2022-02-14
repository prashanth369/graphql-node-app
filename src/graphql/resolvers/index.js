import VehicleMake from '../../database/models/VehicleMake.js'

const fetchVehicleMakesFromDB = async (limit) => {
  let vehicleData = []

  try {
    if (limit && limit > 0) {
      vehicleData = await VehicleMake.find()
        .limit(limit)
        .populate('vehicleTypes', 'typeId typeName')
    } else {
      vehicleData = await VehicleMake.find().populate(
        'vehicleTypes',
        'typeId typeName'
      )
    }
  } catch (err) {
    throw Error(' Data could not be fetched', err.message)
  }
  return vehicleData
}

const resolvers = {
  Query: {
    getAllVehicles: (_parent, { limit }) => fetchVehicleMakesFromDB(limit)
  }
}

export default resolvers
