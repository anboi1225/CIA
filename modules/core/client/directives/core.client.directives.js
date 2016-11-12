angular.module("coreDirective",[]).directive("navBar", function(){
	return{
		templateUrl : "core/client/views/core.client.header.html"
	}
});

angular.module("coreDirective2",[]).directive("ciaDependencies", function(){
	return{
		templateUrl : "core/client/config/core.client.dependencies.html"
	}
});