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
    const result = await service.list(page, size)
    res.json(bcode.genPageResult(result.status, {
      data: result.data.data,
      total: result.data.total,
      page,
      size
    }))
  } catch (e) {
    console.log(e)
    next(e)
  }
})
router.get('/:id', async (req, res, next) => {
  if (/[0-9]+/ig.test(req.params.id)) {
    try {
      const result = await service.getById(req.params.id)
      res.json(bcode.genResult(result.status, result.data))
    } catch (e) {
      next(e)
    }
  } else {
    res.json(bcode.genResult(bcode.INVALID_USER_ID))
  }
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
router.put('/:id', async (req, res, next) => {
  if (/[0-9]+/ig.test(req.params.id)) {
    const msg = dto.verify(req.body)
    if (msg) {
      res.json(bcode.setResult(bcode.INVALID_PARAMS, msg))
    } else {
      try {
        const result = await service.edit(req.params.id, req.body)
        res.json(bcode.genResult(result.status, result.data))
      } catch (e) {
        next(e)
      }
    }
  } else {
    res.json(bcode.genResult(bcode.INVALID_USER_ID))
  }
})
router.delete('/:id', async (req, res, next) => {
  if (/[0-9]+/ig.test(req.params.id)) {
    try {
      const result = await service.remove(req.params.id)
      res.json(bcode.genResult(result.status, result.data))
    } catch (e) {
      next(e)
    }
  } else {
    res.json(bcode.genResult(bcode.INVALID_USER_ID))
  }
})

module.exports = router