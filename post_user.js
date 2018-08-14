var https = require('https');

function httpsGet_User(myData, callback) {
    var get_options = {
        host:  'mapout-e7487.firebaseio.com',
        port: '443',
        path: '/User.json',
        method: 'GET'
    };

    var get_req = https.request(get_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}
            //console.log( returnData )
            var name = JSON.parse(returnData).Name
            var age = JSON.parse(returnData).Age;
            callback([name,age]);
        });
    });

    get_req.end();
}



function httpsPost_Address(City, State, Code, callback) {

    post_data = {
      "City" : City,
      "State" : State,
      "Code" : Code
    }

    var post_options = {
        host:  'mapout-e7487.firebaseio.com',
        port: '443',
        path: '/Address.json',
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
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}
            //console.log(returnData)
            var name = JSON.parse(returnData).name;
            callback(name);
        });
    });

    //console.log("post_data: " + JSON.stringify(post_data))
    post_req.write(JSON.stringify(post_data));
    post_req.end();
}

function httpsPost_User(Name, Age, callback) {

    post_data = {
      "Name" : Name,
      "Age" : Age
    }

    var post_options = {
        host:  'mapout-e7487.firebaseio.com',
        port: '443',
        path: '/Name.json',
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
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}
            //console.log(returnData)
            var name = JSON.parse(returnData).name;
            callback(name);
        });
    });

    //console.log("post_data: " + JSON.stringify(post_data))
    post_req.write(JSON.stringify(post_data));
    post_req.end();
}

var myRequest = 'User';


httpsPost_User("John Doe", "25",  myResult => {
  //console.log("sent     : " + myRequest);
  console.log("received : " + myResult);
});

httpsPost_Address("Durham", "New Hampshire", "03824",  myResult => {
//   console.log("sent     : " + myRequest);
  console.log("received : " + myResult);
});
