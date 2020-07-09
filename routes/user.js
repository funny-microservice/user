const express = require('express')
const router = express.Router()
const bcode = require('../libs/business_code')
const dto = require('./dto')
const service = require('../services/user')

router.all((req, res, next) => {
  next()
})
router.get('', (req, res, next) => {
  res.end('get all req')
})
router.get('/:id', (req, res, next) => {
  res.end('get req')
})
router.post('', (req, res, next) => {
  const msg = dto.verify(req.body)
  if (msg) {
    res.json(bcode.setResult(bcode.INVALID_PARAMS, msg))
  } else {
    service
      .create(req.body)
      .then(result => {
        res.json(bcode.genResult(result.status, result.data))
      })
      .catch(next)
  }
})
router.put('/:id', (req, res, next) => {
  res.end('put req')
})
router.delete('/:id', (req, res, next) => {
  res.end('delete req')
})

module.exports = router