'use strict';

const mocha = require('mocha');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../../dist/server.js');
// prevents undefined warnings
const { before, after, describe, it } = mocha;

chai.use(require('chai-http'));

describe('API endpoints /', function () {

  before(function () {

  });

  after(function () {

  });

  // GET - Version
  it('should return version', function () {
    return chai.request(app.server)
      .get('/version')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  // GET - Invalid path
  it('should return Not Found', function () {
    return chai.request(app.server)
      .get('/INVALID_PATH')
      .then((res) => {
        throw new Error('Path exists!');
      })
      .catch(function (err) {
        expect(err).to.have.status(404);
      });
  });
});
