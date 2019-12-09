process.env.PORT = 8081;
// process.env.TEST_DATABASE = ''

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../server');
const seed = require('./seed');

// const prodDb = new sqlite3.Database('./database.sqlite');
// const testDb = new sqlite3.Database(process.env.TEST_DATABASE);

describe('GET /api/users', () => {
  it('should return return a status code of 200', () => {
    return request(app)
      .get('/api/users')
      .expect(200);
  });
});

describe('POST /api/users', () => {});
describe('GET /api/users/:userId', () => {});
describe('PUT /api/users/:userId', () => {});
describe('DELETE /api/users/:userId', () => {});