var express = require('express'), router = express.Router(), mongoose = require('mongoose'), // mongo connection
bodyParser = require('body-parser'), // parses information from POST
methodOverride = require('method-override'); // used to manipulate POST
router.post('/', function(req, res, next) {

	var boroughs;
	var cuisine = "All";
	mongoose.model('Restaurants').distinct("borough", function(err, resBorough){
		if (err) {
			return console.error(err);
		} 
		else{
			boroughs = resBorough;
		}
	});
    
	var filter = {$text:{$search: req.body.search}};
	
	mongoose.model('Restaurants').distinct("cuisine", function(err, cuisinesList) {
		if (err) {
			return console.error(err);
		} 
		else {

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