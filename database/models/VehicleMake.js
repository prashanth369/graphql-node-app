import mongoose from 'mongoose'

const { Schema } = mongoose
const vehicleMakeSchema = new Schema({
  makeId: {
    type: String,
    required: true
  },
  makeName: {
    type: String,
    required: true
  },
  vehicleTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleType'
    }
  ]
})

const VehicleMake = mongoose.model('VehicleMake', vehicleMakeSchema)

export default VehicleMake
