function verifyRequired (context, target, key) {
  if (context[key].required && !target[key]) {
    return `${context[key].id}不能为空`
  }
}
function verifyRegex (context, target, key) {
  const regexs = context[key].regex
  if (regexs) {
    for (let i = 0; i < regexs.length; i++) {
      if (!regexs[i].exp.test(target[key])) {
        return regexs[i].msg
      }
    }
  }
}

module.exports = {
  username: {
    id: '用户名',
    required: true,
    regex: [
      { exp: /[0-9a-zA-Z]{6,16}/, msg: '用户名只能包含6-16位数字和字母' }
    ]
  },
  password: {
    id: '密码',
    required: true
  },
  gender: {
    id: '性别',
    required: true
  },
  verify (target) {
    for (const k in this) {
      let msg
      if (typeof this[k] === 'object') {
        msg = verifyRequired(this, target, k) || verifyRegex(this, target, k)
        if (msg) {
          return msg
        }
      }
    }
  }
}