angular.module("coreCtrl", []).controller("coreHeaderController", ["$scope", "currentUserService", "$window", 
	"$location", "$http",
	function($scope, currentUserService, $window, $location, $http){

	$scope.signOut = function(){
		$window.localStorage.removeItem("currentUser");
		$scope.currentUser = undefined;
		$http.get("/logout").then(function(resp){			
		});
	}
	$scope.$watch(function(){return $window.localStorage["currentUser"]}, function(newValue){
		$scope.currentUser = (newValue == undefined) ? newValue : JSON.parse(newValue);
	});
}]);