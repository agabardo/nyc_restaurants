var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {

	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection('restaurants').find().toArray(function(err, result) {
	    if (err) {
	      throw err;
	    }
	    console.log(result);
	  });
	});
	
  res.render('helloworld', { title: 'Express' });
});

module.exports = router;
