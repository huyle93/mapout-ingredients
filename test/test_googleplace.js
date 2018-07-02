var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http').createServer(function(req, res) {
});
var chai = require('chai')
  , chaiHttp = require('chai-http');
  var api = require('../googleplace_API.js');
  chai.use(chaiHttp);


describe('googleplace', function() {
	beforeEach(function() {
		this.request = sinon.stub(chai, 'request');
	});

	afterEach(function() {
		http.request.restore();
	});


    //We will place our tests cases here
    var location = 42.3428653
    var location_2 = -71.1002881
    var rank = "distance"
    var type = "parking"
    var rate = 5
    it('should convert get long and lat and type and rate',  function (done) {
        var expected = 25
        var response = new PassThrough();
        response.write(JSON.stringify(expected));
        response.end();
        var request = new PassThrough();
        this.request.callsArgWith(1, response)
                    .returns(request);
        api.httpsGetmyGoogleplace(location, location_2,rank,type,rate,function(long,lat) {
            // Uncomment this two line to test
            //assert.deepEqual(myResult,expected)
            //console.log("sent     : " + address);
            //console.log("received : " + myResult);
            assert.equal(rate, expected);
			done();
        });
    })
})


    



