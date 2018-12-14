const _ = require('lodash')

const { TcpDataModel } = require('./tcpData.model')
const { TcpAggregatedDataModel } = require('./tcpAggregatedData.model')
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

function processResult(count, startMS, endMS) {
  const res = {
    count,
    startMS,
    endMS
  }
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

  const resultsFromTcpData = await TcpDataModel.aggregate([
    {
      $match: {
        timestamp: { $gte: startMS, $lte: endMS },
      },
    },
    { $group: { _id: null, count: { $sum: 1 } } },
  ])
  console.log(resultsFromTcpData)

  const resultsFromAggregatedData = await TcpAggregatedDataModel.aggregate([
    {
      $match: {
        startMS: { $gte: startMS },
        endMS: { $lte: endMS}
      },
    },
    { $group: { _id: null, count: { $sum: '$packetCount' } } },
  ])

  let count = 0

  if (resultsFromTcpData.length > 0) {
    // console.log('resultsFromTcpData: ' + resultsFromTcpData[0].count)
    count += resultsFromTcpData[0].count
  }

  if (resultsFromAggregatedData.length > 0) {
    // console.log('resultsFromAggregatedData: ' + resultsFromAggregatedData[0].count)

    count += resultsFromAggregatedData[0].count
  }

  return count
}

async function getAggregateDataByTime(startMS, endMS) {
  return TcpDataModel.find({
    timestamp: { $gte: startMS, $lte: endMS },
  })
}
