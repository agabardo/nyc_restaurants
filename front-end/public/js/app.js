/*global $, jQuery, alert, confirm, addMarker, markersArray, redrawMap, console*/
/**
* This is the main App file with Angular.js methods and functions.
**/
var app = angular.module("nycRestaurants", ['angularUtils.directives.dirPagination']);

/**
* When the website is loaded.
**/
app.controller("myController", function ($scope, $http) {
	$scope.loadData = function () {
	    $http.get('/borough').success(function (data) {
            $scope.borough = data;
	    });
	    $http.get('/cuisine').success(function (data) {
            $scope.cuisines = data;
	    });
	    $http.get('/grades').success(function (data) {
            $scope.grades = data;
	    });
	};

	$scope.loadTable = function () {
		$scope.currentPage = 1;
		$scope.pageSize = 20;
		$http.get('/initialList?borough=Brooklyn&cuisine=Donuts').success(function (data) {
            $scope.restaurants = data;
            $(document).ready(function () { //Adding the markers to the Google Maps Map. Map should be loaded first.
                var i, coords;
                for (i = 0; i < data.length; i += 1) {
                    coords = (data[i].address.coord).split(",");
                    addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name, data[i]._id);
	            }
            });
	    });
	};
	$scope.loadData();
	$scope.loadTable();

	$scope.applyFilters = function () {
		$scope.currentPage = 1;
		var url = "";
        if ($scope.dropdownBorough) {
            url = url + "&borough=" + $scope.dropdownBorough;
	    }
        if ($scope.dropdownCuisines) {
            url = url + "&cuisine=" + $scope.dropdownCuisines;
	    }
        if ($scope.dropdownGrades) {
            url = url + "&grade=" + $scope.dropdownGrades;
	    }
        if ($scope.search) {
            url = url + "&search=" + $scope.search;
	    }

        $http.get('http://localhost:3000/initialList?filter=true' + url).success(function (data) {
            var i, coords;
            for (i = 0; i < markersArray.length; i += 1) {
                markersArray[i].setMap(null); //markersArray is in the file custom.js.
			}
            redrawMap(); //Just re-centering and re-zooming the map.
            for (i = 0; i < data.length; i += 1) {
                coords = (data[i].address.coord).split(",");
                addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name);
            }
            $scope.$evalAsync(function () {
                $scope.restaurants = data;
            });
        });
    };

	/***
	* Deleting a restaurant record.
	* The key point in this method is to send the proper HTTP headers for node.
	*/
	$scope.deleteRestaurant = function (id) {
		if (confirm("Confirm the deletion of this restaurant?")) {
			$http({url : 'delete', method : 'DELETE',
                   data: {id : id},
                   headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
                  }).then(function (res) {
                //console.log(res.data);
                $scope.loadData();
                $scope.loadTable();
                //TO DO.. Change this window.alert to a Bootstrap alert.
                window.alert("The restaurant was deleted successfully.");
            }, function (error) {
                console.log(error);
            });
        }
    };

	//TO DO...
	$scope.loveRestaurant = function (id) {
		//window.alert(id);
		$http.get('/addFavourite?id=' + id).success(function (data) {
            window.alert(data);
            $http.get('/favorites').success(function (data) {
                $scope.favoriterestaurants = data;
            });
	    });
	};


	/***
	 * Receiving data from browser and sending the data to Node.js
	 */
	$scope.addRestaurant = function () {
		var postData = {
			'name' : $scope.name,
			'building' : $scope.building,
			'lat' : $scope.lat,
			'long' : $scope.long,
			'street' : $scope.street,
			'zipcode' : $scope.zipcode,
			'borough' : $scope.add_borough,
			'cuisine' : $scope.add_cuisine
        };
        var request = $http({method: "post", url: "/addNew", data: postData}).success(function (data, status) {
			if (data) {
				window.alert(data);
			}
		});
	};
});