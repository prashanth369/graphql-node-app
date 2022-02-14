import VehicleMakes from '../../database/models/VehicleMake'

const fetchVehicleMakesFromDB = async (limit) => {
  let vehicleData = []

  if (limit && limit > 0) {
    vehicleData = await VehicleMakes.find()
      .limit(limit)
      .populate('vehicleTypes', 'typeId typeName')
  } else {
    vehicleData = await VehicleMakes.find().populate(
      'vehicleTypes',
      'typeId typeName'
    )
  }

  return vehicleData
}

const resolvers = {
  Query: {
    getAllVehicles: (_parent, args) => fetchVehicleMakesFromDB(args.limit)
  }
}

export default resolvers
