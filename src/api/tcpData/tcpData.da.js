const _ = require('lodash')

const { TcpDataModel } = require('./tcpData.model')
const { getStartOfToday, getNow } = require('../../util/time')
module.exports = {
  getRecentDataWithinNSeconds,
  getTotalCountFromStartOfTheDay,
  getTotalCountOfRecentDataWithinNSeconds,
}

async function getRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  return getAggregateDataByTime(startMS, endMS)
}

function processResult(result, startMS, endMS) {
  const res = {}
  if (result.length > 0) {
    res['count'] = result[0].count
  } else {
    res['count'] = 0
  }

  res['startMS'] = startMS
  res['endMS'] = endMS
  return res
}

async function getTotalCountOfRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  const result = await getAggregateCountDataByTime(startMS, endMS)
  return processResult(result, startMS, endMS)
}

async function getTotalCountFromStartOfTheDay() {
  const startMS = getStartOfToday()
  const endMS = getNow()

  const result = await getAggregateCountDataByTime(startMS, endMS)

  return processResult(result, startMS, endMS)
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
