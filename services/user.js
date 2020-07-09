const bcode = require('../libs/business_code')

module.exports = {
  async list ({ page, size }) {
    const result = await global.db.user.findAndCountAll({
      where: {},
      limit: size,
      offset: (page - 1) * size
    })
    return {
      status: bcode.QUERY_SUCCESS,
      data: {
        total: result.count,
        data: result.rows
      }
    }
  },
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