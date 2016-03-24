var express = require('express'), router = express.Router(), mongoose = require('mongoose'), // mongo connection
bodyParser = require('body-parser'), // parses information from POST
methodOverride = require('method-override'); // used to manipulate POST
router.get('/', function(req, res, next) {
	var filter;
	var cuisine;
	var cuisinesList;
	var boroughs;

	if (req.query.cuisine && req.query.cuisine !="All") {
		filter = {cuisine : req.query.cuisine};
		cuisine = req.query.cuisine;
		
		if(req.query.borough){
			filter = {cuisine : req.query.cuisine, borough : req.query.borough};
		}
	} 
	else {
		filter = {};
		if(req.query.borough){
			filter = {cuisine : req.query.cuisine, borough : req.query.borough};
		}
		cuisine = "All";
	}
	
	mongoose.model('Restaurants').distinct("borough", function(err, resBorough){
		if (err) {
			return console.error(err);
		} 
		else{
			boroughs = resBorough;
		}
	});

	mongoose.model('Restaurants').distinct("cuisine", function(err, cuisinesList) {
		if (err) {
			return console.error(err);
		} 
		else {
			//console.log(cuisinesList);
			mongoose.model('Restaurants').find(filter, function(err, restaurants) {
				if (err) {
					return console.error(err);
				} 
				else{
					res.format({
						html : function() {
							res.render('index', {
								title : 'NYC Restaurants',
								"cuisines_list" : cuisinesList,
								"boroughs_list" : boroughs,
								cuisine : cuisine,
								"restaurants2" : JSON.stringify(restaurants),
								"restaurants" : restaurants});
							}, 
							json : function() { // JSON response
								//res.json(restaurants, cuisinesList);
							}
					});
				}
			}).limit(null);
		}
	});

});
module.exports = router;
