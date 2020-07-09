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
    const promises = []
    for (let i = 0; i < 11; i++) {
      promises.push(test(app)
        .post('/users')
        .send({
          username: 'test0' + i,
          password: '123456',
          gender: 'male'
        })
        .expect(200))
    }
    Promise.all(promises).then(() => {
      test(app)
        .get('/users')
        .expect(200)
        .then(response => {
          assert.equal(response.body.size, 10)
          assert.equal(response.body.page, 1)
          assert.equal(response.body.total, 11)
          assert.equal(response.body.data[0].username, 'test00')
          done()
        })
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
        username: 'xk123456',
        password: '123456',
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert.deepEqual(response.body.code, 10000)
        assert.deepEqual(response.body.data.username, 'xk123456')
        assert.deepEqual(response.body.data.password, '123456')
        assert.deepEqual(response.body.data.gender, 'male')
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