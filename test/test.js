//var https = require('https')
require('dotenv').load();
let request = require('request')
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var shine = require('../shine_api.js');
var google = require('../google_API.js');
var matrix = require('../matrix_api.js');


///////////////////////////////////////////////////////////////////////////
//////////////CAR STATS UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Get Car Stats', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('Should get the mpg', function(done) {
		var expected = 27;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetStats("Honda","civic","2013",function(year, mpg) {
			assert.equal(mpg, expected);
			done();
		});
	});

		it('Should get the year', function(done) {
			var expected = 2013;
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			this.request.callsArgWith(1, response)
			            .returns(new PassThrough());

			shine.httpsGetStats("Honda","civic","2013",function(year, mpg) {
				assert.equal(year, expected);
				done();
			});
	});
});

///////////////////////////////////////////////////////////////////////////
//////////////CAR THEFT UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Get Theft Stats', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('Should get Honda is most stolen make in MA', function(done) {
		var expected = "honda";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetTheftStats("ma", function car( t_make, t_model ) {
			assert.equal(t_make.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should get Civic is most stolen model in MA', function(done) {
		var expected = "civic";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetTheftStats("ma", function car( t_make, t_model ) {
			assert.equal(t_model.toLowerCase(), expected.toLowerCase());
			done();
		});
	});
});

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
});

///////////////////////////////////////////////////////////////////////////
//////////////MATRIX UNIT TEST/////////////////////////////////////////
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
});
