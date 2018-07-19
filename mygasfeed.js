require('dotenv').load()
let request = require('request')
var https = require('https');

var myCoordinates = [43.1389480, -70.9370250]

//This function to go through the json and get it out.
function get_price(lat, long, callback) {
    let request = require('request')
    let options = {
        "url": `http://api.mygasfeed.com/stations/radius/${lat}/${long}/5/reg/price/0tsuii9i8o.json`,
        "method": "GET",
        "qs": {
            //"address": "2+old+english+village+apt+110",
            //"apikey": apiKey
        }
    }
    request(options, (err, resp, body) => {
        //go through the address components and geometry components.
        var data = JSON.parse(body);
        //console.log(data)
        var sum_price = 0;
        for(var i = 0; i < data.stations.length; i++)
        {
          sum_price += Number(data.stations[i].reg_price)
        }
        var avg_price = (sum_price/data.stations.length)
        callback([avg_price]);
    })

}

/*
function get_price(){
  let request = require('request')
  let options = {
    host: 'api.mygasfeed.com',
    port: 443,
    path: '/stations/radius/43.1389480/-70.9370250/5/reg/price/0tsuii9i8o.json',
    method: 'GET',
  }
  var req = https.request(options, res => {
      res.setEncoding('utf8');
      var returnData = "";
      res.on('data', chunk => {
          returnData = returnData + chunk;
      });
      res.on('end', () => {
          var data = JSON.parse(returnData);
          console.log(data)
      });
  });
  req.end();
}
*/

get_price(myCoordinates[0], myCoordinates[1], (price) => {
  console.log(price[0])
})

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
