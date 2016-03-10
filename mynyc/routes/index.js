//var express = require('express');

var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), //mongo connection
bodyParser = require('body-parser'), //parses information from POST
methodOverride = require('method-override'); //used to manipulate POST

//var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var restaurants;
var restaurants2;
/* GET home page. */
router.get('/', function(req, res, next) {	

	
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	  if (err) {
	    throw err;
	  }
	  
	  var collection = db.collection('restaurants').find().toArray(function(err, result) {
		  if (err) {throw err;}else{restaurants = result;}
	  });
      
	});
	var ev = {"titulo":"meu titulo","dados":"meus dados","restaurants":restaurants};
	
	res.render('index', {eventData : ev});
});

module.exports = router;
