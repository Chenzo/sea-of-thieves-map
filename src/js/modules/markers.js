
var xMarkers = [];
var compMark;


var markerIcons = {
    "throne_L" : {
        iconUrl: '/images/markers/throne_marker_l.png',
        iconSize:     [31, 40],
        iconAnchor:   [15, 40]
    },

    "throne_S" : {
        iconUrl: '/images/markers/throne_marker_s.png',
        iconSize:     [31, 40],
        iconAnchor:   [15, 40]
    },

    "cargorun" : {
        iconUrl: '/images/markers/crate_marker.png',
        iconSize:     [31, 40], 
        iconAnchor:   [15, 40], 
    },

    "beacon" : {
        iconUrl: '/images/markers/beacon_marker.png', 
        iconSize:     [31, 40], 
        iconAnchor:   [15, 40],
        popupAnchor:  [-20, -45] 
    },

    "compass" : {
        iconUrl: '/images/markers/compass.png',   
        iconSize:     [50, 48], 
        iconAnchor:   [25, 24]
    },

    "boat" : {
        iconUrl: '/images/markers/boat_marker.png',
        iconSize:     [50, 59], 
        shadowSize:   [0, 0], 
        iconAnchor:   [25, 29]
    },

    "xmarksspot" : {
        iconUrl: '/images/markers/xmarkthespot_marker.png',
        iconSize:     [40, 52], 
        iconAnchor:   [20, 52]
    }

};



/*
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
*/


var boatMarker = L.icon({
    iconUrl: '/images/markers/boat_marker.png',
    iconSize:     [50, 59], // size of the icon
    iconAnchor:   [25, 29]
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
    var mkr, title;

    if (mType == "throne") {
        var size = markerData.isLarge ? " Large" : " Small";
        title = markerData.title + size + " Skelton Throne";
        mkr = markerData.isLarge ? markerIcons["throne_L"] : markerIcons["throne_S"];
    } else if (mType =="cargo") {
        mkr = markerIcons["cargorun"];
        title = markerData.title + " | Cargo Run";
    } else if (mType == "beacon") {
        mkr = markerIcons["beacon"];
        title = markerData.title + " Beacon";
    }


    var desc = markerData.desc;
    var classes = "markerIcon " + mType + " " + window.websafe(title);

    var marker = new L.Marker(loc, {
		icon: new L.DivIcon({
			className: classes,
            iconAnchor: mkr.iconAnchor,
            iconSize: null,
            html: '<img src="' + mkr.iconUrl + '" alt="">'
		})
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
