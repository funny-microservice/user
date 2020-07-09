const bcode = require('../libs/business_code')

module.exports = {
  async create (userObj) {
    const existUser = await global.db.user.findOne({
      where: { username: userObj.username }
    })
    if (existUser) {
      return {
        status: bcode.USERNAME_EXISTED,
        data: null
      }
    } else {
      const newUser = await global.db.user.create({
        username: userObj.username,
        password: userObj.password,
        gender: userObj.gender
      })
      return {
        status: bcode.USER_CREATED,
        data: newUser
      }
    }
  }
}