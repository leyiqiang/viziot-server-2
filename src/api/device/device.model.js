const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
  macAddress: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deviceCategory: {
    type: [String],
    default: [],
  }
})


const DeviceString = 'Device'
const DeviceModel = mongoose.model(DeviceString, DeviceSchema)

module.exports = {
  DeviceString,
  DeviceSchema,
  DeviceModel,
}
