var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
router.get('/', function(req, res, next) {

	var filter = {};
	var cuisine = "All";
	var cuisinesList;
	var boroughs;

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


	findBorough = () => {
		mongoose.model('Restaurants').distinct("borough", function(err, resBorough){
			if (err) {return console.log(err);}
			else{boroughs = resBorough;}
		});
	}

	listCuisines = () => {
		mongoose.model('Restaurants').distinct("cuisine", function(err, resCuisinesList) {
			if (err) {return console.log(err);}
			else {cuisinesList = resCuisinesList;}
		});
	}

	findBorough();
	listCuisines();

	mongoose.model('Restaurants').find(filter, function(err, resRestaurants) {
		if (err) {return console.error(err);}
		else{

			res.format({
				html : function() {
					res.render('index', {
						title : 'NYC Restaurants',
						"cuisines_list" : cuisinesList,
						"boroughs_list" : boroughs,
						"cuisine"		: cuisine,
						"restaurants2" 	: JSON.stringify(resRestaurants),
						"restaurants" 	: resRestaurants});
					},
					json : function() { // JSON response
						//res.json(restaurants, cuisinesList);
					}
			});
		}
	}).limit(null);

});
module.exports = router;
