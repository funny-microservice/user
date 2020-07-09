const http = require('http')
const app = require('../app')
const db = require('../libs/db')
const PORT = 3000
let server

process.addListener('uncaughtExceptionMonitor', (error) => {
  console.log('uncaught exception occur', error)
})
process.addListener('unhandledRejection', (error) => {
  console.log('uncaught rejecttion occur', error)
})

module.exports = {
  start (port = PORT, done) {
    db
      .sync()
      .then(() => {
        server = http.createServer(app)
        server.listen(port, () => {
          console.log(`server started on port: ${port}`)
          typeof done === 'function' && done()
        })
      })
  },
  close (done) {
    server.close(() => {
      console.log('server stopped')
      db
        .close()
        .then(() => {
          typeof done === 'function' && done()
        })
    })
  }
}