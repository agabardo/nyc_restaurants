var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ev = {"titulo":"meu titulo","dados":"meus dados"};  
  res.render('index', {eventData : ev});
});

module.exports = router;
