process.env.PORT = 8080;
process.env.NODE_ENV = 'test';

const User = require('../../../models/User');

const expect = require('chai').expect;
const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../../../server');

const expectCorrectErrorResponse = require('../../../utils/expectCorrectErrorResponse');

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
          // expect(data.user)
          //   .to.have.ownProperty('password')
          //   .to.have.lengthOf(60);
        });
    });

    it('should not return the password property', () => {
      return request(server)
        .post('/api/v1/users')
        .send({ user: fakeUser })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body.data.user.password).to.be.undefined;
        });
    });

    it('should not return the isAdmin property', () => {
      return request(server)
        .post('/api/v1/users')
        .send({ user: fakeUser })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body.data.user.isAdmin).to.be.undefined;
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
    beforeEach((done) => {
      User.create(fakeUser);
      done();
    });

    it('should return a single user object', () => {
      return request(server)
        .get(`/api/v1/users/${fakeUser.username}`)
        .expect(200)
        .then((res) => {
          expect(res.body.data).to.not.be.an('array');
        });
    });

    it('should retrieve the correct user with the given username', () => {
      return request(server)
        .get(`/api/v1/users/${fakeUser.username}`)
        .expect(200)
        .then((res) => {
          const { success, status, data } = res.body;
          const { username } = data.user;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(username).to.be.a('string').equal(fakeUser.username);
        });
    });

    it('should not return the password and isAdmin properties', () => {
      return request(server)
        .get(`/api/v1/users/${fakeUser.username}`)
        .expect(200)
        .then((res) => {
          expect(res.body.data.user.password).to.be.a('undefined');
          expect(res.body.data.user.isAdmin).to.be.a('undefined');
        });
    });

    it('should return a 404 errror if called with an invalid username', () => {
      return request(server)
        .get('/api/v1/users/hifumin1')
        .expect(404)
        .then((res) => {
          expect(res.body.success).to.be.a('boolean').equal(false);
          expect(res.body.status).to.be.a('number').equal(404);
          expect(res.body.error).to.be.a('string').equal('User does not exist');
        });
    });
  });

  describe('PUT /api/v1/users/:username', () => {
    it('should update the correct user with the given username', () => {
      User.create(fakeUser);

      const newFirstName = {
        user: {
          firstName: 'Aoba',
        },
      };

      return request(server)
        .put(`/api/v1/users/${fakeUser.username}`)
        .send(newFirstName)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { success, status, data } = res.body;
          const { username, firstName } = data.user;

          expect(success).to.be.a('boolean').equal(true);
          expect(status).to.be.a('number').equal(200);
          expect(username).to.be.a('string').equal(fakeUser.username);
          expect(firstName)
            .to.be.a('string')
            .equal(newFirstName.user.firstName);
        });
    });

    it('should return a 404 errror if called with an invalid username', () => {
      User.create(fakeUser);

      const newFirstName = {
        user: {
          firstName: 'Aoba',
        },
      };

      return request(server)
        .put(`/api/v1/users/${fakeUser.username}a`)
        .send(newFirstName)
        .expect(404)
        .then((res) => {
          const { success, status, error } = res.body;

          expect(success).to.be.a('boolean').equal(false);
          expect(status).to.be.a('number').equal(404);
          expect(error).to.be.a('string').equal('User does not exist');
        });
    });

    it('should not be able to change dateRegistered property', () => {
      User.create(fakeUser);

      const newDate = {
        user: {
          dateRegistered: '1999-12-31T11:22:33.656Z',
        },
      };

      return request(server)
        .put(`/api/v1/users/${fakeUser.username}`)
        .send(newDate)
        .expect(400)
        .then((res) => {
          const { success, status, error } = res.body;

          expect(success).to.be.a('boolean').equal(false);
          expect(status).to.be.a('number').equal(400);
          expect(error).to.be.a('string').equal('Bad Request');
        });
    });

    it('should not be able to change username with a username that is already taken', () => {
      User.create(fakeUsers);

      const unavailableUsername = {
        user: {
          username: fakeUsers[1].username,
        },
      };

      return request(server)
        .put(`/api/v1/users/${fakeUsers[0].username}`)
        .send(unavailableUsername)
        .expect(400)
        .then((res) => {
          const { success, status, error } = res.body;

          expect(success).to.be.a('boolean').equal(false);
          expect(status).to.be.a('number').equal(400);
          expect(error).to.be.a('string').equal('Username is already taken');
        });
    });

    describe('PUT /api/v1/users/:username - invalid payloads', () => {
      beforeEach((done) => {
        User.create(fakeUser);
        done();
      });

      const invalidPayloads = {
        shortUsername: 'Kou',
        longName: 'AobaHifumiKouAhagonNe',
        shortPassword: 'asdf123',
        longPassword: 'asdfghjkl;1234567890asdfghjkl;1',
        nonBooleanIsAdmin: 'true',
        emptyName: '',
        invalidTheme: 'water',
        nonNumberRoomId: '20',
        incompleteCounter: {
          life: 1,
          poison: 2,
          land: {
            plains: 3,
            island: 4,
            swamp: 5,
            mountain: 6,
            forest: '7',
          },
        },
      };

      it('should not accept an empty payload', () => {
        const emptyUser = {
          user: {},
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(emptyUser)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not be able to change _id property', () => {
        const newId = {
          user: {
            _id: '111111111111222222222222',
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(newId)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a username with length less than 4', () => {
        const invalidShortUsername = {
          user: {
            username: invalidPayloads.shortUsername,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidShortUsername)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a username with length more than 20', () => {
        const invalidLongUsername = {
          user: {
            username: invalidPayloads.longName,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidLongUsername)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a password with length less than 8', () => {
        const invalidShortPassword = {
          user: {
            password: invalidPayloads.shortPassword,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidShortPassword)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a password with length more than 30', () => {
        const invalidLongPassword = {
          user: {
            password: invalidPayloads.longPassword,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidLongPassword)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept an isAdmin that is not a Boolean value', () => {
        const invalidIsAdmin = {
          user: {
            isAdmin: invalidPayloads.nonBooleanIsAdmin,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidIsAdmin)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a firstName with length of 0', () => {
        const invalidBlankFirstName = {
          user: {
            firstName: invalidPayloads.emptyName,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidBlankFirstName)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a firstName with length more than 20', () => {
        const invalidLongFirstName = {
          user: {
            firstName: invalidPayloads.longName,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidLongFirstName)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a lastName with length of 0', () => {
        const invalidBlankLastName = {
          user: {
            lastName: invalidPayloads.emptyName,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidBlankLastName)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a lastName with length more than 20', () => {
        const invalidLongLastName = {
          user: {
            lastName: invalidPayloads.longName,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidLongLastName)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept an invalid theme', () => {
        const invalidTheme = {
          user: {
            theme: invalidPayloads.invalidTheme,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidTheme)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept a roomId that is not a Number', () => {
        const invalidRoomId = {
          user: {
            userRooms: [{ roomId: invalidPayloads.nonNumberRoomId }],
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidRoomId)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept an incomplete counter object', () => {
        const invalidCounter = {
          user: {
            counter: invalidPayloads.incompleteCounter,
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidCounter)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });

      it('should not accept invalid properties', () => {
        const invalidProperty = {
          user: {
            foo: 'bar',
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUser.username}`)
          .send(invalidProperty)
          .expect(400)
          .then((res) => {
            const { success, status, error } = res.body;

            expect(success).to.be.a('boolean').equal(false);
            expect(status).to.be.a('number').equal(400);
            expect(error).to.be.a('string').equal('Bad Request');
          });
      });
    });

    describe('PUT /api/v1/users/:username after a successful PUT request', () => {
      const newFirstName = {
        user: {
          firstName: 'Aoba',
        },
      };

      beforeEach(() => {
        User.create(fakeUsers);

        return request(server)
          .put(`/api/v1/users/${fakeUsers[2].username}`)
          .send(newFirstName)
          .expect(200);
      });

      it('should update the correct user and persists to the database', () => {
        return User.findOne({ username: fakeUsers[2].username }).then(
          (user) => {
            expect(user.username)
              .to.be.a('string')
              .equal(fakeUsers[2].username);
            expect(user.firstName)
              .to.be.a('string')
              .equal(newFirstName.user.firstName);
          },
        );
      });

      it('should not change the other users in the databse', () => {
        return User.find({}).then((users) => {
          expect(users).to.be.an('array').to.have.lengthOf(3);
          expect(users[0].firstName)
            .to.be.a('string')
            .equal(fakeUsers[0].firstName);
          expect(users[1].firstName)
            .to.be.a('string')
            .equal(fakeUsers[1].firstName);
        });
      });
    });

    describe('PUT /api/v1/users/:username after an unsuccessful PUT request to an invalid username', () => {
      beforeEach(() => {
        User.create(fakeUsers);

        const newFirstName = {
          user: {
            firstName: 'Aoba',
          },
        };

        return request(server)
          .put(`/api/v1/users/${fakeUsers[2].username}x`)
          .send(newFirstName)
          .expect(404);
      });

      it('should not change the database when called with an invalid username', () => {
        return User.find({}).then((users) => {
          users.forEach((user, i) => {
            expect(user.firstName).to.equal(fakeUsers[i].firstName);
          });
        });
      });
    });

    it(
      'should only be able to change admin priveleges by another user with admin priveleges',
    );
    it('should be accessible to username owner');
    it('should be accessible to users with admin priveleged');
    it('should be not be accessible to unauthorized users');
  });

  describe('DELETE /api/v1/users/:username', () => {
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

    it('should return a 404 errror if called with an invalid username', () => {
      User.create(fakeUser);

      return request(server)
        .delete(`/api/v1/users/${fakeUser.username}a`)
        .expect(404)
        .then((res) => {
          const { success, status, error } = res.body;

          expect(success).to.be.a('boolean').equal(false);
          expect(status).to.be.a('number').equal(404);
          expect(error).to.be.a('string').equal('User does not exist');
        });
    });

    it('should be accessible to username owner');
    it('should be accessible to users with admin priveleged');
    it('should be not be accessible to unauthorized users');

    describe('DELETE /api/v1/users/:username after a successful DELETE request', () => {
      beforeEach(() => {
        User.create(fakeUsers);

        return request(server)
          .delete(`/api/v1/users/${fakeUsers[2].username}`)
          .expect(200);
      });

      it('should delete the user from the database', () => {
        return User.findOne({ username: fakeUsers[2].username }).then(
          (user) => {
            expect(user).to.be.null;
          },
        );
      });

      it('should not delete other users from the database', () => {
        return User.find({}).then((users) => {
          expect(users).to.be.an('array').to.have.lengthOf(2);
          expect(users[0].username).to.equal(fakeUsers[0].username);
          expect(users[1].username).to.equal(fakeUsers[1].username);
        });
      });
    });
  });
});
