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
          assert.equal(response.body.data.length, response.body.size)
          done()
        })
    })
  })
  it('get single', done => {
    test(app).post('/users').send({
      username: 'xk123456',
      password: '123456',
      gender: 'male'
    }).set('Accept', 'application/json').expect(200)
    .then(prevResponse => {
      test(app).get('/users/1').expect(200)
      .then(response => {
        assert.equal(response.body.data.username, prevResponse.body.data.username)
        assert.equal(response.body.data.password, prevResponse.body.data.password)
        assert.equal(response.body.data.gender, prevResponse.body.data.gender)
        done()
      })
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
        assert.equal(response.body.code, 10000)
        assert.equal(response.body.data.username, 'xk123456')
        assert.equal(response.body.data.password, '123456')
        assert.equal(response.body.data.gender, 'male')
        done()
      })
  })
  it('put', done => {
    test(app).post('/users').send({
      username: 'xk123456',
      password: '123456',
      gender: 'male'
    }).set('Accept', 'application/json').expect(200)
    .then(prevResponse => {
      test(app).put('/users/1').send({
        username: 'xk123457',
        password: '111111',
        gender: 'female'
      }).expect(200)
      .then(response => {
        assert.equal(response.body.data.username, 'xk123457')
        assert.equal(response.body.data.password, '111111')
        assert.equal(response.body.data.gender, 'female')
        done()
      })
    })
  })
  it('delete', done => {
    test(app).post('/users').send({
      username: 'xk123456',
      password: '123456',
      gender: 'male'
    }).set('Accept', 'application/json').expect(200)
    .then(prevResponse => {
      test(app).delete('/users/1').expect(200)
      .then(response => {
        assert.equal(response.body.code, 10006)
        done()
      })
    })
  })
})