var app = angular.module("nycRestaurants", []);

app.controller("myController", function($scope , $http) {
	
	$scope.products = ["Milk", "Bread", "Cheese"];
    $http.get('http://localhost:3000/borough').success(function(data) {
    	$scope.borough = data;
    });
    $http.get('http://localhost:3000/cuisine').success(function(data) {
    	$scope.cuisines = data;
    });
});