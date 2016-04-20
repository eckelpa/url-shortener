'use strict';

var path = process.cwd();
var RequestHandler = require('../controllers/requestHandler.js');


module.exports = function (app, db) {
	
	var requestHandler = new RequestHandler();
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:id')
	    .get(function (req, res) {
	    	var param = req.params.id;

	    	requestHandler.getURL(db, param, res);
	    	
	    });
	    
	app.route('/new/*')
		.get(function(req, res) {
			var param = req.params[0];
			
			requestHandler.shortenURL(db, param, res, req);
			
		});

};
