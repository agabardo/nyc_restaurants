var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), //mongo connection
bodyParser = require('body-parser'), //parses information from POST
methodOverride = require('method-override'); //used to manipulate POST

router.get('/', function(req, res, next) {
	
	var filter;
	var cuisine;
	var cuisinesList;
	
	if(req.query.cuisine){
		filter = {cuisine:req.query.cuisine};
		cuisine = req.query.cuisine;
	}
	else{
		filter = {};
		cuisine = "All";
	}
	
	mongoose.model('Restaurants').distinct("cuisine", function (err, cuisinesList){
		if (err) {
			return console.error(err);
		} else{
			lista = cuisinesList;
		}
	});
	
	mongoose.model('Restaurants').find(filter, function (err, restaurants) {
        if (err) {
            return console.error(err);
        } else {
        	console.log(cuisinesList);
            res.format({
                
              html: function(){
                  res.render('index', {
                        title: 'NYC Restaurants',
                        "cuisines_list": lista,
                        cuisine: cuisine,
                        "restaurants" : restaurants
                  });
              },
              
              json: function(){ //JSON response will show all blobs in JSON format
                  res.json(restaurants);
              }
          });
        }
	}).limit(null);
	
});

module.exports = router;
