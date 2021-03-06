
(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;
    var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather";

    describe('Get Weather', function() {

    	it('with valid zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: OPENWEATHERURL + '?q=Auckland,nz&appid=fbeb047c736975b6156778d7679c6045&units=metric'//zip=78613
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.name === 'Auckland', "City name does not match");//|| (pbody.city === 'Round Rock'
              done();
            }
        });
    	});

      it('without zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: OPENWEATHERURL + '?appid=fbeb047c736975b6156778d7679c6045&units=metric' //appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});

      it('with another valid zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: OPENWEATHERURL + '?q=Hamilton,nz&appid=fbeb047c736975b6156778d7679c6045&units=metric'//zip=78641
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.name === 'Hamilton', "City name does not match");
              done();
            }
        });
    	});
    });
})();
