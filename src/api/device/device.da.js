const { DeviceModel } = require('./device.model')

module.exports = {
  getAll,
}

async function getAll() {
  return DeviceModel.find({})
}
