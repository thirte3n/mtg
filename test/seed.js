const User = require('../models/User');

const seedUsers = (done) => {
  const users = [
    {
      username: 'aocchi',
      password: 'nenecchi',
      isAdmin: false,
      firstName: 'Aoba',
      lastName: 'Suzukaze',
    },
    {
      username: 'hifumin',
      password: 'hedgehog',
      isAdmin: false,
      firstName: 'Hifumi',
      lastName: 'Takimoto',
    },
    {
      username: 'kochan',
      password: 'tooyamar',
      isAdmin: true,
      firstName: 'Kou',
      lastName: 'Yagami',
    },
  ];

  users.forEach((user) => {
    const newUser = new User(user);
    newUser.save();
  });

  done();
};

module.exports = seedUsers;
