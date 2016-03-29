$(document).ready(initialize);
var MyMap;
var bounds = new google.maps.LatLngBounds();

function initialize() {
	var latlng = new google.maps.LatLng(40.751771, -73.988694);
	var options = {
		zoom : 20,
		center : latlng
	};
	MyMap = new google.maps.Map(document.getElementById('map'), options);
}

function addMarker(lat, lng, title) {
	var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
	var marker = new google.maps.Marker({
		title : title,
		position : point,
		map : MyMap
	});
	bounds.extend(point);
	MyMap.fitBounds(bounds);
}