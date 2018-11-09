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

async function getTotalCountOfRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  const result = await getAggregateCountDataByTime(startMS, endMS)
  if (result.length > 0) {
    return {
      count: result[0].count
    }
  } else {
    return {
      count: 0
    }
  }
}

async function getTotalCountFromStartOfTheDay() {
  let startMS = getStartOfToday()
  let endMS = getNow()

  const result = await getAggregateCountDataByTime(startMS, endMS)
  if (result.length > 0) {
    return {
      count: result[0].count
    }
  } else {
    return {
      count: 0
    }
  }

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
