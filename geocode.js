var axios = require('axios');
location = '1600+Amphitheatre+Parkway,+Mountain+View,+CA'
apikey = 'yourkey'
axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address: location,
        key: apikey
    }
})
.then(function(response){
    // using POSTMAN to navigate through results array here
    console.log(response.data.results[0].formatted_address)
    console.log(response.data.results[0].geometry.location)
})