angular.module("adminCtrl",[]).controller("adminController", ["$scope", "$http", function($scope, $http){
	$http.get("/user/restful/all").then(function(resp){
		$scope.users = resp.data;
	});
	$scope.saveChange = function(index){
		var updatedUser = {
			frozen: $scope.users[index].frozen,
			services: $scope.users[index].local.services
		};
		$http.put("/user/restful/admin/" + $scope.users[index]._id, updatedUser).then(function(resp){
			$scope.updatedSucInfo = resp.data.message;
		});
	};
	$scope.alertClose = function(){
		$scope.updatedSucInfo = undefined;
	};
	$scope.cancel = function(){
		$http.get("/user/restful/all").then(function(resp){
			$scope.users = resp.data;
		});
	};
	$scope.serviceList = [
		{
			name: "Conference Calling",
			price: 1000
		},
		{
			name: "Instant Daytime Dialer",
			price: 500
		},
		{
			name: "Blast Voice Mail",
			price: 750
		},
		{
			name: "Blast Fax",
			price: 500
		},		
		{
			name: "Blast SMS",
			price: 650
		},
		{
			name: "Web Conferencing",
			price: 800
		}
	];
	$scope.addService = function(parentIndex, index){
		if($scope.users[parentIndex].local.services.indexOf($scope.serviceList[index].name) < 0){
			$scope.users[parentIndex].local.services.push($scope.serviceList[index].name);
		}
	};
	$scope.removeService = function(parentIndex, index){
		$scope.users[parentIndex].local.services.splice(index, 1);
	};
}]);