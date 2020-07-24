const express = require('express')
const consola = require('consola')
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors');
const appConfig = require("../nuxt.config");

var db = mongoose.connect(appConfig.env.mongoUrl, { useNewUrlParser: true });

const { Nuxt, Builder } = require('nuxt')
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)



// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
