require('dotenv').load();
let request = require('request')
var assert = require('chai').assert
var expect = require('chai').expect
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var shine = require('../shine_api.js');
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
	it('Should fail if less than 4 arguements', function(done) {
		var request = new PassThrough();

		this.request.returns(request);

		shine.httpsGetStats("Ferrari", "F12", function(year, mpg){});
		expect.fail;
		done();
	});
	

	it('Should fail if invalid make or model', function(done) {
		var expected = null;
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		shine.httpsGetStats("Ferari", "F12","2015",function(year, mpg) {
			assert.equal(year, expected);
			done();
		});
	});

	/*
	it('Should fail if year before 2010', function(done) {
		var request = new PassThrough();

		this.request.returns(request);

		shine.httpsGetStats("Ferari", "F12", 2009, function(year, mpg){});
		expect.fail;
		done();
	});


  it('Should fail if more than 4 arguements', function(done) {
		var request = new PassThrough();

		this.request.returns(request);

	  shine.httpsGetStats("Ferrari", "F12","2009", 23, function(year, mpg){});
		expect.fail;
		done();
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
		var state = 'ak'
		var expected = "pickup (full size)";
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();

		this.request.callsArgWith(1, response)
								.returns(new PassThrough());

		shine.httpsGetTheftStats(state, function car( t_make, t_model ) {
			assert.equal(t_model.toLowerCase(), expected.toLowerCase());
			done();
		});
	});
});
