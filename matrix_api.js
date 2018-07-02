require('dotenv').load()
var matrixKey = process.env.matrix_KEY
let request = require('request')
var https = require('https');

//let options = {
  //"url": "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592&key=" + matrixKey,
  //"method": "GET",
  //"qs": {

  //}
//}
//This function to go through the json and get it out.
//request(options,(err,resp,body)=>{
//go through the address components and geometry components.
//var data = JSON.parse(body);  //}

//var distance = data.rows[0].elements[0].distance.value;
//var duration = data.rows[0].elements[0].duration.value;

//var get_distance = "Miles: " + getMiles(distance)
//var get_duration = "Minutes: " + getMinutes(duration)
//console.log(get_distance)
//console.log(get_duration)


//}
//)
//Formula
function getMiles(i) {
    return i*0.000621371192;
}
function getMinutes(i) {
    return Math.round(i*0.0166667);
}
// Matrix
var myCoordinates = [43.1389480, -70.9370250]

lat = 42.3428653
long = -71.1002881

httpsGet_Matrix( lat, long, (matrix) => {
    var distancevalue = matrix[0] // int
    var distancetext = matrix[1]
    var durationvalue = matrix[2] // int
    var durationtext = matrix[3]
    console.log("The Distance between Durham to Fenway is " + distancetext + " (" + distancevalue + ") It will take around: " + durationtext + " (" + durationvalue + ") to get there")
})
function httpsGet_Matrix(lat, long, callback) {
    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: `/maps/api/distancematrix/json?units=imperial&origins=${myCoordinates[0]},${myCoordinates[1]}&destinations=${lat}%2C${long}&key=` + matrixKey,
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
            var data = JSON.parse(returnData);
            var distancevalue = data.rows[0].elements[0].distance.value;
            var distancetext = data.rows[0].elements[0].distance.text;
            var durationvalue = data.rows[0].elements[0].duration.value;
            var durationtext = data.rows[0].elements[0].duration.text;
            callback([distancevalue, distancetext, durationvalue, durationtext]);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();

}

module.exports = httpsGet_Matrix;
