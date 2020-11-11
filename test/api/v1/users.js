process.env.PORT = 8080;
process.env.NODE_ENV = 'test';

const User = require('../../../models/User');

const expect = require('chai').expect;
const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../../../server');

describe('/api/v1/users routes', () => {
  // TODO: Maybe seed fakeUsers before each test?
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  const fakeUser = {
    username: 'hifumin',
    firstName: 'Hifumi',
    lastName: 'Takimoto',
    password: 'hedgehog',
  };

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

    /**
     * FIXME: This spec sometimes return an array of 2 instead of 3 at the time the GET request is sent
     * I already tested this out with seeding 2000 fake users, but even though the seeding takes a long time (2119ms), the GET request is only sent after every user in the array is created. So I still can't figure out why this sometimes makes a wrong test result.
     */
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
            expect(user).to.have.ownProperty('_id');
            expect(user).to.have.ownProperty('username');
          });
        });
    });
  });

  describe('POST /api/v1/users', () => {
    const expectCorrectErrorResponse = (res) => {
      expect(res.body.success).to.be.a('boolean').equal(false);
      expect(res.body.status).to.be.a('number').equal(400);
      expect(res.body.error).to.be.a('string').equal('Bad Request');
      return res;
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
          expect(data).to.have.ownProperty('user');
          expect(data.user)
            .to.have.ownProperty('username')
            .equal(fakeUser.username);
          expect(data.user)
            .to.have.ownProperty('firstName')
            .equal(fakeUser.firstName);
          expect(data.user)
            .to.have.ownProperty('lastName')
            .equal(fakeUser.lastName);
          expect(data.user)
            .to.have.ownProperty('password')
            .to.have.lengthOf(60);
        });
    });

    describe('POST /api/v1/users after a succesful POST request', () => {
      beforeEach(() => {
        return request(server)
          .post('/api/v1/users')
          .send({ user: fakeUser })
          .expect(201);
      });

      it('should not POST a user if username is already taken', () => {
        return request(server)
          .post('/api/v1/users')
          .send({ user: fakeUser })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => {
            expect(res.body.error).to.equal('Username is already taken');
          });
      });

      it('new user posted should persist in the database', () => {
        return User.findOne({ username: fakeUser.username }).then((user) => {
          expect(user).to.have.property('username').equal(fakeUser.username);
          expect(user).to.have.property('firstName').equal(fakeUser.firstName);
          expect(user).to.have.property('lastName').equal(fakeUser.lastName);
          expect(user).to.have.property('password').to.have.lengthOf(60);
        });
      });

      it('should encrypt the password', () => {
        return User.findOne({ username: fakeUser.username }).then((user) => {
          bcrypt.compare(fakeUser.password, user.password).then((isMatch) => {
            expect(isMatch).to.be.true;
          });
        });
      });
    });
  });

  describe('GET /api/v1/users/:username', () => {
    it(
      'should return a single user object i.e. a single user should be in the data property',
    );
    it('should retrieve the correct user with the given username', () => {
      User.create(fakeUser);

      return request(server)
        .get(`/api/v1/users/${fakeUser.username}`)
        .expect(200)
        .then((res) => {
          const { success, status, data } = res.body;
          const { username } = data;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(username).to.be.a('string').equal(fakeUser.username);
        });
    });

    it('should return a 404 errror if called with an invalid username');
  });

  xdescribe('PUT /api/v1/users/:username', () => {
    // TODO: Seed database with an fakeUsers
    // TODO: Check if the other users are not updated and only the correct user is updated
    it('should update the correct user with the given username', () => {
      User.create(fakeUser);

      const { firstName, ...fakeUserWithNewFirstName } = fakeUser;
      fakeUserWithNewFirstName.firstName = 'Aoba';

      return request(server)
        .put(`/api/v1/users/${fakeUser.username}`)
        .send(fakeUserWithNewFirstName)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { success, status, data } = res.body;
          const { firstName } = data;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(firstName)
            .to.be.a('string')
            .equal(fakeUserWithNewFirstName.firstName);
        });
    });

    it('should update the correct user and persists to the database');
    it('should return a 404 errror if called with an invalid username');
    it('should not change the database when called with an invalid username');
  });

  xdescribe('DELETE /api/v1/users/:username', () => {
    it('should return the correct response', () => {
      User.create(fakeUser);

      return request(server)
        .delete(`/api/v1/users/${fakeUser.username}`)
        .expect(200)
        .then((res) => {
          const { success, status } = res.body;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
        });
    });

    it('should return a 404 errror if called with an invalid username');

    describe('DELETE /api/v1/users/:username after a successful DELETE request', () => {
      beforeEach(() => {
        // TODO: Seed database with an fakeUsers
        // TODO: Check if the other users are not deleted and only the correct user is deleted
        return request(server)
          .delete(`/api/v1/users/${fakeUser.username}`)
          .expect(200);
      });

      it('should delete the user from the database', () => {
        return User.findOne({ username: fakeUser.username }).then((user) => {
          expect(user).to.be.null;
        });
      });
    });
  });
});
