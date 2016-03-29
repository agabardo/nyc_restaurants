var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
var Promise = require('bluebird');


router.get('/', function(req, res, next) {

	var filter = {};
	var cuisine = "All";
	var cuisinesList = {};
	var boroughs = {};
	

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
	
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode:true, street:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
	var limit = null;
	Promise.promisifyAll(mongoose);
	Promise.props({
		title : 'NYC Restaurants',
		boroughs_list	: restaurantsModel.distinct("borough").execAsync(),
		cuisines_list	: restaurantsModel.distinct("cuisine").execAsync(),
		restaurants		: restaurantsModel.find(filter,restaurant_fields).limit(limit).execAsync(),
		"cuisine" 		: cuisine
	}).then(function(results) {
		//res.json(results);
	    res.render('index', results);
	}).catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	});

});
module.exports = router;
