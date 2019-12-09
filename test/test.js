process.env.PORT = 8081;
process.env.TEST_DATABASE = 'mongodb://localhost:27017/mtg';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../server');
const seed = require('./seed');

describe('Database Tests', () => {
  before(done => {
    mongoose.connect(process.env.TEST_DATABASE,
      {
        useNewUrlParser: true, useUnifiedTopology: true
      })
      .then(() => done())
      .catch(err => console.log(err));
  });

  describe('GET /api/users', () => {
  // before - should seed employee

    it('should return return a status code of 200', () => {
      return request(app)
        .get('/api/users')
        .expect(200);
    });

    // it should return all users
  });

  describe('POST /api/users', () => {});
  describe('GET /api/users/:userId', () => {});
  describe('PUT /api/users/:userId', () => {});
  describe('DELETE /api/users/:userId', () => {});

});