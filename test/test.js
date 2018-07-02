//var https = require('https')
require('dotenv').load();
let request = require('request')
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var carStats = require('../carStats.js');

var shine_key = process.env.shineapi_KEY

describe('getCarStats', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('should get mpg', function(done) {
		var expected = 25;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		carStats.httpsGetStats("Honda","civic","2013",function(year, mpg) {
			assert.equal(mpg, expected);
			done();
		});
	});
});
