angular.module("coreRoute", []).config(["$stateProvider", "$locationProvider", function($stateProvider, $locationProvider){
	$stateProvider.state("Home", {
		url: "/home",
		templateUrl: "home/client/views/home.client.view.html",
		controller: "homeController"
	}).state("Header", {
		url: "/header",
		templateUrl: "core/client/views/core.client.header.html",
		controller: "coreHeaderController"
	}).state("SignIn", {
		url: "/signin",
		templateUrl: "user/client/views/user.signin.html",
		controller: "userSigninController"
	}).state("SignUp", {
		url: "/signup",
		templateUrl: "user/client/views/user.signup.html",
		controller: "userSignupController"
	}).state("Profile", {
		url: "/profile",
		templateUrl: "user/client/views/user.profile.html",
		controller: "userProfileController"
	}).state("Product", {
		url: "/product",
		templateUrl: "products/client/views/products.client.index.html",
		controller: "productsController"
	}).state("Product.ccc", {
		url: "/product/ccc",
		templateUrl: "products/client/views/products.client.ccc.html"
	}).state("otherwise", {
		url: "*path",
		templateUrl: "home/client/views/home.client.view.html",
		controller: "homeController"
	})
	$locationProvider.html5Mode(true);
}])