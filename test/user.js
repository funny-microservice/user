const test = require('supertest')
const assert = require('assert')
const app = require('../app')

describe('user api', () => {
  it('get all', (done) => {
    test(app)
      .get('/users')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'get all req')
        done()
      })
  })
  it('get', done => {
    test(app)
      .get('/users/1')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'get req')
        done()
      })
  })
  it('post', done => {
    test(app)
      .post('/users')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'post req')
        done()
      })
  })
  it('put', done => {
    test(app)
      .put('/users/1')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'put req')
        done()
      })
  })
  it('delete', done => {
    test(app)
      .delete('/users/1')
      .expect(200)
      .then(response => {
        assert.equal(response.text, 'delete req')
        done()
      })
  })
})