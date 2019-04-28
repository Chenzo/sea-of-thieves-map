
var xMarkers = [];
var compMark;


var throne_L_icon = L.icon({
    iconUrl: '/images/markers/throne_marker_l.png',
    shadowUrl: '/images/markers/throne_marker_l.png',
    iconSize:     [31, 40],// size of the icon
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var throne_S_icon = L.icon({
    iconUrl: '/images/markers/throne_marker_s.png',
    shadowUrl: '/images/markers/throne_marker_s.png',
    iconSize:     [31, 40],// size of the icon
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var cargorun_icon = L.icon({
    iconUrl: '/images/markers/crate_marker.png',
    shadowUrl: '/images/markers/crate_marker.png',

    iconSize:     [31, 40], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
});



var beacon_icon = L.icon({
    iconUrl: '/images/markers/beacon_marker.png',
    shadowUrl: '/images/markers/beacon_marker.png',

    iconSize:     [31, 40], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
});

var compass_marker = L.icon({
    iconUrl: '/images/markers/compass.png',
    shadowUrl: '/images/markers/compass.png',
    
    iconSize:     [50, 48], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [25, 24], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});



var boatMarker = L.icon({
    iconUrl: '/images/markers/boat_marker.png',
    shadowUrl: '/images/markers/boat_marker.png',
    
    iconSize:     [50, 59], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [25, 29], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


var xmarksspot = L.icon({
    iconUrl: '/images/markers/xmarkthespot_marker.png',
    shadowUrl: '/images/markers/xmarkthespot_marker.png',
    
    iconSize:     [40, 52], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [20, 52], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});




//NOT USED?
function makeMarker(L, markerData, markerLayer) {
    console.log("wait. what?");
    console.log(markerData);
    var loc = markerData.loc;
    var size = markerData.isLarge ? " Large" : " Small";
    var title = markerData.title + size + " Skelton Throne";
    var mkr = markerData.isLarge ? throne_L_icon : throne_S_icon;

    console.log[loc];
    var marker = L.marker(loc, {  
        icon: mkr,
        title: title
    } 
    ).addTo(markerLayer)
    .bindPopup(markerData.desc);
}




function getMarker(markerData, mType) {
    var loc = markerData.loc;


    if (mType == "throne") {
        var size = markerData.isLarge ? " Large" : " Small";
        var title = markerData.title + size + " Skelton Throne";
        var mkr = markerData.isLarge ? throne_L_icon : throne_S_icon;
    } else if (mType =="cargo") {
        var mkr = cargorun_icon;
        title = markerData.title + " | Cargo Run";
    } else if (mType == "beacon") {
        var mkr = beacon_icon;
        title = markerData.title + " Beacon";
    }


    var desc = markerData.desc;
    var marker = L.marker(loc, {  
        icon: mkr,
        title: title,
        name: markerData.title
    });

    var r = {"title" : title,
            "marker" : marker,
            "desc" : desc};

    return r;
}




function addComp(latLng, degs, map) {
    clearComp(map);
    compMark = L.marker(latLng, {icon: boatMarker, draggable: false}).addTo(map);
    //console.log(compMark._icon.style);
    var newStyle = compMark._icon.style.transform + " rotate(" + degs + "deg)";
    //console.log(newStyle);
    compMark._icon.style.transform = newStyle;
    xMarkers.push(compMark);
}

function clearComp(map) {
    if(compMark) {
        map.removeLayer(compMark);
    }
}

function addXmark(latLng, map) {
    var xMark = L.marker(latLng, {icon: xmarksspot, draggable: true}).addTo(map);
    xMark.on('dragend', function (e) {
        console.log('marker dragend event');
        setQstring();
    });
    xMarkers.push(xMark);
}

function clearXmarks(map) {
    xMarkers.forEach(function(mkr) {
        map.removeLayer(mkr);
    });
    xMarkers = [];
}

function setQstring() {
    var qS = getXstring();
    updateQueryStringParam("mkrs", qS);
}


function getXstring() {
    var xm = "";
    var one;
    xMarkers.forEach(function(element) {
        one = element.getLatLng().lat + "," + element.getLatLng().lng + ";";
        xm = xm + one; 
    });
    
    xm = window.encodeURIComponent(window.btoa(xm)); // encode a string
    return (xm);
}

export {
    makeMarker,
    getMarker,
    xMarkers,
    addXmark,
    addComp,
    clearXmarks,
    clearComp,
    setQstring
};
