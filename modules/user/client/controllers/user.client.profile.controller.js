angular.module("userProfileCtrl",[]).controller("userProfileController", ["$scope", "$http", "$window", "currentUserService",
	function($scope, $http, $window, currentUserService){
	$scope.currentUser = JSON.parse($window.localStorage["currentUser"]);
	$scope.cancel = function(){
		$scope.currentUser = JSON.parse($window.localStorage["currentUser"]);
		angular.element("#firstNameInput").attr("readonly", "readonly");
		angular.element("#lastNameInput").attr("readonly", "readonly");
		angular.element("#companyInput").attr("readonly", "readonly");
		angular.element("#emailInput").attr("readonly", "readonly");
		angular.element("#addressInput").attr("readonly", "readonly");
		angular.element("#passwordInput").attr("readonly", "readonly");
		angular.element("#confirmPasswordInput").attr("readonly", "readonly");
		$scope.confirmPassword = "";
		$scope.confirmPassword = "";
		$scope.firstNameError = undefined;
		$scope.lastNameError = undefined;
		$scope.passwordLenErr = undefined;
		$scope.passwordCErr = undefined;
		$scope.passwordNErr = undefined;
		$scope.confirmErr = undefined;
	};
	$scope.editFirstName = function(){
		angular.element("#firstNameInput").removeAttr("readonly");
	}
	$scope.editLastName = function(){
		angular.element("#lastNameInput").removeAttr("readonly");
	};
	$scope.editCompany = function(){
		angular.element("#companyInput").removeAttr("readonly");
	};
	$scope.editEmail = function(){
		angular.element("#emailInput").removeAttr("readonly");
	};
	$scope.editAddress = function(){
		angular.element("#addressInput").removeAttr("readonly");
	};
	$scope.editPassword = function(){
		angular.element("#passwordInput").removeAttr("readonly");
		angular.element("#confirmPasswordInput").removeAttr("readonly");
	};
	$scope.saveChange = function(){
		var newUser = {
			id: $scope.currentUser._id,
			email: $scope.currentUser.local.email,
			password: $scope.password,
			firstName: $scope.currentUser.local.firstName,
			lastName: $scope.currentUser.local.lastName,
			company: $scope.currentUser.local.company,
			address: $scope.currentUser.local.address,
			dpURL: $scope.currentUser.local.dpURL
		};
		$http.put("/user/restful/" + $scope.currentUser._id, newUser).then(function(resp){
			if(resp.data.type == "success"){
				$scope.updateSuccess = resp.data.message;
				$http.get("/user/restful/" + $scope.currentUser._id).then(function(resp){
					$window.localStorage["currentUser"] = JSON.stringify(resp.data);
				});
			}else{
				$scope.updateError = resp.data.message;
			};
		});
	};
	$scope.firstNameV = function(){
		if(!$scope.currentUser.local.firstName){
			$scope.firstNameError = "First name field is required, could not be empty."
		}else{
			$scope.firstNameError = undefined;
		}
	};
	$scope.lastNameV = function(){
		if(!$scope.currentUser.local.lastName){
			$scope.lastNameError = "Last name field is required, could not be empty."
		}else{
			$scope.lastNameError = undefined;
		}
	};
	$scope.passwordV = function(){
		if($scope.password == undefined || $scope.password.length < 6){
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
		$scope.confirmV();
	};
	$scope.confirmV = function(){
		if($scope.password != $scope.confirmPassword){
			$scope.confirmErr = "The 2 passwords are not match each other.";
		}else{
			$scope.confirmErr = undefined;
		}
	};
	$scope.alertClose = function(){
		$scope.updateSuccess = undefined;
		$scope.updateError = undefined;
	};
}]);