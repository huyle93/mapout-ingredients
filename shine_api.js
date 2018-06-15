require('dotenv').load()
var https = require('https');

//Shine API car Theft
let request = require('request')
var shine_key = process.env.shineapi_KEY
let options = {
  "url": "https://apis.solarialabs.com/shine/v1/vehicle-thefts?state=nh&rank=3&apikey=" + shine_key,
  "method": "GET",
  "qs": {
    "state": "nh",
    "rank": "3",
    "apikey": shine_key
  }
}
request(options,(err,resp,body)=>{
var data = JSON.parse(body)

var theft_code = data[0].Code;
var theft_rank = data[0].Rank;
var theft_make = data[0].Make;
var theft_model = data[0].Model;
var theft_year = data[0].Year;
var theft_num_thefts = data[0].Thefts;

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Shine API car stat
/*
let stat = {
  "url": "https://apis.solarialabs.com/shine/v1/vehicle-stats/specs?make=honda&model=cr-v&year=2010&full-data=true&apikey=" + shine_key,
  "method": "GET",
  "qs": {
    "make": "toyota",
    "model": "venza",
    "year": "2010",
    "full-data": "true",
    "apikey": shine_key
    }
}
request(stat,(err,resp,body)=>{
var data = JSON.parse(body)

var stats_make = data[0].Make;
var stats_model = data[0].Model;
var stats_car_year = data[0].Model_Year;
var stats_car_mpg = data[0].Comb_Conventional_Fuel;


//console.log( "Model Year of the " + stats_make + " " + stats_model + " is: " + stats_car_year + ". The combined highway and city MPG is " + stats_car_mpg + ".");
*/

//variables for testing
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
      var stats_car_mpg = response[0].Comb_Conventional_Fuel

      console.log( "Model Year of the " + stats_make + " " + stats_model + " is: " + stats_car_year + ". The combined highway and city MPG is " + stats_car_mpg + ".");
      callback([stats_car_year, stats_car_mpg]);
  });
  });

  req.end();
}

httpsGetStats( "toyota", "camry", "2011", (stats) => {
  var year = stats[0];
  var mpg = stats[1];
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Shine API prediction call
let prediction = {
  "url": "https://apis.solarialabs.com/shine/v1/vehicle-stats/five-year-costs?top-ten=worst&apikey=" + shine_key,
  "method": "GET",
  "qs": {
    "top-ten": "worst",
    "apikey": shine_key
  }
}
request(prediction,(err,resp,body)=>{
var data = JSON.parse(body)
for(var i = 0; i < 10; i++){
  //Uncomment this line to test
 //console.log(data[i].Model, data[i].Model_Year, data[i].Manufacturer, (data[i].City_Conventional_Fuel + data[i].Hwy_Conventional_Fuel)/2,
  //data[i].Money_You_Spend_over_5_years_increased_amount_spent_in_fuel_costs_over_5_years_on_label)
}
})
