# ExpressJS Bootstrap Middleware

Serves the latest version of Bootstrap to [http://www.expressjs.com](ExpressJS) apps.

## Setup

Install with npm

	npm install express-bootstrap-service

Require in your main app.js

	var bootstrap = require("express-bootstrap-service");

## Usage

Simply add a middleware using the `app.use()` method

	app.use(bootstrap.serve);

This will create virtual routes to serve the bootstrap assets. By default, the `/bootstrap/js`, `/bootstrap/css`, `/bootstrap/fonts` routes will be created.

Some options can be configured with the `init()` method, e.g.:

```javascript
bootstrap.init({
	minified: false
});
```

The following options can be customized:

* `minified` (default: true) If true, the minified version of CSS/JS files will be served.
* `path` (default: bootstrap) Can be used to customize the routes prefix (e.g. if you want to create the routes `/assets/js`, `/assets/css`... instead of `/bootstrap/x`, set this parameter to `assets`).
* `resourcePath` (default: _bootstrap_ submodule) If you want to store the bootstrap files somewhere else, set the path here. Be careful to maintain the default filetree.

## Sample App

```javascript
var bootstrapService = require("express-bootstrap-service");
var express = require('express');
var app = express();

app.use(bootstrapService.serve);
app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

_Note: this sample app requires express to be installed, along with express-bootstrap. Then run `node app.js` on your folder._
