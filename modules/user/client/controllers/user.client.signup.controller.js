angular.module("userSignupCtrl", []).controller("userSignupController", ["$scope", "$http", "$window", "$location", "currentUserService",
	function($scope, $http, $window, $location, currentUserService){
		$scope.signup = function(){
			var userSignupData = {
				email: $scope.email,
				password: $scope.password,
				confirmPassword: $scope.confirmPassword,
				firstName: $scope.firstName,
				lastName: $scope.lastName
			}
			$http.post("/signup", userSignupData).then(function(resp){
				if(resp.data.type == "error"){
					$scope.errorInfo = resp.data.info;
					$location.path("/signup");
				}
				else{
					$window.localStorage["currentUser"] = JSON.stringify(resp.data);
					$window.localStorage["signupSucInfo"] = "Sign up succefully, please sign in.";
					$location.path("/signin");
				}
			});
		}
		$scope.passwordV = function(){
			if($scope.password.length < 6){
				$scope.passwordLenErr = "The password should be at least 6 characters.";
			}else{
				$scope.passwordLenErr = undefined;
			}
			if(!(/[A-Z]/.test($scope.password))){
				$scope.passwordCErr = "The password should at least contains 1 Capital character.";
			}else{
				$scope.passwordCErr = undefined;
			}
			if(!(/[0-9]/.test($scope.password))){
				$scope.passwordNErr = "The password should at least contains 1 number.";
			}else{
				$scope.passwordNErr = undefined;
			}
		};
		$scope.confirmV = function(){
			if($scope.password != $scope.confirmPassword){
				$scope.confirmErr = "The 2 passwords are not match each other."
			}else{
				$scope.confirmErr = undefined;
			}
		};
	}]);