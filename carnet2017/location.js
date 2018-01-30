
getLocation();
setInterval(getLocation, 10000);

//Geolocation test:
https://www.google.com/maps/@39.9936836,-0.0679219,18z

    function getLocation() {
 	if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
 	        $("#posicion").html("Geolocation is not supported by this browser.");
            $("#gmaps").attr("style", "visibility:hidden;");
        }
    }

function errorCallback() { $("#gmaps").attr("style","visibility:hidden;"); }
 

function successCallback(position) {
    $("#posicion").html("lat. " + position.coords.latitude + " long. " + position.coords.longitude);
    

    var distancia = calcCrow(position.coords.latitude, position.coords.longitude, 39.98903, -0.0645063);

    $("#distancia").html(distancia.toFixed(0));

    $("#gmaps").attr("href", "https://www.google.com/maps/@" + position.coords.latitude + "," + position.coords.longitude + ",18z");

    if (distancia <= 30) {
        //$("#premio").html("HAS ENCONTRADO EL TESORO!!");
        $("#premio").removeAttr("style", "visibility: hidden;");
    }
 }



//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in meters)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d*1000;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}