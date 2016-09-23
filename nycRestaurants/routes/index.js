var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/borough', function(req, res, next){

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

router.get('/initialList', function(req, res, next){
	limit = 100;
	var filter = {};
  if(req.query.search){
    filter.$text = {$search:req.query.search};
    limit = null;
  }
  if(req.query.borough && req.query.borough != "All"){
		borough = req.query.borough;
		filter.borough = req.query.borough;
		limit = null;
	}
	if(req.query.cuisine && req.query.cuisine != "All"){
		cuisine = req.query.cuisine;
		filter.cuisine = req.query.cuisine;
		limit = null;
	}
	if(req.query.grade && req.query.grade != "All"){
		grade = req.query.grade;
		filterB = {"grades.grade":req.query.grade};
		filter = mergeJsObjects(filterB,filter); //Temporary...
		limit = null;
	}
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode:true, street:true, grades:true, address:true, building:true, restaurant_id:true, name:true, cuisine:true, borough:true};
	restaurantsModel.find(filter,restaurant_fields).limit(limit).then(function(err, restaurants) {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurants);
        }
    });
});

module.exports = router;
