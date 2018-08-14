
require('dotenv').load()
var http = require("http");
var https = require('https');
var request = require('request')

var mygasfeedkey = process.env.mygasfeed_KEY
//This function to go through the json and get it out.
lat =  43.220338
lng = -70.8855611
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

        var result = data.stations;
        console.log(result)
        return result;
    })

}

get_price(lat,lng)