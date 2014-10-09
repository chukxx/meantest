'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

exports.isAdmin = function (req,res,next) {
	
	res.status(200).send({
		message:'OK',
		response:req.user,
		isAdmin:req.user.roles.indexOf('admin')===0
	});

};

exports.needsAdminAuthorization = function(req,res,next)
{
	var _this = this;	
	var adminKey = '2398hd2983h2nd8392dgxhn293dhx2937dxhb29dx923d';
	exports.adminKey = adminKey;

	var isAuthorized = (req.body.adminKey && req.body.adminKey === adminKey)||(req.user && req.user.roles.indexOf('admin')===0);
	if(isAuthorized)
	{
		req.isAuthorized = isAuthorized;
		//return res.status(200).send({message:'yo sabi joor'});
		next();
	}
	else 
	{
		req.isAuthorized = false;
		return res.status(400).send({
					message: 'User is not authorized to create user beacuse u dont have the key : ' + adminKey
			});
	}

	// return function(req, res, next) {
	// 	_this.requiresLogin(req, res, function() {
	// 		if (_.intersection(req.user.roles, roles).length) {
	// 			return next();
	// 		} else {
	// 			return res.status(403).send({
	// 				message: 'User is not authorized'
	// 			});
	// 		}
	// 	});
	// };
};
/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};