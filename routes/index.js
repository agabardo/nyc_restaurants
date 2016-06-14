/**
 * Node.JS project now will be integrated with Angular.JS
 * @param obj
 * @param src
 * @returns
 */
function mergeJsObjects(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}


var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
Promise = require('bluebird');

/*
router.post('/', function(req, res, next){
	var filter = {$text:{$search: req.body.search}};
	var cuisine = "All";
	var search = req.body.search;
	var cuisinesList = {};
	var boroughs = {};
	
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode:true, street:true, grades:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
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
});*/

/*
router.get('/', function(req, res, next) {

	var filter = {};
	var cuisine = "All";
	var borough = "All";
	var grade = "All";
	var cuisinesList = {};
	var boroughs = {};

	if(req.query.borough && req.query.borough != "All"){
		borough = req.query.borough;
		filter.borough = req.query.borough;
	}
	if(req.query.cuisine && req.query.cuisine != "All"){
		cuisine = req.query.cuisine;
		filter.cuisine = req.query.cuisine;
	}
	if(req.query.grade && req.query.grade != "All"){
		grade = req.query.grade;
		filterB = {"grades.grade":req.query.grade};
		filter = mergeJsObjects(filterB,filter); //Temporary...
	}
	
	console.log(filter);
	
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode:true, street:true, grades:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
	var limit = null;
	Promise.promisifyAll(mongoose);
	Promise.props({
		title 			: 'NYC Restaurants',
		boroughs_list	: restaurantsModel.distinct("borough").execAsync(),
		cuisines_list	: restaurantsModel.distinct("cuisine").execAsync(),
		grades			: restaurantsModel.distinct("grades.grade").execAsync(),
		restaurants		: restaurantsModel.find(filter,restaurant_fields).limit(limit).execAsync(),
		lower			: "1", //restaurantsModel.find({},{"grades.score":1}).sort({"grades.score":1}).limit(1)
		upper			: restaurantsModel.find({},{"grades.score":1}).sort({"grades.score":-1}).limit(1),
		"cuisine" 		: cuisine,
		"borough"		: borough,
		"grade"			: grade
	}).then(function(results) {
		//res.json(results);
	    res.render('index', results);
	}).catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	});
});*/


/* GET All Todos */
router.get('/borough', function(req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("borough", function(err, borough) {
        if (err) {
            res.send(err);
        } else {
            res.json(borough);
        }
    });
});

router.get('/cuisine', function(req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("cuisine", function(err, cuisines) {
        if (err) {
            res.send(err);
        } else {
            res.json(cuisines);
        }
    });
});

router.get('/grades', function(req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("grades.grade", function(err, grades) {
        if (err) {
            res.send(err);
        } else {
            res.json(grades);
        }
    });
});


router.get('/initialList', function(req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	var filter = {"borough":"Brooklyn"};
	var restaurant_fields = {zipcode:true, street:true, grades:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
	restaurantsModel.find(filter,restaurant_fields).limit(100).then(function(err, restaurants) {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurants);
        }
    });
});


router.get('/', function(req, res, next){
	var restaurantsModel = mongoose.model('Restaurants');
	
	Promise.promisifyAll(mongoose);
	Promise.props({
		title 			: 'NYC Restaurants',
		//boroughs_list	: restaurantsModel.distinct("borough").execAsync(),
		//cuisines_list	: restaurantsModel.distinct("cuisine").execAsync(),
		//grades			: restaurantsModel.distinct("grades.grade").execAsync(),
		//restaurants		: restaurantsModel.find(filter,restaurant_fields).limit(100).execAsync(),
		//lower			: "1", //restaurantsModel.find({},{"grades.score":1}).sort({"grades.score":1}).limit(1)
		//upper			: restaurantsModel.find({},{"grades.score":1}).sort({"grades.score":-1}).limit(1),
		//"cuisine" 		: cuisine,
		//"borough"		: borough,
		//"grade"			: grade
	}).then(function(results) {
		//res.json(results);
		console.log(results);
	    res.render('index', results);
	}).catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	});
});
module.exports = router;
