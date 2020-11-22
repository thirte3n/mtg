process.env.PORT = 8080;
process.env.NODE_ENV = 'test';

const User = require('../../../models/User');

const expect = require('chai').expect;
const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../../../server');

const expectCorrectErrorResponse = require('../../../utils/expectCorrectErrorResponse');

describe('/api/v1/auth route', () => {
  const fakeUser = {
    username: 'hifumin',
    firstName: 'Hifumi',
    lastName: 'Takimoto',
    password: 'hedgehog',
  };

  const password = 'hedgehog';

  before((done) => {
    User.deleteMany({});
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(fakeUser.password, salt, async (err, hash) => {
        if (err) throw err;

        fakeUser.password = hash;

        User.create(fakeUser);
      });
    });

    done();
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('POST /api/v1/auth', () => {
    it('should not accept an username that does not exist', () => {
      return request(server)
        .post('/api/v1/auth')
        .send({
          user: {
            username: `${fakeUser.username}a`,
            password,
          },
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not accept an incorrect password', () => {
      return request(server)
        .post('/api/v1/auth')
        .send({
          user: {
            username: fakeUser.username,
            password: `${password}a`,
          },
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should not accept invalid properties', () => {
      return request(server)
        .post('/api/v1/auth')
        .send({
          user: {
            username: fakeUser.username,
            password,
            foo: 'bar',
          },
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(expectCorrectErrorResponse);
    });

    it('should return a token for a succesful request', () => {
      return request(server)
        .post('/api/v1/auth')
        .send({
          user: {
            username: fakeUser.username,
            password,
          },
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { success, status, data } = res.body;
          const { username } = data.user;
          const { token } = data;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(username).to.be.a('string').equal(fakeUser.username);
          expect(token).to.be.a('string').to.have.lengthOf(199);
        });
    });
  });
});
