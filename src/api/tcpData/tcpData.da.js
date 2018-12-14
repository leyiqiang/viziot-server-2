const _ = require('lodash')

const { TcpDataModel } = require('./tcpData.model')
const { TcpAggregatedDataModel } = require('./tcpAggregatedData.model')
const { getStartOfToday, getNow } = require('../../util/time')
module.exports = {
  getRecentDataWithinNSeconds,
  getTotalCountFromStartOfTheDay,
  getTotalCountOfRecentDataWithinNSeconds,
  getTotalSizeOfRecentDataWithinNSeconds,
}

async function getRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  return getAggregateDataByTime(startMS, endMS)
}

async function getTotalSizeOfRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  const size = await getAggregateSizeDataByTime(startMS, endMS)
  return {
    size,
    startMS,
    endMS,
  }
}

async function getTotalCountOfRecentDataWithinNSeconds(pastMS) {
  if (_.isNil(pastMS)) {
    throw Error('n is undefined')
  }
  const endMS = Date.now()
  const startMS = endMS - pastMS
  const count = await getAggregateCountDataByTime(startMS, endMS)
  return {
    count,
    startMS,
    endMS,
  }
}

async function getTotalCountFromStartOfTheDay() {
  const startMS = getStartOfToday()
  const endMS = getNow()

  const count = await getAggregateCountDataByTime(startMS, endMS)

  return {
    count,
    startMS,
    endMS,
  }
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


async function getAggregateSizeDataByTime(startMS, endMS) {

  const resultsFromTcpData = await TcpDataModel.aggregate([
    {
      $match: {
        timestamp: { $gte: startMS, $lte: endMS },
      },
    },
    { $group: { _id: null, size: { $sum: '$packet_size' } } },
  ])

  const resultsFromAggregatedData = await TcpAggregatedDataModel.aggregate([
    {
      $match: {
        startMS: { $gte: startMS },
        endMS: { $lte: endMS}
      },
    },
    { $group: { _id: null, size: { $sum: '$totalPacketSize' } } },
  ])

  let size = 0

  if (resultsFromTcpData.length > 0) {
    // console.log('resultsFromTcpData: ' + resultsFromTcpData[0].size)
    size += resultsFromTcpData[0].size
  }

  if (resultsFromAggregatedData.length > 0) {
    // console.log('resultsFromAggregatedData: ' + resultsFromAggregatedData[0].size)
    size += resultsFromAggregatedData[0].size
  }

  return size
}



async function getAggregateDataByTime(startMS, endMS) {
  return TcpDataModel.find({
    timestamp: { $gte: startMS, $lte: endMS },
  })
}
