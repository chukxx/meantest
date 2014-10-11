'use strict';

//Programs service used to communicate Programs REST endpoints
angular.module('programs').factory('Programs', ['$resource',
	function($resource) {
		return $resource('programs/:programId', { programId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


angular.module('programs').factory('ProgramsComment', ['$resource',
	function($resource) {
		return $resource('programs/:programId/comments/:commentId', { programId: '@program',commentId:'@comments._id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('programs').factory('CustomRequest',['$http',function($http){

	return function(method,path,params,callback,isDEV)
	{	
<<<<<<< HEAD

		method = method&&typeof method === typeof 'a'?method:'GET';
		path = path&&typeof path === typeof 'a'?path:'/programs/';
=======
		//CHECK VALID arguments
		method = method&&typeof method === typeof "a"?method:"GET";
		path = path&&typeof path === typeof "a"?path:"/programs/";
>>>>>>> 40668a91c2b8b82bb4dab638986650175bfa3584
		params = params&&typeof params === typeof {}?params:{};

		$http({method:method,url:path,data:params}).success(function(d,s,h,c){
			
			if(isDEV)
				console.log(arguments);
			if(callback && typeof callback === typeof function(){})
				callback(d,s,h,c);
			else
				console.log('not a function');
		}).error(function(d,s,h,c){
			
			if(isDEV)
				console.log(arguments);
			if(callback && typeof callback === typeof function(){})
				callback(d,s,h,c);
			else
				console.log('not a function');

		});
		return true;
	};

}]);