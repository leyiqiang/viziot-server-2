
const express = require('express')
const ctrl = require('./device.ctrl')

const router = express.Router()

router
  // GET /api/v1/device/all - Get all devices
  .route('/device/all')
  .get(ctrl.getAllDevices)


module.exports = router
