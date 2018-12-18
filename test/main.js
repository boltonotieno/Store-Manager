
var storage = require('mock-local-storage')
var request = require('request');
var should = require('should');
var chai = require('chai');
var baseURL = "https://my-store-manager-api.herokuapp.com/api/v2"
var loginController =  require('../UI/js/login.js');
// var baseURL = "http://localhost:5000/api/v2"
var assert = chai.assert;

// Test Function
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});

// Admin TestCases ****************************************************************************************
describe('Admin Tests', function() {
  this.timeout(5000)
    // Test User Login
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
            localStorage.setItem('admin_token', bodyObj.access_token);
            assert.equal(statusCode, 200)
            assert.equal(bodyObj.message, "Logged in succesful as admin")
            done();
          }
        );
      });
    });

    // Test GET all Users
    describe('Get all Users', function() {
      it('should get all users', function(done) {
        const token = localStorage.getItem('admin_token')
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

    // Test GET one user by id
    describe('Get one User', function() {
      it('should get one user', function(done) {
        const token = localStorage.getItem('admin_token')
        request.get({
          url:baseURL + '/users/1',
          headers: {
            "Authorization": "Bearer " + token
          }
        }, 
          function(error, response, body){
            var statusCode = response.statusCode;
            var bodyObj = JSON.parse(body)
            assert.equal(statusCode, 200);
            assert.equal(bodyObj.message, "User successfully retrieved")
            done();
          }
        );
      });
    });

    // Test GET all Categories
    describe('Get Categories', function() {
      it('should get all cetegories', function(done) {
        const token = localStorage.getItem('admin_token')
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

    // Test GET all Products
    describe('Get Products', function() {
      it('should get all products', function(done) {
        const token = localStorage.getItem('admin_token')
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

    // Test GET all Sales
    describe('Get Sales', function() {
      it('should get all sales', function(done) {
        const token = localStorage.getItem('admin_token')
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
});
//  END Admin TestCases *********************************************************************************


// Attendant TestCases ****************************************************************************************
describe('Attendant Tests', function() {
  this.timeout(5000)
    // Test User Login
    describe('User Login', function() {
      it('should login a user', function(done) {
          let data = {
          username: 'jdoe',
          password: 'Password12!'
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
            localStorage.setItem('attendant_token', bodyObj.access_token);
            assert.equal(statusCode, 200)
            assert.equal(bodyObj.message, "Logged in succesful as jdoe")
            done();
          }
        );
      });
    });

    // Test GET all Users
    describe('Get all Users', function() {
      it('should not get all users', function(done) {
        const token = localStorage.getItem('attendant_token')
        request.get({
          url:baseURL + '/users',
          headers: {
            "Authorization": "Bearer " + token
          }
        }, 
          function(error, response, body){
            var statusCode = response.statusCode;
            var bodyObj = JSON.parse(body)
            assert.equal(statusCode, 403);
            assert.equal(bodyObj.message, "Access allowed only to admin")
            done();
          }
        );
      });
    });

    // Test GET one user by id
    describe('Get one User', function() {
      it('should not get one user', function(done) {
        const token = localStorage.getItem('attendant_token')
        request.get({
          url:baseURL + '/users/1',
          headers: {
            "Authorization": "Bearer " + token
          }
        }, 
          function(error, response, body){
            var statusCode = response.statusCode;
            var bodyObj = JSON.parse(body)
            assert.equal(statusCode, 403);
            assert.equal(bodyObj.message, "Access allowed only to admin")
            done();
          }
        );
      });
    });

    // Test GET all Categories
    describe('Get Categories', function() {
      it('should get all cetegories', function(done) {
        const token = localStorage.getItem('attendant_token')
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

    // Test GET all Products
    describe('Get Products', function() {
      it('should get all products', function(done) {
        const token = localStorage.getItem('attendant_token')
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
});
//  END Attendant TestCases *********************************************************************************
