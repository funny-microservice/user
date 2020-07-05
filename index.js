const express = require('express')
const app = express()
const userRoute = require('./routes/user')

app.use('/users', userRoute)

// capture all unhandled requests
app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

module.exports = app