angular.module("coreCtrlIndex", []).controller("coreIndexController", ["$scope", function($scope){
	$scope.$on("sign up successful event", function(event, value){
		console.log("here" + value);
		$scope.$broadcast("broadcast sign up successful", value);
	})
}])