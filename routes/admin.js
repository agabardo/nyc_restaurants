var express = require('express'), router = express.Router(), mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
Promise = require('bluebird');

router.get('/', function(req, res, next) {
  var restaurantsModel = mongoose.model('Restaurants');
	console.log("Oi");
	Promise.promisifyAll(mongoose);
	Promise.props({
		title 			: 'NYC Restaurants - Administration',
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
	  res.render('admin/index', results);
	}).catch(function(err) {
		console.log(err);
	    res.send(500); // oops - we're even handling errors!
	});
});


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
	
	inserted.save(function(err) {
		if (err){
			throw err;
			console.log(err);
		}else{
			console.log('New restaurant inserted!');
			res.send("Restaurant " + req.body.name + " successfully inserted!");
			res.send(200);
		}
	});
	
});

module.exports = router;