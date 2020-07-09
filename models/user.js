const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      defaultValue: 'male'
    }
  })
}