require('dotenv').load()
var https = require('https');
///////////////////////////////////////////////////////////////////////////////////////////
// Google place API call


httpsGetmyGoogleplace(42.3428653, -71.1002881, "distance", "parking", function myResult(rating, name, lat, long) {
    // Uncomment this two line to test

    console.log("received rating: " + rating );
    console.log("received name: " + name );
    console.log("received lat: " + lat );
    console.log("received long: " + long );
    
});

function httpsGetmyGoogleplace(lat, long, rankby, types, callback) {
    var googlePlacekey = process.env.googleplace_KEY
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: '/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&rankby=' + rankby + '&type=' + types + '&key=' + googlePlacekey,
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
            var list = []
            var pop = JSON.parse(returnData);
              var name = pop.results[0].name;
              var lat = Number(pop.results[0].geometry.location.lat);
              var lng = Number(pop.results[0].geometry.location.lng);
              var rate = pop.results[0].rating;
            //Uncomment line below to test.
            callback(lat, long, rate, name)
            //var long = Number(pop.results[0].geometry.location.lng)
            //var type = pop.results[0].rating;
            //callback(long);
            //callback(type);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();
}
//////////////////////////////////////////////////////////////////////////
module.exports = {httpsGetmyGoogleplace};
