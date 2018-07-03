//var https = require('https')
require('dotenv').load();
let request = require('request')
var assert = require('chai').assert
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var shine = require('../shine_api.js');
var google = require('../google_API.js');
var mat = require('../matrix_api.js');

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

	it('Should return correct latitude of Franconia Ridge', function(done) {
		var expected = 44.160833
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("franconia ridge", function geocode(geo_lat, geo_long) {
			assert.equal(geo_lat, expected);
			done();
		});
	});

	it('Should return correct longitude of Franconia Ridge', function(done) {
		var expected = -71.644667;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		google.httpsGetgeocode("franconia ridge", function geocode(geo_lat, geo_long) {
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

///////////////////////////////////////////////////////////////////////////
//////////////MATRIX UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Matrix', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('Should return distance to Franconia Ridge as text', function(done) {
		var expected = "103 mi";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(44.160833, -71.6446673, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal(mat_dis_txt.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should return duration to Franconia Ridge as text', function(done) {
		var expected = "1 hour 45 mins";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(44.160833, -71.6446673, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal( mat_dur_txt.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should return distance to College of William and Mary as text', function(done) {
		var expected = "657 mi";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(37.271674, -76.71337799999999, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal(mat_dis_txt.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should return duration to College of William and Mary as text', function(done) {
		var expected = "10 hours 15 mins";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(37.271674, -76.71337799999999, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal( mat_dur_txt.toLowerCase(), expected.toLowerCase());
			done();
	});
});

	it('Should return distance to Simmons as text', function(done) {
		var expected = "67.6 mi";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(42.3393661, -71.0999358, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal(mat_dis_txt.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should return duration to Simmons as text', function(done) {
		var expected = "1 hour 19 mins";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		mat.httpsGet_Matrix(42.3393661, -71.0999358, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
			assert.equal( mat_dur_txt.toLowerCase(), expected.toLowerCase());
			done();
		});
	});
});

///////////////////////////////////////////////////////////////////////////
//////////////CAR STATS UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Car Stats', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});

	it('Should get the mpg of Honda Civic', function(done) {
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

		it('Should get the year of Honda Civic', function(done) {
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

	it('Should get the mpg of Toyota Camry', function(done) {
		var expected = 22;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetStats("Toyota","camry","2010",function(year, mpg) {
			assert.equal(mpg, expected);
			done();
		});
	});

	it('Should get the year of Toyota Camry', function(done) {
			var expected = 2010;
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			this.request.callsArgWith(1, response)
			            .returns(new PassThrough());

			shine.httpsGetStats("toyota","camry","2010",function(year, mpg) {
				assert.equal(year, expected);
				done();
			});
	});

	it('Should get the mpg of Ferrari F12', function(done) {
		var expected = 12;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetStats("Ferrari", "F12","2015",function(year, mpg) {
			assert.equal(mpg, expected, '(message in a bottle)');
			done();
		});
	});

	it('Should get the year of Ferrari F12', function(done) {
			var expected = 2015;
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			this.request.callsArgWith(1, response)
			            .returns(new PassThrough());

			shine.httpsGetStats("Ferrari", "F12","2015",function(year, mpg) {
				assert.equal(year, expected);
				done();
			});
	});

	/*
	it('A car with a year under 2010 should return null', function(done) {
			var expected = null;
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			this.request.callsArgWith(1, response)
									.returns(new PassThrough());

			shine.httpsGetStats("Ferrari", "F12","2009",function(year, mpg) {
				assert.equal(year, expected);
				done();
			});
	});
	*/
});

///////////////////////////////////////////////////////////////////////////
//////////////CAR THEFT UNIT TEST/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
describe('Theft Stats', function() {
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

	it('Should get Honda is most stolen make in CT', function(done) {
		var expected = "honda";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetTheftStats("ct", function car( t_make, t_model ) {
			assert.equal(t_make.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should get Accord is most stolen model in CT', function(done) {
		var expected = "accord";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
		            .returns(new PassThrough());

		shine.httpsGetTheftStats("ct", function car( t_make, t_model ) {
			assert.equal(t_model.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should get Honda is most stolen make in AK', function(done) {
		var expected = "chevrolet";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		shine.httpsGetTheftStats("ak", function car( t_make, t_model ) {
			assert.equal(t_make.toLowerCase(), expected.toLowerCase());
			done();
		});
	});

	it('Should get Accord is most stolen model in ak', function(done) {
		var expected = "pickup (full size)";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		shine.httpsGetTheftStats("ak", function car( t_make, t_model ) {
			assert.equal(t_model.toLowerCase(), expected.toLowerCase());
			done();
		});
	});
});
