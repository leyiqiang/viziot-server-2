const dotEnv = require('dotenv')
dotEnv.config({
  path: '.env',
})

require('./src/server')