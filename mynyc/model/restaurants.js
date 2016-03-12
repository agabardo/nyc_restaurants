var mongoose = require('mongoose');  
var restaurantSchema = new mongoose.Schema({  
  restaurant_id: Number,
  name: String,
  cuisine: String,
  borouhg: String
});
mongoose.model('Restaurants', restaurantSchema);

/*
"_id" : ObjectId("56b5b0bf7853e8294156f01f"),
"address" : {
	"building" : "2780",
	"coord" : [
		-73.98241999999999,
		40.579505
	],
	"street" : "Stillwell Avenue",
	"zipcode" : "11224"
},
"borough" : "Brooklyn",
"cuisine" : "American ",
"grades" : [
	{
		"date" : ISODate("2014-06-10T00:00:00Z"),
		"grade" : "A",
		"score" : 5
	},
	{
		"date" : ISODate("2013-06-05T00:00:00Z"),
		"grade" : "A",
		"score" : 7
	},
	{
		"date" : ISODate("2012-04-13T00:00:00Z"),
		"grade" : "A",
		"score" : 12
	},
	{
		"date" : ISODate("2011-10-12T00:00:00Z"),
		"grade" : "A",
		"score" : 12
	}
],
"name" : "Riviera Caterer",
"restaurant_id" : "40356018"
*/