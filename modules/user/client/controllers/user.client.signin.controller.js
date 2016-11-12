angular.module("userSigninCtrl", []).controller("userSigninController", ["$scope", "$http", "$location", 
	"$window", "currentUserService",
	function($scope, $http, $location, $window, currentUserService){
	$scope.signin = function(){
		var userSigninData = {
			email : $scope.email,
			password: $scope.password
		}
		$http.post("/signin", userSigninData).then(function(resp){
			if(resp.data.type == "error"){
				$scope.errorInfo = resp.data.info;
			}else{
				$window.localStorage["currentUser"] = JSON.stringify(resp.data);
				$window.localStorage.removeItem("signupSucInfo");
				$window.localStorage["signinInfo"] = "Welcome back, dear " + resp.data.local.firstName + ".";
				$location.path("/");
			}
		});
	};
	$scope.$watch(function(){return $window.localStorage["signupSucInfo"]}, function(newValue){
		$scope.signUpSuccessInfo = newValue;
	});
}]);