const test = require('supertest')
const assert = require('assert')
const app = require('../app')
const db = require('../libs/db')

describe('user api', () => {
  before(() => {
    return db.sync()
  })
  beforeEach(() => {
    return db.truncate()
  })
  after(() => {
    return db.close()
  })
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
      .send({
        username: 'xk',
        password: '123456',
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert.deepEqual(response.body.code, 10000)
        assert.deepEqual(response.body.data.username, 'xk')
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