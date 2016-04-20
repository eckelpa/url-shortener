'use strict';

var mongoose = require('mongoose');
var Entry = require('../models/entry.js');
var path = process.cwd();

function requestHandler () {
    
    this.shortenURL = function(db, param, res, req) {
        
        var regExp = /((^http\:\/\/)|^(https\:\/\/))[a-z0-9]+\.[a-z0-9]+\.[a-z]+/g;
			if (regExp.test(param)) {
				var id = Math.floor(Math.random()*10000);
				console.log(typeof id);
				db.on('error', console.error.bind(console, 'connection error:'));
				db.once('open', function() {
  					console.log('Connected to database');
  					var shortener = new Entry({id: id, url: param});
  					shortener.save(function(err, doc) {
  						if (err) return console.error(err);
  						console.log(doc);
  						mongoose.disconnect();
  					});
  					console.log('created new document entry # ' + id + ' ' + param);
  					res.json({"original_url": param, "short_url": "http://" + req.hostname + '/' + id});
				});
				mongoose.connect('mongodb://localhost/url');
				
			} else {
				res.json({"error":"Sorry, couldn't parse URL! Please make sure that you entered a valid URL."});
			}
        
    };
    
    this.getURL = function(db, param, res) {
        
        if (param) {
	    		db.on('error', console.error.bind(console, 'connection error:'));
	    		db.once('open', function() {
	    			console.log('Connected to database');
	    			Entry.findOne({id: parseInt(param, 10)}, function(err, entry) {
	    				if (err) return console.error(err);
	    				mongoose.disconnect();
	    				res.redirect(entry.url);
	    			});
	    		});
				mongoose.connect('mongodb://localhost/url');
	    	} else {
	        	res.sendFile(path + '/public/index.html');
	    	}
	    	
    };
}

module.exports = requestHandler;