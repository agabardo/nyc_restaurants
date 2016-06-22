var app = angular.module("nycRestaurants", []);

app.controller("myController", function($scope , $http) {
	var restaurants = [];
	
	$scope.products = ["Milk", "Bread", "Cheese"];
    $http.get('http://localhost:3000/borough').success(function(data) {
    	$scope.borough = data;
    });
    
    $http.get('http://localhost:3000/cuisine').success(function(data) {
    	$scope.cuisines = data;
    });
    
    $http.get('http://localhost:3000/grades').success(function(data) {
    	$scope.grades = data;
    });
    
    $http.get('http://localhost:3000/initialList').success(function(data) {
    	$scope.restaurants = data;
    	
    	$(document).ready(function(){ //Adding the markers to the Google Maps Map. Map should be loaded first.
    		for(i=0;i< data.length ;i++){
    			coords = (data[i].address.coord).split(",");
    			addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name);
            }
    	});
    	
    });
    
    $scope.submit = function() {
	    if ($scope.search) {
	      window.alert($scope.search);
	    }
	  };
});