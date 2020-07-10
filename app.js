const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')

const userRoute = require('./routes/user')
const bcode = require('./libs/business_code')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(compression())
app.use('/users', userRoute)

// capture all unhandled requests
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(bcode.genResult(bcode.SERVER_ERROR, { message: err.message, stack: err.stack }))
  } else {
    res.status(404).json(bcode.genResult(bcode.NOT_FOUND))
  }
})

module.exports = app