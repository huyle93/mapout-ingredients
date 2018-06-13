require('dotenv').load()
var mygasfeedkey = process.env.mygasfeed_KEY
//This function to go through the json and get it out.
function get_price( lat , lng ){
  let request = require('request')
  let options = {
    "url": `http://devapi.mygasfeed.com/stations/radius/${lat}/${lng}/5/reg/price/rfej9napna.json`,
    "method": "GET",
    "qs": {
      "address": "2+old+english+village+apt+110",
      "apikey": mygasfeedkey
    }
  }
request(options,(err,resp,body)=>{
//go through the address components and geometry components.
var data = JSON.parse(body); 

var text = " reg_price: " + data.stations[0].reg_price ;
    //console.log(text)
    //return text;
console.log(text)
//return text;
  } 
 )
}
  var shit = get_price(42.777021, -72.385093)
//console.log(get_price(43.197862, -70.8737))
//console.log(test)
//function gas price using latitude and longtitute
 //console.log(data.stations[i].country)
    // var text = "Country: " + data.stations[i].country + " zip: " + 
    // data.stations[i].zip + " reg_price: " + data.stations[i].reg_price + 
    // " mid_price: " + data.stations[i].mid_price +  " diesel_price: " +
    // data.stations[i].diesel_price + " address: " + data.stations[i].address +
    // " lat: " + data.stations[i].lat + " lng: " + data.stations[i].lng + 
    // " station: " + data.stations[i].station + " region " + data.stations[i].region +
    //  " distance: " + data.stations[i].distance;


