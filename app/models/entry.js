'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
 	                id: Number,
  					url: String
});
					
module.exports = mongoose.model('Entry', schema);