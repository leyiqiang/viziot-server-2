const redis = require('redis')
const config = require('./config/config')
const redisClient = redis.createClient(config.redisPort, config.redisHost)

module.exports = redisClient