const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
const bcode = require('./libs/business_code')

app.use(bodyParser.json())
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