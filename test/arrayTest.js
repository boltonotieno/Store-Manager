var request = require('request');
var should = require('should');
var server = require('server')
var chai = require('chai');
var util = require('util');
var baseURL = "https://my-store-manager-api.herokuapp.com/api/v2"
var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});

// describe('Login User', () => {
//   it('logged in', (done) => {
//     let data = {
//       username: 'Admin',
//       password: 'adminpass'
//     }
//     request.post('https://my-store-manager-api.herokuapp.com/api/v2/auth/login')
//            .send(data)
//            .end((error, response, body) => {
//              assert.equal(response.statusCode, 200)
//              done()
//            }); 
//   });
// });

describe('Get Users', function() {
  it('should get all users', function(done) {
    request.get({url:baseURL + '/users' }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        assert.equal(statusCode, 401);
        done();
      }
    );
  });
});

describe('Get Categories', function() {
  it('should get all cetegories', function(done) {
    request.get({url:baseURL + '/category' }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        assert.equal(statusCode, 401);
        done();
      }
    );
  });
});

describe('Get Products', function() {
  it('should get all products', function(done) {
    request.get({url:baseURL + '/products' }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        assert.equal(statusCode, 401);
        done();
      }
    );
  });
});

describe('Get Sales', function() {
  it('should get all sales', function(done) {
    request.get({url:baseURL + '/sales' }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        assert.equal(statusCode, 401);
        done();
      }
    );
  });
});
