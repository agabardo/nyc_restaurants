var app = angular.module("nycRestaurants", []); 
app.controller("myController", function($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
});