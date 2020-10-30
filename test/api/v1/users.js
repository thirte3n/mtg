process.env.PORT = 8080;
process.env.NODE_ENV = 'test';

const User = require('../../../models/User');

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../../../server');

describe('/api/v1/users routes', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return an object with properties "success, status, count, and data"', () => {
      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          const { success, status, count, data } = res.body;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(count).to.be.a('number').equal(0);
          expect(data).to.be.an('array').to.have.lengthOf(0);
        });
    });

    it('should return a list of users', () => {
      const fakeUsers = [
        {
          username: 'hifumin',
          firstName: 'Hifumi',
          lastName: 'Takimoto',
          password: 'hedgehog',
        },
        {
          username: 'aocchi',
          firstName: 'Aoba',
          lastName: 'Suzukaze',
          password: 'nenecchi',
        },
        {
          username: 'kochan',
          firstName: 'Kou',
          lastName: 'Yagami',
          password: 'tooyamar',
        },
      ];

      User.create(fakeUsers);

      return request(server)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          const { data } = res.body;

          expect(data).to.be.an('array').to.have.lengthOf(3);

          data.forEach((user) => {
            expect(user).to.have.property('_id');
            expect(user).to.have.property('username');
          });
        });
    });
  });

  describe('POST /api/v1/users', () => {
    const fakeUser = {
      username: 'hifumin',
      firstName: 'Hifumi',
      lastName: 'Takimoto',
      password: 'hedgehog',
    };

    const expectCorrectErrorResponse = (res) => {
      expect(res.body.success).to.be.a('boolean').equal(false);
      expect(res.body.status).to.be.a('number').equal(400);
      expect(res.body.error).be.a('string').equal('Bad Request');
    };

    it('should not POST a user with no username', () => {
      const { username, ...userWithoutUsername } = fakeUser;

      return request(server)
        .post('/api/v1/users')
        .send({
          user: userWithoutUsername,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not POST a user with no firstName', () => {
      const { firstName, ...userWithoutFirstName } = fakeUser;

      return request(server)
        .post('/api/v1/users')
        .send({
          user: userWithoutFirstName,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not POST a user with no lastName', () => {
      const { lastName, ...userWithoutLastName } = fakeUser;

      return request(server)
        .post('/api/v1/users')
        .send({
          user: userWithoutLastName,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not POST a user with no password', () => {
      const { password, ...userWithoutPassword } = fakeUser;

      return request(server)
        .post('/api/v1/users')
        .send({
          user: userWithoutPassword,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not POST a user with a password shorter than 8', () => {
      return request(server)
        .post('/api/v1/users')
        .send({
          user: {
            username: fakeUser.username,
            firstName: fakeUser.firstName,
            lastName: fakeUser.lastName,
            password: 'edgehog',
          },
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should POST a user', () => {
      return request(server)
        .post('/api/v1/users')
        .send({ user: fakeUser })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          const { success, status, data } = res.body;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(201);
          expect(data).to.have.property('user');
          expect(data.user)
            .to.have.property('username')
            .equal(fakeUser.username);
          expect(data.user)
            .to.have.property('firstName')
            .equal(fakeUser.firstName);
          expect(data.user)
            .to.have.property('lastName')
            .equal(fakeUser.lastName);
          expect(data.user)
            .to.have.property('password')
            .equal(fakeUser.password);
        });
    });

    it('should not POST a user if username is already taken', () => {
      return request(server)
        .post('/api/v1/users')
        .send({ user: fakeUser })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it.skip('new user posted should persist in the database', () => {
      /**
       * FIXME: Temporary code to simulate a successful POST /api/v1/users request.
       * Delete this once the POST /api/v1/users route already works
       */
      const fakeUsers = [
        {
          username: 'hifumin',
          firstName: 'Hifumi',
          lastName: 'Takimoto',
          password: 'hedgehog',
        },
        {
          username: 'aocchi',
          firstName: 'Aoba',
          lastName: 'Suzukaze',
          password: 'nenecchi',
        },
        {
          username: 'kochan',
          firstName: 'Kou',
          lastName: 'Yagami',
          password: 'tooyamar',
        },
      ];

      fakeUsers.forEach((user) => {
        const newUser = new User(user);
        newUser.save();
      });

      // HACK: Running the method in a setTimeout is for preventing the `User.find({})` method from running before the `User.save()` methods
      return setTimeout(() => {
        User.find({}).then((users) => console.log(users));
      }, 1);

      /**
       * TODO: Run User.find({}) to check if the previous test that sent a successful POST request will persist the new user into the database
       */
      // User.find({})
      //   .then((users) => {
      //     console.log(users);
      //     // console.log(fakeUser.username);

      //     for (let i = 0; i < fakeUsers.length; i++) {
      //       expect(users[i])
      //         .to.have.property('username')
      //         .equal(fakeUser[i].username);
      //       expect(users[i])
      //         .to.have.property('firstName')
      //         .equal(fakeUser[i].firstName);
      //       expect(users[i])
      //         .to.have.property('lastName')
      //         .equal(fakeUser[i].lastName);
      //       expect(users[i])
      //         .to.have.property('password')
      //         .equal(fakeUser[i].password);
      //     }
      //   })
      //   .catch((err) => console.log(err));
    });
  });
});

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
