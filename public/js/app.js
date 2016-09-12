var app = angular.module("nycRestaurants", ['angularUtils.directives.dirPagination']);

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
		$scope.currentPage = 1;
		$scope.pageSize = 20;
		$http.get('http://localhost:3000/initialList?borough=Brooklyn&cuisine=Donuts').success(function(data) {
	    	$scope.restaurants = data;
	    	$(document).ready(function(){ //Adding the markers to the Google Maps Map. Map should be loaded first.
	    		for(i=0;i< data.length ;i++){
	    			coords = (data[i].address.coord).split(",");
	    			addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name, data[i]._id);
	            }
	    	});
	    });
	}
	$scope.loadData();
	$scope.loadTable();

	$scope.applyFilters = function(){
		$scope.currentPage = 1;
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
			if($scope.search){
    		url = url +"&search="+$scope.search;
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


	/***
	 * Receiving data from browser and sending the data to Node.js
	 */
	$scope.addRestaurant = function(){
		
		postData = {
			'name':$scope.name,
			'building': $scope.building,
			'lat':$scope.lat,
			'long':$scope.long,
			'street':$scope.street,
			'zipcode':$scope.zipcode,
			'borough':$scope.add_borough,
			'cuisine':$scope.add_cuisine}
		
		var request = $http({method: "post", url: "http://localhost:3000/admin/addNew", data: postData}).success(function(data,status){
			if(data){
				window.alert(data);
			}
		});
	}


});
