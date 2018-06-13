require('dotenv').load()
var axios = require('axios');
var axioskey = process.env.axious_KEY
location = '1600+Amphitheatre+Parkway,+Mountain+View,+CA'
axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: axioskey
    }
})
.then(function(response){
    // using POSTMAN to navigate through results array here
    console.log(response.data.results[0].formatted_address)
    
    console.log(response.data.results[0].geometry.location)
})