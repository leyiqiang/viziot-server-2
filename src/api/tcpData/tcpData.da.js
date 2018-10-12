const _ = require('lodash')

const { TcpDataModel } = require('./tcpData.model')

module.exports = {
  getRecentDataWithinNSeconds,
}

async function getRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  return getAggregateDataByTime(startMS, endMS)
}


async function getAggregateDataByTime(startMS, endMS) {
  return TcpDataModel.find({
    timestamp: { $gte: startMS, $lte: endMS },
  })
}
