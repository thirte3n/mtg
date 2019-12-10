process.env.PORT = 8081;
process.env.TEST_DATABASE = 'mongodb://localhost:27017/mtg';

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../server');
const seed = require('./seed');

const User = require('../models/User');

describe('Database Tests', () => {
  before(done => {
    mongoose.connect(process.env.TEST_DATABASE,
      {
        useNewUrlParser: true, useUnifiedTopology: true
      })
      .then(() => done())
      .catch(err => console.log(err));
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('Users Collection', () => {
    it('should save new document', done => {
      const newUser = new User({
        username: 'Gaji',
        firstName: 'Gaji',
        lastName: 'Gajitos',
        password: 'Qwer1234'
      });

      newUser.save(done());
    });

    it('should not accept incomplete data', done => {
      const newUser = new User({
        username: 'Gaji',
        firstName: 'Gaji',
        lastName: 'Gajitos'
      });

      newUser.save(err => {
        if (err) return done();
        throw new Error('Should not accept missing password');
      });
    });

    it('should not accept incorrect format', done => {
      const newUser = new User({
        username: 'Justin',
        firstName: 'Justin',
        lastName: 'Gajitos',
        password: 'Qwer1234',
        thisShouldNotSave: true
      });

      newUser.save()
      if (newUser.thisShouldThrowError) throw new Error('Should not accept incorrect format');

      done();
    });

    it('should retrieve document from the database', done => {
      User.findOne({ username: 'gaji' })
        .then(user => {
          if (user) {
            done();
          }
        })
        .catch(err => { throw new Error('User not found') });
    });
  });

  // describe('GET /api/users', () => {
    // before(done => {
    //   //seed the database
    // });

    // it('should return return a status code of 200', () => {
    //   return request(app)
    //     .get('/api/users')
    //     .expect(200);
    // });

    // it('should return all users', done => {
    //   User.find({})
    //     .then(users => {
    //       if (users.length === 2) done();
    //     })
    //     .catch(err => { throw new Error(err) });
    // });

  // });

  // describe('POST /api/users', () => {});
  // describe('GET /api/users/:userId', () => {});
  // describe('PUT /api/users/:userId', () => {});
  // describe('DELETE /api/users/:userId', () => {});


});