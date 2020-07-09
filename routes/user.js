const express = require('express')
const router = express.Router()
const bcode = require('../libs/business_code')
const dto = require('./dto')
const service = require('../services/user')

router.all((req, res, next) => {
  next()
})
router.get('', async (req, res, next) => {
  const size = req.query.size || 10
  const page = req.query.page || 1
  try {
    const result = await service.list({ page, size })
    res.json(bcode.genPageResult(result.status, {
      data: result.data.data,
      total: result.data.total,
      page,
      size
    }))
  } catch (e) {
    next(e)
  }
})
router.get('/:id', (req, res, next) => {
  res.end('get req')
})
router.post('', async (req, res, next) => {
  const msg = dto.verify(req.body)
  if (msg) {
    res.json(bcode.setResult(bcode.INVALID_PARAMS, msg))
  } else {
    try {
      const result = await service.create(req.body)
      res.json(bcode.genResult(result.status, result.data))
    } catch (e) {
      next(e)
    }
  }
})
router.put('/:id', (req, res, next) => {
  res.end('put req')
})
router.delete('/:id', (req, res, next) => {
  res.end('delete req')
})

module.exports = router