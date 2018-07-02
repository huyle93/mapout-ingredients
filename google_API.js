require('dotenv').load()
//const key = require('./config.js')
var https = require('https');
var address = 'Fenway';
//This is for geocode google API call
httpsGetgeocode(address, (myResult) => {
    //Uncomment this line to test
    //console.log("sent     : " + address);
    //console.log("received : " + myResult);
});

function httpsGetgeocode(myData, callback) {
    // Update these options with the details of the web service you would like to call
    var google_key = process.env.googleAPI_KEY
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
            var lat = Number(pop.results[0].geometry.location.lat)
            var lng = Number(pop.results[0].geometry.location.lng)
            callback(lat, lng);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();
}

/////////////////////////////////////////////////////////////////////////////////////////
//Json format for google geocode
var geoKey = process.env.geocode_KEY
let request = require('request')
let options = {
  "url": "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + geoKey,
  "method": "GET",
  "qs": {
    "address": "boston museum",
    "apikey": geoKey
  }
}
//This function to go through the json and get it out.
function google(){
request(options,(err,resp,body)=>{
//go through the address components and geometry components.
var data = JSON.parse(body);  //}
for(var i in data.results[0].address_components)
console.log(data.results[0].address_components[i].long_name)
console.log(data.results[0].geometry.location.lat)
console.log(data.results[0].geometry.location.lng)
  }
)
}
//Uncomment the line below to test
//var test = google()

module.exports = {httpsGetgeocode};
