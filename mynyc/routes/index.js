var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
var Promise = require('bluebird');


router.get('/', function(req, res, next) {

	var filter = {};
	var cuisine = "All";
	var cuisinesList = {};
	var boroughs = {};
	var restaurantsModel = mongoose.model('Restaurants');

	if(req.query.borough){
		filter = {cuisine : req.query.cuisine, borough : req.query.borough};
	}
	if(req.query.cuisine){
		filter = {cuisine : req.query.cuisine};
		cuisine = req.query.cuisine;
		if(req.query.borough){
			filter = {cuisine : req.query.cuisine, borough : req.query.borough};
		}
	}

	console.log(filter);
	
	Promise.promisifyAll(mongoose);
	
	Promise.props({
		title : 'NYC Restaurants',
		boroughs_list	: restaurantsModel.distinct("borough").execAsync(),
		cuisines_list	: restaurantsModel.distinct("cuisine").execAsync(),
		restaurants		: restaurantsModel.find(filter).limit(null).execAsync(),
		"cuisine" 		: cuisine,
		restaurants2	: JSON.stringify(restaurantsModel.find(filter).limit(null).execAsync())
	  })
	  .then(function(results) {
		//res.json(results);
	    res.render('index', results);
	  })
	  .catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	  });

});
module.exports = router;
