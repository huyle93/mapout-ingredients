require('dotenv').load()
var shine_key = process.env.shineapi_KEY
var https = require('https')
let request = require('request')

module.exports = {
	httpsGetStats: function(make, model, year, callback){
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
    wait = 0;
    req.end();
  }
}
