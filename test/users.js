process.env.PORT = 8080;
process.env.NODE_ENV = 'test';

const User = require('../models/User');

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../server');

describe('/api/v1/users routes', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/users', () => {
    it('returns an object with success, status, count, and data', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          const { success, status, count, data } = res.body;
          expect(success).to.be.a('boolean');
          expect(status).to.be.a('number');
          expect(count).to.be.a('number');
          expect(data).to.be.an('array');
        });
    });

    it('should return a property named success equal to true', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          expect(res.body.success).to.be.true;
        });
    });

    it('should return a property named status equal to 200', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          expect(res.body.status).to.equal(200);
        });
    });

    it('should return a property named count equal to 0', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          expect(res.body.count).to.equal(0);
        });
    });

    it('should return a property named data (array) to be empty', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          expect(res.body.data).to.have.lengthOf(0);
        });
    });
  });
});

// ----------------------------------------------------------------------------

// // FIXME: This test is not dropping the database after every run
// // On the next run after not dropping the database, the test throws an error
// // Uncaught MongoError: E11000 duplicate key error collection: mtg.users index: username_1 dup key: { username: "aocchi" }
// // and
// // Error: done() called multiple times in test </api/v1/users routes GET /api/v1/users should return a status code of 200> of file D:\PROGRAMMING\PROJECTS\mtg\test\users.js
// // But it will drop the database then, which is pretty fucked up

// const mongoose = require('mongoose');

// // TODO: remove seed file if not needed anymore
// const seedUsers = require('./seed');

// describe('/api/v1/users routes', () => {
//   before((done) => {
//     mongoose
//       .connect(process.env.TEST_DATABASE, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       })
//       .then(() => {
//         seedUsers(done);
//       })
//       .catch((err) => console.log(err));
//   });

//   after((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(done);
//     });
//   });

//   describe('GET /api/v1/users', () => {
//     it('should return a status code of 200', () => {
//       return request(server).get('/api/v1/users').expect(200);
//     });

//     it('returns an object with success, status, count, and data', () => {
//       return request(server)
//         .get('/api/v1/users')
//         .expect(200)
//         .then((res) => {
//           const user = res.body;
//           expect(user).to.have.ownProperty('success');
//           expect(user).to.have.ownProperty('status');
//           expect(user).to.have.ownProperty('count');
//           expect(user).to.have.ownProperty('data');
//           console.log(user);
//         });
//     });
//   });
// });

// ----------------------------------------------------------------------------

// describe('GET /api/users', () => {
//   before((done) => {
//     //seed the database
//   });

//   it('should return return a status code of 200', () => {
//     return request(server).get('/api/users').expect(200);
//   });

//   it('should return all users', (done) => {
//     User.find({})
//       .then((users) => {
//         if (users.length === 2) done();
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   });
// });

// describe('POST /api/users', () => {});
// describe('GET /api/users/:userId', () => {});
// describe('PUT /api/users/:userId', () => {});
// describe('DELETE /api/users/:userId', () => {});
