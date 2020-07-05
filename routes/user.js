const express = require('express')
const router = express.Router()

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
  res.end('post req')
})
router.put('/:id', (req, res, next) => {
  res.end('put req')
})
router.delete('/:id', (req, res, next) => {
  res.end('delete req')
})

module.exports = router