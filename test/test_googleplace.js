require('dotenv').load();
let request = require('request')
var assert = require('chai').assert
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

var place = require('../googleplace_API.js');
var rankby = "distance";
var type = "parking"

describe('Googleplace', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		chai.request.restore();
	});


    it('Should return rating of closest parking garage to Fenway',  function (done) {
        var expected = 3
        var response = new PassThrough();
        response.write(JSON.stringify(expected));
        response.end();
        var request = new PassThrough();
        this.request.callsArgWith(1, response)
                    .returns(request);
        place.httpsGetmyGoogleplace(42.3393661, -71.0999358, rankby, type, function myResult(rating, name) {
            assert.equal(rating, expected);
			      done();
        });
    })

    it('Should return name of closest parking garage to Fenway',  function (done) {
        var expected = "simmons parking garage entrance road"
        var response = new PassThrough();
        response.write(JSON.stringify(expected));
        response.end();
        var request = new PassThrough();
        this.request.callsArgWith(1, response)
                    .returns(request);

        place.httpsGetmyGoogleplace(42.3393661, -71.0999358, rankby, type, function myResult(rating, name, lat, long) {
            assert.equal(name.toLowerCase(), expected.toLowerCase());
            done();
        });
    })
})
