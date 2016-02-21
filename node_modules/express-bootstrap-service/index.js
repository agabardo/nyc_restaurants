// -
// - Bootstrap Service for ExpressJS
// -
// - @author Nicolas Nunge <me@nikkow.eu>
// - @web http://www.nikkow.eu
// -

var extend = require('util')._extend;
var fs = require('fs');
var mime = require('mime');

var BootstrapService = {

  /* Customizable options */
  options: {
    path: "bootstrap",
    styleSheetEngine: "css",
    minified: true,
    resourcesPath: __dirname + "/bootstrap/dist/"
  },

  serve: function(req, res, next) {
    // - Serving JS file
    req.app.get("/"+ BootstrapService.options.path +"/js", function(req, res, next) {

      if(BootstrapService.options.minified === true) {
        bsJavaScriptPath = BootstrapService.options.resourcesPath +"js/bootstrap.min.js";
      } else {
        bsJavaScriptPath = BootstrapService.options.resourcesPath +"js/bootstrap.js";
      }

      fs.readFile(bsJavaScriptPath, function (err, data) {
        if (err) {
          if(typeof(next) == "function") {
            next();
          } else {
            res.status(404);
            res.send("The file cannot be found. Please check documentation.");
          }
        } else {
          res.set("Content-Type", "text/javascript");
          res.send(data);
        }
      });
    });

    // - Serving CSS file
    req.app.get("/"+ BootstrapService.options.path +"/css", function(req, res, next) {

      if(BootstrapService.options.minified === true) {
        bsCssPath = BootstrapService.options.resourcesPath +"css/bootstrap.min.css";
      } else {
        bsCssPath = BootstrapService.options.resourcesPath +"css/bootstrap.css";
      }

      fs.readFile(bsCssPath, function (err, data) {
        if (err) {
          if(typeof(next) == "function") {
            next();
          } else {
            res.status(404);
            res.send("The file cannot be found. Please check documentation.");
          }
        } else {
          res.set("Content-Type", "text/css");
          res.send(data);
        }
      });
    });

    // - Serving fonts files (Glyphicons)
    res.app.get("/"+ BootstrapService.options.path +"/fonts/:font_file", function(req, res, next) {
      fs.readFile(BootstrapService.options.resourcesPath +"fonts/"+ req.params.font_file, function (err, data) {
        if (err) {
          if(typeof(next) == "function") {
            next();
          } else {
            res.status(404);
            res.send("The file cannot be found. Please check documentation.");
          }
        } else {
          res.set("Content-Type", mime.lookup(BootstrapService.options.resourcesPath +"fonts/"+ req.params.font_file));
          res.send(data);
        }
      });
    });

    // - Creating locals to easily include them in the views.
    res.locals.bootstrapJSHeader = '<script type="text/javascript" src="/'+ BootstrapService.options.path+'/js"></script>';
    res.locals.bootstrapCSSHeader = '<link href="/'+ BootstrapService.options.path+'/css" rel="stylesheet" />';
    res.locals.bootstrapFullHtml = res.locals.bootstrapJSHeader +"\n"+ res.locals.bootstrapCSSHeader;

    next();
  },

  init: function(opts) {
    BootstrapService.options = extend(BootstrapService.options, opts);
  }

};

module.exports = BootstrapService;
