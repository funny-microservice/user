module.exports = {
  USER_CREATED: {
    code: 10000,
    message: '新增用户成功'
  },
  USERNAME_EXISTED: {
    code: 10001,
    message: '用户名已存在'
  },
  INVALID_USER_ID: {
    code: 10002,
    message: '用户id格式不正确'
  },
  USER_FOUND: {
    code: 10003,
    message: '用户查询成功'
  },
  USER_NOT_FOUND: {
    code: 10004,
    message: '用户未找到'
  },
  USER_UPDATED: {
    code: 10005,
    message: '用户更新成功'
  },
  USER_DELETED: {
    code: 10006,
    message: '用户删除成功'
  },
  QUERY_SUCCESS: {
    code: 10,
    message: '分页查询成功'
  },
  QUERY_EMPTY: {
    code: 11,
    message: '分页查询为空'
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
  genPageResult (describe, data) {
    if (describe) {
      return {
        code: describe.code,
        message: describe.message,
        data: data.data,
        total: data.total,
        page: data.page,
        size: data.size
      }
    }
    throw new Error('业务码未定义')
  },
  genResult (describe, data) {
    if (describe) {
      return {
        code: describe.code,
        message: describe.message,
        data
      }
    }
    throw new Error('业务码未定义')
  },
  setResult (describe, message, data) {
    if (describe) {
      return {
        code: describe.code,
        message: message,
        data
      }
    }
    throw new Error('业务码未定义')
  }
}