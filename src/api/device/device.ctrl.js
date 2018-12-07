const _ = require('lodash')
const HttpStatus = require('http-status-codes')

const DeviceDa = require('./device.da')

module.exports = {
  getAllDevices,
}

async function getAllDevices(req, res) {
  try {
    const data = await DeviceDa.getAll()
    return res.json(data)
  } catch (e) {
    // TODO: log the error
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(e.message)
  }
}
