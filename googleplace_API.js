require('dotenv').load()
var https = require('https');
///////////////////////////////////////////////////////////////////////////////////////////
// Google place API call


httpsGetmyGoogleplace(42.3428653, -71.1002881, 3, "garage", 35, (myResult) => {
    // Uncomment this two line to test
    console.log("sent     : " + address);
    console.log("received : " + myResult);
});

function httpsGetmyGoogleplace(lat, lng, rankby, types, rating, callback) {
    var googlePlacekey = process.env.googleplace_KEY
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: `/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=${rankby}&types=${types}&rating=${rating}&key=` + googlePlacekey,
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
            var lat = Number(pop.results[0].geometry.location.lat);
            var lng = Number(pop.results[0].geometry.location.lng);
            var types = pop.results[0].types;
            var rate = pop.results[0].rating;
            list.push(lat, lng, types, rate)
            //Uncomment line below to test.
            console.log(list)
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
