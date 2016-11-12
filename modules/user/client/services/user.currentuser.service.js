angular.module("userService", []).factory("currentUserService", function($window){
	var signUpSuccessInfo;
	return{
		setSignUpSuccessInfo: function(info){
			signUpSuccessInfo = info;
		},
		getSignUpSuccessInfo: function(info){
			return signUpSuccessInfo;
		}
	}
});