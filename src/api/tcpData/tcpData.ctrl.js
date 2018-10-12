const _ = require('lodash')
const HttpStatus = require('http-status-codes')

const TcpDataDa = require('./tcpData.da')

module.exports = {
  getRecentDataWithinNSeconds,
}

async function getRecentDataWithinNSeconds(req, res) {
  let { pastMS } = req.body
  pastMS = parseInt(pastMS)
  if (!_.isNumber(pastMS) || _.isNaN(pastMS)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(`Illegal Argument pastMS, expected Number, got ${pastMS}`)
  }
  const data = await TcpDataDa.getRecentDataWithinNSeconds(pastMS)
  return res.json(data)
}
