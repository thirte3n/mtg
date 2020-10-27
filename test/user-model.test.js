process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const User = require('../models/User');

describe.skip('Database Tests', () => {
  before((done) => {
    mongoose
      .connect(process.env.TEST_DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => done())
      .catch((err) => console.log(err));
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('Users Collection', () => {
    it('should save new document', (done) => {
      const newUser = new User({
        username: 'Gaji',
        firstName: 'Gaji',
        lastName: 'Gajitos',
        password: 'Qwer1234',
      });

      newUser.save(done());
    });

    it('should not accept incomplete data', (done) => {
      const newUser = new User({
        username: 'Gaji',
        firstName: 'Gaji',
        lastName: 'Gajitos',
      });

      newUser.save((err) => {
        if (err) return done();
        throw new Error('Should not accept missing password');
      });
    });

    it('should not accept incorrect format', (done) => {
      const newUser = new User({
        username: 'Justin',
        firstName: 'Justin',
        lastName: 'Gajitos',
        password: 'Qwer1234',
        thisShouldNotSave: true,
      });

      newUser.save();
      if (newUser.thisShouldThrowError)
        throw new Error('Should not accept incorrect format');

      done();
    });

    it('should retrieve document from the database', (done) => {
      User.findOne({ username: 'gaji' })
        .then((user) => {
          if (user) {
            done();
          }
        })
        .catch((err) => {
          throw new Error('User not found');
        });
    });
  });
});
