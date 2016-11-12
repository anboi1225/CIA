angular.module("homeCtrl", []).controller("homeController", ["$scope", "$window", function($scope, $window){
	$scope.$watch(function(){return $window.localStorage["signinInfo"];}, function(newValue){
		$scope.signinInfo = newValue;
	});
	$scope.dismissSA = function(){
		$window.localStorage.removeItem("signinInfo");
	};
}])