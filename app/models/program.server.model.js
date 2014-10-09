'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Program Schema
 */
var ProgramSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Program name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comments: [{
		type:Schema.ObjectId,
		ref: 'Comment'
	}]
});

mongoose.model('Program', ProgramSchema);