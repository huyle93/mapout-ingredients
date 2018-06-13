require('dotenv').load()
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
//Uncomment this line to test
//console.log(data[0].Code, data[0].Rank, data[0].State, data[0].Make, data[0].Model, data[0].Year, data[0].Thefts)
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Shine API car stat
let stat = {
  "url": "https://apis.solarialabs.com/shine/v1/vehicle-stats/specs?make=toyota&model=camry&year=2010&full-data=true&apikey=" + shine_key,
  "method": "GET",
  "qs": {
    "make": "toyota",
    "model": "camry",
    "year": "2010",
    "full-data": "true",
    "apikey": shine_key
  }
}
request(stat,(err,resp,body)=>{
var data = JSON.parse(body)
//console.log(data)
for(var i = 0; i < 4; i++){
    //Uncomment this line to test
    //console.log(data[i].Model_Year, data[i].Model, data[i].Model_Type_Index, data[i].Model_Year, data[i].Transmission, data[i].City_Conventional_Fuel,
      //  data[i].Hwy_Conventional_Fuel, data[i].Cylinders, data[i].Num_of_Gears, data[i].Annual_Fuel1_Cos_Conventional_Fuel)
}

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