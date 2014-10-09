'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	comment:{
		type:String,
		default:'',
		required: 'Please fill in a comment',
		trim:true
	},
	created: {
		type: Date,
		default: Date.now
	},
	program:{
		type:Schema.ObjectId,
		ref: 'Program'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Comment', CommentSchema);