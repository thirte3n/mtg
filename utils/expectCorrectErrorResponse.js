const expect = require('chai').expect;

const expectCorrectErrorResponse = (res) => {
  expect(res.body.success).to.be.a('boolean').equal(false);
  expect(res.body.status).to.be.a('number').equal(400);
  expect(res.body.error).to.be.a('string').equal('Bad Request');
  return res;
};

module.exports = expectCorrectErrorResponse;
