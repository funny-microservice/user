module.exports = {
  USER_CREATED: {
    code: 10000,
    message: '新增用户成功'
  },
  USERNAME_EXISTED: {
    code: 10001,
    message: '用户名已存在'
  },
  INVALID_PARAMS: {
    code: 90
  },
  NOT_FOUND: {
    code: 404,
    message: '资源未找到'
  },
  SERVER_ERROR: {
    code: 500,
    message: '服务器内部错误'
  },
  genResult (describe, data) {
    if (describe) {
      return {
        code: describe.code,
        message: describe.message,
        data
      }
    }
    return {
      code: -1,
      message: '',
      data
    }
  },
  setResult (describe, message, data) {
    if (describe) {
      return {
        code: describe.code,
        message: message,
        data
      }
    }
    return {
      code: -1,
      message,
      data
    }
  }
}