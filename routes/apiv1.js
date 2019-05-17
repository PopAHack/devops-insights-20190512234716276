var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

exports.getWeather = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + zip + ',nz';//changes

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};

    			var late = body.coord.lat;
                var long = body.coord.lon;

                var pos = {lat: late, lng: long};

                //now add the marker (not working)
                //var marker = new google.maps.Marker({position: pos, map: map});


                //sql stuff:
                //get a token!
                var api = '/dbapi/v3'
                var host = 'https://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net' + api;

                var userinfo =
                {
                    userid: 'nnv54406',
                    password: '63fb7mxj43-5x40g'
                };

                var service = '/auth/tokens';

                request({
                    method: 'GET',
                    url: host + service,
                    json: userinfo }, function( err2, resp2, body2)
                {
                    if(err2) {
                        res.status(400).send('Failed to get the data');
                    }else {
                        if(body.cod == 200){
                            var token = body2.token;
                            console.log(token);

                            //add the new city to the database!
                            //sql query...
                            var queryMakeTable = 'CREATE TABLE cities (Name varchar(255));';
                            var queryAddCity = 'INSERT INTO cities VALUES(' + bodies.name + ');';


                        } else {
                            res.status(400).send('Failed to receive data');
                         }
                     }
                });
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

exports.getWeather2 = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + zip + ',nz';//changes

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';//changes
    			var response = {city: body.name, weather: weath};

                var lat = body.coord.lat;
                var lng = body.coord.lon;

    			var pos = {lat, lng};
                //now add the marker (not working)
                //var marker = new google.maps.Marker({position: pos, map: map});

    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather2', exports.getWeather2);
exports.router = router;

