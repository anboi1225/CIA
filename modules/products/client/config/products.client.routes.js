angular.module("productsRoute", []).config(["$stateProvider", function($stateProvider){
	$stateProvider.state("Product.ccc", {
		url: "/product/ccc",
		templateUrl: "products/client/views/products.client.ccc.html"
	});
}]);