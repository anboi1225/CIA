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
}]);