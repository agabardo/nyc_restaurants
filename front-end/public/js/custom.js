/*global $, initialize, google*/
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

function initialize () {
	var latlng = new google.maps.LatLng(40.751771, -73.988694),
        options = {
            zoom : 10,
            center : latlng,
            styles: styleArray
        };
    MyMap = new google.maps.Map(document.getElementById('map'), options);
}

function redrawMap() {
	bounds = new google.maps.LatLngBounds();
	MyMap.setCenter(new google.maps.LatLng(40.751771, -73.988694));
}

function addMarker(lat, lng, title, id) {
	var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        marker = new google.maps.Marker({
            id : id,
            title : title,
            position : point,
            map : MyMap,
            icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }),
        contentString = '<div id="content">' + title + '</div>',
        infowindow = new google.maps.InfoWindow({
            content: contentString
        });

	marker.addListener('click', function () {
		infowindow.open(MyMap, marker);
	});

	marker.addListener('mouseover', function () {
		$("#" + id).addClass("background-color");
		$("#" + id).removeClass("background-color-normal");
		marker.setAnimation(google.maps.Animation.BOUNCE);
	});

	marker.addListener('mouseout', function () {
		$("#" + id).addClass("background-color-normal");
		$("#" + id).removeClass("background-color");
		marker.setAnimation(google.maps.Animation.NONE);
	});

	markersArray.push(marker);

	bounds.extend(point);
	MyMap.fitBounds(bounds);
	MyMap.panToBounds(bounds);
}

function highlightMarker(id) {
	//Provisional, find a way to avoid this loop.
	var i;
    for (i = 0; i < markersArray.length; i += 1) {
		if (markersArray[i].id === id.id) {
			markersArray[i].setAnimation(google.maps.Animation.BOUNCE);
			markersArray[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
		}
	}
}

function outshineMarker(id) {
	//Provisional, find a way to avoid this loop.
    var i;
	for (i = 0; i < markersArray.length; i += 1) {
		if (markersArray[i].id === id.id) {
			markersArray[i].setAnimation(google.maps.Animation.NONE);
			markersArray[i].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
		}
	}
}

/***************************************
* Other things...
***************************************/
$(document).ready(function () {
	//$("#info_grades").hide();
	initialize();
});

function show_info(theDiv) {
	$("#" + theDiv).show('slow');
}
function hide_info(theDiv) {
	$("#" + theDiv).hide();
}
