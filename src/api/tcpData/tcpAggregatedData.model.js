const mongoose = require('mongoose')
const { Schema } = mongoose

const TcpAggregatedDataSchema = new Schema({
  totalPacketSize: { type: Number },
  count: { type: Number },
  startMS: { type: Number },
  endMS: { type: Number },
  src_ip: { type: String },
  dst_ip: { type: String },
}, {
  autoIndex: false,
})

TcpAggregatedDataSchema.index({
  startMS: -1,
})
TcpAggregatedDataSchema.index({
  endMS: -1,
})

const TcpAggregatedDataString = 'tcpAggregatedData'
const TcpAggregatedDataModel = mongoose.model(TcpAggregatedDataString, TcpAggregatedDataSchema, TcpAggregatedDataString)

TcpAggregatedDataModel.createIndexes()

module.exports = {
  TcpAggregatedDataSchema,
  TcpAggregatedDataString,
  TcpAggregatedDataModel,
}
