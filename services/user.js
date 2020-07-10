const bcode = require('../libs/business_code')

module.exports = {
  async list (page, size) {
    const result = await global.db.user.findAndCountAll({
      where: {},
      limit: size,
      offset: (page - 1) * size
    })
    if (result.rows.length > 0) {
      return {
        status: bcode.QUERY_SUCCESS,
        data: {
          total: result.count,
          data: result.rows
        }
      }
    } else {
      return {
        status: bcode.QUERY_EMPTY,
        data: {
          total: result.count,
          data: result.rows
        }
      }
    }
  },
  async getById (userId) {
    const result = await global.db.user.findOne({
      where: { id: userId }
    })
    if (result) {
      return {
        status: bcode.USER_FOUND,
        data: result
      }
    } else {
      return {
        status: bcode.USER_NOT_FOUND,
        data: null
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
  },
  async edit (userId, userObj) {
    const existUserResult = await this.getById(userId)
    if (existUserResult.status === bcode.USER_FOUND) {
      const updatedUser = await existUserResult.data.update({
        username: userObj.username,
        password: userObj.password,
        gender: userObj.gender
      })
      return {
        status: bcode.USER_UPDATED,
        data: updatedUser
      }
    }
    return existUserResult
  },
  async remove (userId) {
    await global.db.user.destroy({
      where: { id: userId }
    })
    return {
      status: bcode.USER_DELETED,
      data: null
    }
  }
}