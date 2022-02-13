import mongoose from 'mongoose'

const { Schema } = mongoose
const vehicleTypeSchema = new Schema({
  typeId: {
    type: String,
    required: true
  },
  typeName: {
    type: String,
    required: true
  }
})

const VehicleType = mongoose.model('VehicleType', vehicleTypeSchema)

export default VehicleType
