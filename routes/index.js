var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');
var Promise = require('bluebird');

router.post('/', function(req, res, next){
	var filter = {$text:{$search: req.body.search}};
	var cuisine = "All";
	var search = req.body.search;
	var cuisinesList = {};
	var boroughs = {};
	
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode:true, street:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
	var limit = null;
	Promise.promisifyAll(mongoose);
	Promise.props({
		title : 'NYC Restaurants',
		boroughs_list	: restaurantsModel.distinct("borough").execAsync(),
		cuisines_list	: restaurantsModel.distinct("cuisine").execAsync(),
		restaurants		: restaurantsModel.find(filter,restaurant_fields).limit(limit).execAsync(),
		grades			: restaurantsModel.distinct("grades.grade").execAsync(),
		"cuisine" 		: cuisine,
		"search"		: search
	}).then(function(results) {
		//res.json(results);
	    res.render('index', results);
	}).catch(function(err) {
		console.log(err);
	    //res.send(500); // oops - we're even handling errors!
	});
});

router.get('/', function(req, res, next) {

	var filter = {};
	var cuisine = "All";
	var borough = null;
	var cuisinesList = {};
	var boroughs = {};

	if(req.query.borough){
		borough = req.query.borough;
		filter = {cuisine : req.query.cuisine, borough : req.query.borough};
	}
	if(req.query.cuisine){
		filter = {cuisine : req.query.cuisine};
		cuisine = req.query.cuisine;
		if(req.query.borough){
			borough = req.query.borough;
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
		grades			: restaurantsModel.distinct("grades.grade").execAsync(),
		restaurants		: restaurantsModel.find(filter,restaurant_fields).limit(limit).execAsync(),
		"cuisine" 		: cuisine,
		"borough"		: borough
	}).then(function(results) {
		//res.json(results);
	    res.render('index', results);
	}).catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	});
});
module.exports = router;
