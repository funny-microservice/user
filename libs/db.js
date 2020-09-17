const Sequelize = require('sequelize')
const User = require('../models/user')
const sequelize = new Sequelize('mysql://dev:abc,.123@192.168.3.4:13306/demo_user_db', {
  pool: {
    max: 18, // 8 nodes
    // max: 37, 4 nodes
    min: 5,
    idle: 10000
  },
  logging: false // disable logging to console
})
global.db = {
  user: User(sequelize)
}

module.exports = sequelize