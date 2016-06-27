/***************************************
* Google Maps things...
***************************************/
$(document).ready(initialize);
var MyMap;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];

var styleArray = [ {
	featureType : "all",
	stylers : [ {
		saturation : -70
	} ]
}, {
	featureType : "road.arterial",
	elementType : "geometry",
	stylers : [ {
		hue : "#CCffee"
	}, {
		saturation : 50
	} ]
}, {
	featureType : "poi.business",
	elementType : "labels",
	stylers : [ {
		visibility : "off"
	} ]
} ];

function initialize() {
	var latlng = new google.maps.LatLng(40.751771, -73.988694);
	var options = {
		zoom : 10,
		center : latlng,
		styles: styleArray
	};
	MyMap = new google.maps.Map(document.getElementById('map'), options);
}

function redrawMap(){
	bounds = new google.maps.LatLngBounds();
	MyMap.setCenter(new google.maps.LatLng(40.751771, -73.988694));
}

function addMarker(lat, lng, title) {
	var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
	var marker = new google.maps.Marker({
		title : title,
		position : point,
		map : MyMap,
		//icon : "images/marker.png"
	});
	markersArray.push(marker);
	bounds.extend(point);
	MyMap.fitBounds(bounds);
	MyMap.panToBounds(bounds)
	
}

/***************************************
* Other things...
***************************************/
$(document).ready(function(){
	//$("#info_grades").hide();
	initialize();
});

function show_info(theDiv){
	$("#"+theDiv).show('slow');
}
function hide_info(theDiv){
	$("#"+theDiv).hide();
}


