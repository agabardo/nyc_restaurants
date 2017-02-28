/*global $, jQuery, alert, confirm, addMarker, markersArray, redrawMap, console, module*/
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'NYC Restaurants' });
});

/***
 * Getting the list of borough.
 * Used to build the filter form.
 */
router.get('/borough', function (req, res, next) {
    var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("borough", function (err, borough) {
        if (err) {
            res.send(err);
        } else {
            res.json(borough);
        }
    });
});

/***
 * Getting the list of cuisines.
 * Used to build the filter form.
 */
router.get('/cuisine', function (req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("cuisine", function (err, cuisines) {
        if (err) {
            res.send(err);
        } else {
            res.json(cuisines);
        }
    });
});

/***
/ Adding restaurants to Session.
*/
router.get('/addFavourite', function (req,res) {
    var sess = req.session;
    var favorites = req.session.favorites || [];
    favorites.push(req.query.id);
    req.session.favorites = favorites;
    res.send("Restaurant Saved to favorites."); //Tell the API that the session was saved.
});

//Reading the sessions with the favorites.
router.get('/favorites', function (req, res) {
    var restaurantsModel = mongoose.model('Restaurants');
    var sess = req.session;
    var limit = 100;
    var filter = {};
    filter._id = req.session.favorites;
    //console.log(sess);
    //res.send(req.session);
    var restaurant_fields = {zipcode : true, street : true, grades : true, address : true, building : true, restaurant_id : true, name : true, cuisine : true, borough : true};
	restaurantsModel.find(filter,restaurant_fields).limit(limit).then(function (err, restaurants) {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurants);
        }
    });
});


/**
 * Getting the list of possible grades for restaurants.
 * Used to build the filter form.
 */
router.get('/grades', function (req, res, next) {
	var restaurantsModel = mongoose.model('Restaurants');
	restaurantsModel.distinct("grades.grade", function (err, grades) {
        if (err) {
            res.send(err);
        } else {
            res.json(grades);
        }
    });
});

/**
 * This function get the list of restaurants when the main app is loaded.
 * You can change what you  want to see in the front page by changing the
 * arguments in the filter on this list.
 */
router.get('/initialList', function (req, res, next) {
	var limit = 100,
        filter = {};
    if (req.query.search) {
        filter.$text = {$search : req.query.search};
        limit = null;
    }
    if (req.query.borough && req.query.borough !== "All") {
		var borough = req.query.borough;
        filter.borough = req.query.borough;
        limit = null;
	}
	if (req.query.cuisine && req.query.cuisine !== "All") {
		var cuisine = req.query.cuisine;
		filter.cuisine = req.query.cuisine;
		limit = null;
	}
	if (req.query.grade && req.query.grade !== "All") {
		var grade = req.query.grade;
		filterB = {"grades.grade":req.query.grade};
		filter = mergeJsObjects(filterB,filter); //Temporary...
		limit = null;
	}
	var restaurantsModel = mongoose.model('Restaurants');
	var restaurant_fields = {zipcode : true, street : true, grades : true, address : true, building : true, restaurant_id : true, name : true, cuisine : true, borough : true};
	restaurantsModel.find(filter,restaurant_fields).limit(limit).then(function (err, restaurants) {
        if (err) {
            res.send(err);
        } else {
            res.json(restaurants);
        }
    });
});

/***
* Adding a new restaurant.
*/
router.post('/addNew', function(req, res, next) {
  var restaurantsModel = mongoose.model('Restaurants');

  inserted = new restaurantsModel( {
		"address" : {
        "street" : req.body.street,
        "zipcode" : req.body.zipcode,
        "building" : req.body.building,
        "coord" : [ req.body.lat, req.body.long ]
        },
        "borough" : req.body.borough,
        "cuisine" : req.body.cuisine,
        "name" : req.body.name,
        "restaurant_id" : "4170462033"
    });

	inserted.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('New restaurant inserted!');
            res.send("Restaurant " + req.body.name + " successfully inserted!");
			//res.send(200);
        }
	});
});

/**
 * Method used to remove/delete a restaurant
 */
router.delete("/delete", function (req, res) {
    //console.log("Teste "+req.body.id);
    //res.send(req.body.id);
    var restaurantsModel = mongoose.model('Restaurants');
    restaurantsModel.remove({_id: req.body.id }, function (err) {
        if (!err) {
            res.send("Restaurant " + req.body.id + " successfully deleted!");
        } else {
            res.send("Not possible to delete Restaurant " + req.body.id + "!");
        }
    });
});

module.exports = router;