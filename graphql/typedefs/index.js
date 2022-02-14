import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type VehicleMake {
    makeId: String!
    makeName: String!
    vehicleTypes: [VehicleTye!]
  }

  type VehicleTye {
    typeId: String!
    typeName: String!
  }

  #Query

  type Query {
    getAllVehicles(limit: Int): [VehicleMake!]!
  }
`

export default typeDefs
