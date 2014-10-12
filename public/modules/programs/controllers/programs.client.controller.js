'use strict';

// Programs controller
angular.module('programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Programs','CustomRequest','Comments','ProgramsComment',
	function($scope, $stateParams, $location, Authentication, Programs, CustomRequest,Comments,ProgramsComment ) {
		$scope.authentication = Authentication;
		
		// Create new Program
		$scope.create = function() {
			// Create new Program object
			var program = new Programs ({
				name: this.name
			});

			// Redirect after save
			program.$save(function(response) {
				$location.path('programs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//Use this method instead
		$scope.createComment = function() {

			//console.log($scope.newComment);
			//CustomRequest('POST','programs/'+$stateParams.programId+'/comments',{comment:$scope.newComment},function(){
			//	$scope.findOne();
			//},true);
			// Create new Comment object
			var comment = new ProgramsComment({
				comment: $scope.newComment
			});

			//Redirect after save
			comment.$save({programId: $stateParams.programId},function(response) {
				//$location.path('programs/' + $stateParams.programId);
				$scope.findOne();
				console.log(response);
				//$scope.comments.push({user:{displayName:}response})
				$scope.newComment = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Remove existing Program
		$scope.remove = function( program ) {
			if ( program ) { program.$remove();

				for (var i in $scope.programs ) {
					if ($scope.programs [i] === program ) {
						$scope.programs.splice(i, 1);
					}
				}
			} else {
				$scope.program.$remove(function() {
					$location.path('programs');
				});
			}
		};

		// Update existing Program
		$scope.update = function() {
			var program = $scope.program ;

			program.$update(function() {
				$location.path('programs/' + program._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Programs
		$scope.find = function() {
			$scope.programs = Programs.query();

		};

		var getCommentsJSON = function(d,s,h,c)
		{
			$scope.comments = d;
		};

		// Find existing Program
		$scope.findOne = function() {
			$scope.program = Programs.get({ 
				programId: $stateParams.programId
			});
			//CustomRequest('GET','programs/'+$stateParams.programId+'/comments',{},getCommentsJSON);
			// $scope.comments = ProgramsComment.query({
			// 	programId:$stateParams.programId});

			//Use this method instead
			$scope.comments = ProgramsComment.query({
				programId: $stateParams.programId
			},function(res){console.log(res);});
		};
	}
]);
