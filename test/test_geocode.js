//var https = require('https')
require('dotenv').load();
let request = require('request')
var assert = require('chai').assert
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var google = require('../google_API.js');

///////////////////////////////////////////////////////////////////////////
//////////////GEOCODE UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Geocode', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('Should return correct latitude of fenway', function(done) {
		var expected = 42.3428653;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("fenway", function geocode(geo_lat, geo_long) {
			assert.equal(geo_lat, expected);
			done();
		});
	});

	it('Should return correct longitude of fenway', function(done) {
		var expected = -71.1002881;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("fenway", function geocode(geo_lat, geo_long) {
			assert.equal( geo_long, expected);
			done();
		});
	});

	it('Should return correct latitude of College of William and Mary', function(done) {
		var expected = 37.271674;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("College of William and Mary", function geocode(geo_lat, geo_long) {
			assert.equal(geo_lat, expected);
			done();
		});
	});

	it('Should return correct longitude of College of William and Mary', function(done) {
		var expected = -76.71337799999999;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("College of William and Mary", function geocode(geo_lat, geo_long) {
			assert.equal( geo_long, expected);
			done();
		});
	});

	it('Should return correct latitude of Simmons College Boston', function(done) {
		var expected = 42.3393661;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		google.httpsGetgeocode("Simmons College Boston", function geocode(geo_lat, geo_long) {
			assert.equal(geo_lat, expected);
			done();
		});
	});

	it('Should return correct longitude of Simmons College Boston', function(done) {
		var expected = -71.0999358;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		google.httpsGetgeocode("Simmons College Boston", function geocode(geo_lat, geo_long) {
			assert.equal( geo_long, expected);
			done();
		});
	});
});
