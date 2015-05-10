var sid = 0;

function start() {
    geturl();
    initialize();
    //SaveData('');
}
function SaveData(command) {
    try {
       
        var tn = document.getElementById("tbn").value;
        var te = document.getElementById("tbe").value;

         $.ajax({
             type: "POST",
             url: "http://www.tadreeb.ws/code/stadiummap.ashx",
             data: { command: command,  id: sid ,tn:tn,te:te},
             success: function (par) {
                
                 var arr = par.split("//");
                 if (arr[0] != "") showmessage(arr[0]);
                  
             },
             error: function (par) { showmessage(par); }
         });
    }
    catch (e) { showmessage(e); }
}
var map;
var open = 0;
var markers = [];
//================
function initialize() {
    try {
       
        var center = new google.maps.LatLng(21.521753, 39.156389);
        var postion = new google.maps.LatLng(21.521753, 39.156389);

        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            center: center
        };
        map = new google.maps.Map(document.getElementById("showdata"),
            mapOptions);

        google.maps.event.addListener(map, 'click', function (event) {

            var info = event.latLng.toString();
            info = info.substr(1, info.length - 2);
            //generate(info);
            var pos = info.split(',');
            document.getElementById('tbn').value = pos[0];
            document.getElementById('tbe').value = pos[1];

            deleteMarkers();
            addMarker(event.latLng);
            showMarkers();
            SaveData('save');
        }
       );


    }
    catch (e) { showmessage(e); }

}

// Add a marker to the map and push to the array.
function addMarker(location) {

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);

    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

//===================
function geturl() {
    try {
        var sURL = window.document.URL.toString();
        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");

            var arrURLParams = arrParams[1].split("&");

            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);

            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = "No Value";
            }
            sid = arrParamValues[0];
           
        }
    }
    catch (e) { }
}
