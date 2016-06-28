var app = angular.module("nycRestaurants", []);

app.controller("myController", function($scope, $http){
	
	
	$scope.loadData = function () {
	    $http.get('http://localhost:3000/borough').success(function(data) {
	    	$scope.borough = data;
	    });
	    $http.get('http://localhost:3000/cuisine').success(function(data) {
	    	$scope.cuisines = data;
	    });
	    $http.get('http://localhost:3000/grades').success(function(data) {
	    	$scope.grades = data;
	    });
	}
	
	$scope.loadTable = function(){
		$http.get('http://localhost:3000/initialList?borough=Brooklyn').success(function(data) {
	    	$scope.restaurants = data;
	    	$(document).ready(function(){ //Adding the markers to the Google Maps Map. Map should be loaded first.
	    		for(i=0;i< data.length ;i++){
	    			coords = (data[i].address.coord).split(",");
	    			addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name);
	            }
	    	});
	    });
	}
	
	$scope.loadData();
	$scope.loadTable();
	
	
	
	$scope.applyFilters = function () {
		url = "";
    	if($scope.dropdownBorough){
    		url = url +"&borough="+$scope.dropdownBorough;
	    }
    	if($scope.dropdownCuisines){
    		url = url +"&cuisine="+$scope.dropdownCuisines;
	    }
    	if($scope.dropdownGrades){
    		url = url +"&grade="+$scope.dropdownGrades;
	    }
    	
    	$http.get('http://localhost:3000/initialList?filter=true'+url).success(function(data) {
    		 	
    	    	
    		for(var i = 0; i < markersArray.length; i++ ){
		 		markersArray[i].setMap(null); //markersArray is in the file custom.js.
			}
		 	redrawMap(); //Just re-centering and re-zooming the map.
	    	for(i=0;i< data.length ;i++){
    			coords = (data[i].address.coord).split(",");
    			addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name);
            }
    		
    		
    		
    		$scope.$evalAsync(function() { 
    			$scope.restaurants = data;
    		});
    	 });	
    }
});