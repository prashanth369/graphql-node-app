import { Parser } from 'xml2js'
import lodash from 'lodash'

const { get } = lodash

describe('Test for data transformation', () => {

  test('Test XML data Parsing', async () => {
    const parser = new Parser()
    const xmlData = `
        <Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <Count>2</Count>
            <Message>Response returned successfully</Message>
            <Results>
                <AllVehicleMakes>
                    <Make_ID>440</Make_ID>
                    <Make_Name>ASTON MARTIN</Make_Name>
                </AllVehicleMakes>
                <AllVehicleMakes>
                    <Make_ID>441</Make_ID>
                    <Make_Name>TESLA</Make_Name>
                </AllVehicleMakes>
            </Results>
        </Response>
    `
    const parsedData = await parser.parseStringPromise(xmlData)
    const expectedResponseCount = get(parsedData, 'Response.Count[0]')
    const expectedAllVehicleMakes = get(
      parsedData,
      'Response.Results[0].AllVehicleMakes'
    )
    const makeId1 = get(expectedAllVehicleMakes, '[0].Make_ID[0]')
    const makeId2 = get(expectedAllVehicleMakes, '[1].Make_ID[0]')
    const makeName1 = get(expectedAllVehicleMakes, '[0].Make_Name[0]')
    const makeName2 = get(expectedAllVehicleMakes, '[1].Make_Name[0]')

    expect(expectedResponseCount).toBe('2')
    expect(expectedAllVehicleMakes).toHaveLength(2)
    expect(makeId1).toBe('440')
    expect(makeId2).toBe('441')
    expect(makeName1).toBe('ASTON MARTIN')
    expect(makeName2).toBe('TESLA')
  })
})
