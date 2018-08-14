require('dotenv').load();
let request = require('request')
var assert = require('chai').assert
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
var mat = require('../matrix_api.js');

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
		var expected = "10 hours 13 mins";
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
