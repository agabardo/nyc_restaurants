var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), //mongo connection
bodyParser = require('body-parser'), //parses information from POST
methodOverride = require('method-override'); //used to manipulate POST

var MongoClient = require('mongodb').MongoClient;
var restaurants;
var restaurants2;



router.get('/', function(req, res, next) {
	
	/*
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	  if (err) {
	    throw err;
	  }
	  var collection = db.collection('restaurants').find().limit(10).toArray(function(err, result) {
		  if (err) {throw err;}else{restaurants = result;}
	  });
	});
	var ev = {"titulo":"meu titulo","dados":"meus dados","restaurants":restaurants}; 
	res.render('index', {eventData : ev});
	*/
	
	mongoose.model('Restaurants').find({}, function (err, restaurants) {
        if (err) {
            return console.error(err);
        } else {
            //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
            res.format({
                //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
              html: function(){
                  res.render('index', {
                        title: 'All my Blobs',
                        "restaurants" : restaurants
                    });
              },
              //JSON response will show all blobs in JSON format
              json: function(){
                  res.json(restaurants);
              }
          });
        }
	});
	
});

module.exports = router;
