
var storage = require('mock-local-storage')
var request = require('request');
var should = require('should');
var chai = require('chai');
var baseURL = "https://my-store-manager-api.herokuapp.com/api/v2"
var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});

describe('User Login', function() {
  it('should login a user', function(done) {
      let data = {
      username: 'admin',
      password: 'adminpass'
    }
    request.post({
      url: baseURL + '/auth/login',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data) 
     }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        var bodyObj = JSON.parse(body)
        localStorage.setItem('access_token', bodyObj.access_token);
        assert.equal(statusCode, 200)
        assert.equal(bodyObj.message, "Logged in succesful as admin")
        done();
      }
    );
  });
});

describe('Get Users', function() {
  it('should get all users', function(done) {
    const token = localStorage.getItem('access_token')
    request.get({
      url:baseURL + '/users',
      headers: {
        "Authorization": "Bearer " + token
      }
    }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        var bodyObj = JSON.parse(body)
        assert.equal(statusCode, 200);
        assert.equal(bodyObj.message, "Users successfully retrieved")
        done();
      }
    );
  });
});

describe('Get Categories', function() {
  it('should get all cetegories', function(done) {
    const token = localStorage.getItem('access_token')
    request.get({
      url:baseURL + '/category',
      headers: {
        "Authorization": "Bearer " + token
      }
    }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        var bodyObj = JSON.parse(body)
        assert.equal(statusCode, 200);
        assert.equal(bodyObj.message, "Categories successfully retrieved")
        done();
      }
    );
  });
});

describe('Get Products', function() {
  it('should get all products', function(done) {
    const token = localStorage.getItem('access_token')
    request.get({
      url:baseURL + '/products',
      headers: {
        "Authorization": "Bearer " + token
      }
    }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        var bodyObj = JSON.parse(body)
        assert.equal(statusCode, 200);
        assert.equal(bodyObj.message, "Products successfully retrieved")
        done();
      }
    );
  });
});

describe('Get Sales', function() {
  it('should get all sales', function(done) {
    const token = localStorage.getItem('access_token')
    request.get({
      url:baseURL + '/sales',
      headers: {
        "Authorization": "Bearer " + token
      }
    }, 
      function(error, response, body){
        var statusCode = response.statusCode;
        var bodyObj = JSON.parse(body)
        assert.equal(statusCode, 200);
        assert.equal(bodyObj.message, "Sales successfully retrieved")
        done();
      }
    );
  });
});
