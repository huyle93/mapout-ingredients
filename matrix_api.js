apiKey = "AIzaSyC5RyPE6GFpqijcgU6Iv10EjjJX8lBOSO8"
let request = require('request')
let options = {
  "url": "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592&key=AIzaSyBtVpXAuWlnuC7hicRdzFBzBifYR1evqIY",
  "method": "GET",
  "qs": {
    
  }
}
//This function to go through the json and get it out.
request(options,(err,resp,body)=>{
//go through the address components and geometry components.
var data = JSON.parse(body);  //}

var distance = data.rows[0].elements[0].distance.value;
var duration = data.rows[0].elements[0].duration.value;

var get_distance = "Miles: " + getMiles(distance)
var get_duration = "Minutes: " + getMinutes(duration)
console.log(get_distance)
console.log(get_duration)


}
)
function getMiles(i) {
    return i*0.000621371192;
}

function getMinutes(i) {
    return Math.round(i*0.0166667);
}






 

    
