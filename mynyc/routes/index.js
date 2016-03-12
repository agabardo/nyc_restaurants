var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'), //mongo connection
bodyParser = require('body-parser'), //parses information from POST
methodOverride = require('method-override'); //used to manipulate POST

router.get('/', function(req, res, next) {
	
	
	mongoose.model('Restaurants').find({cuisine:"Italian"}, function (err, restaurants) {
        if (err) {
            return console.error(err);
        } else {
            res.format({
                
              html: function(){
                  res.render('index', {
                        title: 'NYC Restaurants',
                        cuisine: req.query.cuisine,
                        "restaurants" : restaurants
                  });
              },
              
              json: function(){ //JSON response will show all blobs in JSON format
                  res.json(restaurants);
              }
          });
        }
	}).limit(10);
	
});

module.exports = router;
