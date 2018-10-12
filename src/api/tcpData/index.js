
const express = require('express')
const ctrl = require('./tcpData.ctrl')

const router = express.Router()

router
  .route('/tcpData/recentData')
  // GET /api/v1/tcpData/recentData - Get list of recentTcpData
  .post(ctrl.getRecentDataWithinNSeconds)


module.exports = router
