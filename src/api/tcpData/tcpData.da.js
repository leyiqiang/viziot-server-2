const _ = require('lodash')

const { TcpDataModel } = require('./tcpData.model')
const { getStartOfToday, getNow } = require('../../util/time')
module.exports = {
  getRecentDataWithinNSeconds,
  getTotalCountFromStartOfTheDay,
}

async function getRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  return getAggregateDataByTime(startMS, endMS)
}

async function getTotalCountFromStartOfTheDay() {
  let startMS = getStartOfToday()
  let endMS = getNow()

  return getAggregateCountDataByTime(startMS, endMS)

}

async function getAggregateCountDataByTime(startMS, endMS) {

  return TcpDataModel.aggregate([
    {
      $match: {
        timestamp: { $gte: startMS, $lte: endMS },
      },
    },
    { $group: { _id: null, count: { $sum: 1 } } }
  ])
}

async function getAggregateDataByTime(startMS, endMS) {
  return TcpDataModel.find({
    timestamp: { $gte: startMS, $lte: endMS },
  })
}
