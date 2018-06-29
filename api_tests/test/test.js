var https = require('https');
require('dotenv').load();
var myCoordinates = [43.1389480, -70.9370250]

//Shine API car Theft
let request = require('request')
var assert = require('assert');

var shine_key = process.env.shineapi_KEY
var google_key = process.env.googleAPI_KEY
var googlePlacekey = process.env.googleplace_KEY
var matrixKey = process.env.matrix_KEY

describe('Geocode', function () {
  describe('Get Lat and Long', function(){
    it('should return lat and long of Fenway', function(){
      httpsGet_Geocode("fenway", function geocode(geo_lat, geo_long) {
          var lat = geo_lat // int
          var long = geo_long // int
          assert.equal(lat, 42.3428653);
          assert.equal(long, -71.1002881);
        });
    });
  });
});

/*
describe('Matrix', function () {
  describe('Get Distance and Duration', function(){
    it('should return how far length and time wise from Fenway', function(){
      httpsGet_Matrix(42.3428653, -71.1002881, function matrix(mat_dis_val, mat_dis_txt, mat_dur_val, mat_dur_txt) {
          var distancevalue = mat_dis_val // int
          var distancetext = mat_dis_txt
          var durationvalue = mat_dur_val // int
          var durationtext = mat_dur_txt
          assert.equal(distancevalue, 108016);
          assert.equal(distancetext, "67.1 mi");
          assert.equal(durationvalue, 4597);
          assert.equal(durationtext, "1 hour 17 mins");
    });
  });
});
});
*/

describe('CarStats', function () {
  describe('Get MPG and Year', function(){
    it('should return MPG of Civic', function(){
      httpsGetStats("Honda","civic","2013", function stats(year, mpg) {
          var hwympg = mpg // int
          assert.equal(hwympg, 27);
        });
    });
    it('should return year of Civic', function(){
      httpsGetStats("Honda","civic","2013", function stats(year, mpg) {
          var caryear= year // int
          assert.equal(caryear, 2013);
        });
    });
  });
});

describe('CarTheft', function () {
  describe('Get Make and Model', function(){
    it('should return Make and Model of #1 most stolen car in MA', function(){
      httpsGet_CarTheft("ma", function car( t_make, t_model ) {
          var theftCarMake = t_make.toLowerCase()
          var theftCarModel = t_model.toLowerCase()
          assert.equal(theftCarMake, "honda");
          assert.equal(theftCarModel, "civic");
        });
    });
  });
});


function httpsGet_Geocode(myData, callback) {
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: `/maps/api/geocode/json?address=${encodeURIComponent(myData)}&key=` + google_key,
        method: 'GET',
        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };
    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed data
            var pop = JSON.parse(returnData);
            var lat = Number(pop.results[0].geometry.location.lat);
            var lng = Number(pop.results[0].geometry.location.lng);
            callback(lat, lng);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();
}

// Matrix
function getMiles(i) {
    return i * 0.000621371192;
}

function httpsGet_Matrix(lat, long, callback) {
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: `/maps/api/distancematrix/json?units=imperial&origins=${myCoordinates[0]},${myCoordinates[1]}&destinations=${lat}%2C${long}&key=` + matrix_key,
        method: 'GET',

        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed data
            var data = JSON.parse(returnData);
            var distancevalue = data.rows[0].elements[0].distance.value;
            var distancetext = data.rows[0].elements[0].distance.text;
            var durationvalue = data.rows[0].elements[0].duration.value;
            var durationtext = data.rows[0].elements[0].duration.text;
            callback(distancevalue, distancetext, durationvalue, durationtext);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();
}

// Shine Car Stats
function httpsGetStats(make, model, year, callback){
    var stats_options = {
      host: 'apis.solarialabs.com',
      path: '/shine/v1/vehicle-stats/specs?make=' + make + '&model=' + model + '&year=' + year + '&full-data=true&apikey=' + shine_key,
      method: 'GET'
    }

    var req = https.request(stats_options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
        responseString += data;
    });

    res.on('end', function() {
        var response = JSON.parse(responseString);
        var stats_make = response[0].Make
        var stats_model = response[0].Model
        var stats_car_year = response[0].Model_Year
        var stats_car_mpg = response[0].City_Conventional_Fuel

        //console.log( "Model Year of the " + stats_make + " " + stats_model + " is: " + stats_car_year + ". The combined highway and city MPG is " + stats_car_mpg + ".");
        callback(stats_car_year, stats_car_mpg);
    });
    });

    req.end();
  }
// Shine Car Theft
function httpsGet_CarTheft(state, callback) {
    // Update these options with the details of the web service you would like to call
    // this will return top 3rd that got stolen
    var options = {
        host: 'apis.solarialabs.com',
        port: 443,
        path: `/shine/v1/vehicle-thefts?state=${state}&rank=1&apikey=` + shine_key,
        method: 'GET',

        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };
    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed data
            var data = JSON.parse(returnData);
            //carArray.push(data[0].Make)
            var make = data[0].Make
            var model = data[0].Model
            // this will execute whatever function the caller defined, with one argument
            callback(make, model);
        });
    });
    req.end();

}
// MyGasFeed
function get_price(lat, lng) {
    let request = require('request')
    let options = {
        "url": `http://devapi.mygasfeed.com/stations/radius/${lat}/${lng}/5/reg/price/rfej9napna.json`,
        "method": "GET",
        "qs": {
            //"address": "2+old+english+village+apt+110",
            //"apikey": apiKey
        }
    }
    request(options, (err, resp, body) => {
        //go through the address components and geometry components.
        var data = JSON.parse(body);

        var result = data.stations[0].reg_price;
        return result;
    })

}

// GooglePlace
function httpsGetmyGoogleplace(lat, lng, rankby, types, rating, callback) {
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        //path: `/maps/api/geocode/json?address=${encodeURIComponent(myData)}&key=AIzaSyD-8QBhZNxZLnmX2AxBEOB2sSHzg4L2tZs`,
        path: `/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=${rankby}&types=${types}&rating=${rating}&key=` + googleplace_key,
        method: 'GET',

        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };


    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed
            var returnObj = []
            var pop = JSON.parse(returnData);
            var lat = Number(pop.results[0].geometry.location.lat);
            var lng = Number(pop.results[0].geometry.location.lng);
            var types = pop.results[0].types;
            var rate = pop.results[0].rating;
            returnObj.push(lat, lng, types, rate)
            callback(returnObj);
            //var long = Number(pop.results[0].geometry.location.lng)
            //var type = pop.results[0].rating;
            //callback(long);
            //callback(type);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();
}
