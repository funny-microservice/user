const app = require('./index')
const http = require('http')
const PORT = 3000

http
  .createServer(app)
  .listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
  })

process.addListener('uncaughtExceptionMonitor', (error) => {
  console.log('uncaught exception occur', error)
})
process.addListener('unhandledRejection', (error) => {
  console.log('uncaught rejecttion occur', error)
})