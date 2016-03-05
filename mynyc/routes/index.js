var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var restaurants;
/* GET home page. */
router.get('/', function(req, res, next) {	

	
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	  if (err) {
	    throw err;
	  }
	  
	  var collection = db.collection('restaurants').find().toArray(function(err, result) {
		    if (err) {
		        throw err;
		      }
		  
		  restaurants = result;
	  });
      
	});
	var ev = {"titulo":"meu titulo","dados":"meus dados","restaurants":restaurants};
	res.render('index', {eventData : ev});
});

module.exports = router;
