
require('dotenv').load()
var http = require("http");
var https = require('https');
var request = require('request')

var mygasfeedkey = process.env.mygasfeed_KEY
//This function to go through the json and get it out.
lat =43.1389480
lng = -70.9370250
httpsgetprice(lat,lng, gasprice =>
{
  console.log(gasprice[0])

})// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html
// try other APIs such as the current bitcoin price : https://btc-e.com/api/2/btc_usd/ticker  returns ticker.last


function httpsgetprice(lat, lng, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey


    var post_data = {"lat": lat, 
                    ' lng' : lng};
    //console.log(post_data)

    var post_options = {
        host:  'api.mygasfeed.com',
        port: '443',
        path: `/stations/radius/,${lat}/${lng}/5/reg/price/0tsuii9i8o.json`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
        }
    };

    var post_req = https.request(post_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
            console.log(returnData)
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}

            var population = JSON.parse(returnData).population;
            console.log(population)

            callback(population);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}


