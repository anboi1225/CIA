angular.module("adminCtrl",[]).controller("adminController", ["$scope", "$http", function($scope, $http){
	$http.get("/user/restful/all").then(function(resp){
		$scope.users = resp.data;
	});
	$scope.saveChange = function(index){
		var updatedUser = {
			frozen: $scope.users[index].frozen
		};
		$http.put("/user/restful/admin/" + $scope.users[index]._id, updatedUser).then(function(resp){
			$scope.updatedSucInfo = resp.data.message;
		});
	};
	$scope.alertClose = function(){
		$scope.updatedSucInfo = undefined;
	};
}]);