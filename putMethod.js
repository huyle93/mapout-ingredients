var https = require('https')
function https_putinfo(Name, Age, callback ) {
  put_data = {
      'Name' : Name,
      'Age' : Age
  }
    var put_options = {
        host:  'mapout-mockdb-4ead8.firebaseio.com',
        port: '443',
        path: `/Infomation/.json`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(put_data))
        }
    };

      var put_req = https.request(put_options, res => {
      });

      put_req.on('error', function(err) {
      });

      put_req.write(JSON.stringify(put_data));
      console.log("Should have written")
      put_req.end();
}

https_putinfo('Andreas', '21', myResult => {
console.log('receive' + myResult)
})