const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const config = require('./config/config')
const expressConfig = require('./config/express')
const routesConfig = require('./config/routes')

class Server {
  constructor() {
    this.app = express()
    this.config = config

    this.init()
  }

  init() {
    // HTTP request logger
    this.app.use(morgan('dev'))

    // express settings
    expressConfig(this.app)

    // connect to database
    mongoose.connect(this.config.db, { useNewUrlParser: true })
      .then(() => {
        console.log(`[MongoDB] connected: ${this.config.db}`)

        // initialize api
        routesConfig(this.app)

        // start server
        this.app.listen(this.config.apiPort, () => {
          console.log(`[Server] listening on port ${this.config.apiPort}`)
        })
      })
      .catch(err => {
        console.log(`[MongoDB] Failed to connect. ${err}`)
      })
  }
}

module.exports = new Server().app
