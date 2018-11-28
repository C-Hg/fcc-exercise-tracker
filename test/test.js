const chai = require('chai')
const assert = chai.assert;
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../app');
const dateFunctions = require('../controllers/common/dateFunctions');

//chaiHttp requirement
if (!global.Promise) {
    global.Promise = require('q');
  }

suite('Unit Tests', function () {
    suite('date parser', function(){
        test('1984-01-01', function () {
            assert.isTrue(dateFunctions.isDateFormatValid('1984-01-01'), "1984-01-01 should return true");
        })
        test('1e84-01-01', function () {
            assert.isFalse(dateFunctions.isDateFormatValid('1e84-01-01'), "1e84-01-01 should return false, not numbers");
        })
        test('1984-13-01', function () {
            assert.isFalse(dateFunctions.isDateFormatValid('1984-13-01'), "1984-13-01 should return false, month > 12");
        })
        test('1984-01-32', function () {
            assert.isFalse(dateFunctions.isDateFormatValid('1984-01-32'), "1984-01-32 should return false, day > 31");
        })
        test('1984', function () {
            assert.isFalse(dateFunctions.isDateFormatValid('1984'), "1984-01-32 should return false, invalid format");
        })
        test('1984-10-1', function () {
            assert.isFalse(dateFunctions.isDateFormatValid('1984-10-1'), "1984-01-32 should return false, invalid format");
        })
    })  
})

suite('Api tests', function(){
    test('GET /api/exercise/users responds', function(done){
        chai.request('http://localhost:3000')
        .get('/api/exercise/users')
        .end(function(err, res){
            assert.equal(res.status, 200, 'GET /api/exercise/users response status should be 200');
            done();
        })
    })
    test('retrieve all users sends json', function(done){
        chai.request('http://localhost:3000')
        .get('/api/exercise/users')
        .end(function(err, res){
            expect(res).to.be.json;
            done();
        })
    }) 
})

