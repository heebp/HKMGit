window.onload = getMyLocation;

var ourCoords = {
    latitude : 37.477128,
    longitude : 126.981734
};

function getMyLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation);

        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }else {
        alert("Oops, no geolocation support");
    }
}

function computeDistance(startCoords, destCoords){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads)* Math.sin(destLatRads) / Math.cos(startLatRads) 
    * Math.cos(destLatRads) * Math.cos(startLongRads- destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees){
    var radians = (degrees * Math.PI)/180;
    return radians;
}

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");

    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");

    if(map == null){
        showMap(position.coords);
    }else{
        scrollMapToPosition(position.coords);
    }
}

var map;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var title = "Your Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    //자신의 위치 마커 활성화 --> 판매자가 등록한 위치로 마커 설정할 것
    //addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content){
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
}

var watchId = null;

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch(){
    if(watchId){
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

var positionOptions = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0
}

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(
        displayLocation,
        displayError,
        {timeout:5000});
}

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);

    map.panTo(latlong);

    addMarker(map, latLong, "Your new location", "You moved to: " + latitude +", "+ longitude);
}