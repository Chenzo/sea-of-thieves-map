import * as pwa from './modules/pwa.js';
import * as island_data from './modules/island_data.js';
import * as throne_data from './modules/throne_data.js';
import * as beacon_data from './modules/beacon_data.js';
import * as cargorun_data from './modules/crates_data.js';
import * as tools from './modules/tools.js';


var layerArray = [];
var islands = island_data.islands;
islands.forEach(function(im) {
    im['searchData'] = "island|" + im.title;
});
var thrones = throne_data.thrones;
var beacons = beacon_data.beacons;
var cargoruns = cargorun_data.cargoruns;
cargoruns.forEach(function(im) {
    im['searchData'] = "cargorun|" + im.title;
});
var isOnline = pwa.isOnline;
var isDev = false;
var xMarkers = [];
var currentSearchIsland = -1;
var compMark;

console.log("-- detect isOnline: " + isOnline);

var cdnpath = "";
if (location.hostname != "localhost") {
    cdnpath = "https://cdn.chenzorama.com/";
}



/* 
 * Workaround for 1px lines appearing in some browsers due to fractional transforms
 * and resulting anti-aliasing.
 * https://github.com/Leaflet/Leaflet/issues/3575
 */
(function(){
    var originalInitTile = L.GridLayer.prototype._initTile;
    L.GridLayer.include({
        _initTile: function (tile) {
            originalInitTile.call(this, tile);

            var tileSize = this.getTileSize();

            tile.style.width = tileSize.x + 1 + 'px';
            tile.style.height = tileSize.y + 1 + 'px';
        }
    });
})();


var map = L.map("mapid", {
    maxZoom: 7,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false,
    maxBoundsViscosity: 1
}).setView([70, 70], 4);

var height = 25522;
var width = 27444;
var bounds = new L.LatLngBounds(map.unproject([0, height], 7), map.unproject([width, 0], 7));
map.setMaxBounds(bounds, {padding: [600,600]});

//map.fitBounds(bounds, {padding: [600,600]})
var hash = new L.Hash(map);

var layer = L.tileLayer(cdnpath + "images/tiles/v2.2/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 7,
    bounds: bounds,
    noWrap: !0,
    tms: !1
}).addTo(map);







var userMarkersLayer = new L.LayerGroup();
map.addLayer(userMarkersLayer);


var xmarksspot = L.icon({
    iconUrl: '/images/markers/xmarkthespot_marker.png',
    shadowUrl: '/images/markers/xmarkthespot_marker.png',
    
    iconSize:     [40, 52], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [20, 52], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
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

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);




var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

var chickensLayer = new L.LayerGroup();
map.addLayer(chickensLayer);
layerArray.push(['chickens', chickensLayer]);

var snakesLayer = new L.LayerGroup();
map.addLayer(snakesLayer);
layerArray.push(['snakes', snakesLayer]);

var pigsLayer = new L.LayerGroup();
map.addLayer(pigsLayer);
layerArray.push(['pigs', pigsLayer]);




/* customCircleMarker = L.CircleMarker.extend({
    options: { 
       someCustomProperty: 'Custom data!',
       anotherCustomProperty: 'More data!'
    }
 }); */

 //use circlemarker?

var chicken_marker = L.icon({
    iconUrl: '/images/markers/chicken_marker.png',
    shadowUrl: '/images/markers/chicken_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


var snake_marker = L.icon({
    iconUrl: '/images/markers/snake_marker.png',
    shadowUrl: '/images/markers/snake_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var pig_marker = L.icon({
    iconUrl: '/images/markers/pig_marker.png',
    shadowUrl: '/images/markers/pig_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [30, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


//Probably don't need to do this anymore, since it'll take watever params at this point
L.islandCircle = L.Circle.extend({
    options: { 
       name: 'islandName',
       json: {}
    }
 })

var island_markers = [];
for(var i in islands) {
    var islandName = islands[i].title;
    var cRad = islands[i].radius;

    var classes = "islandClass " + window.websafe(islandName);
    var circle = new L.islandCircle(islands[i].loc, {
        //color: 'red',
        strokeweight: 1,
        opacity: 0,
        color: '#fff',
        fillColor: '#fff',
        fillOpacity: 0,
        radius: cRad,
        className: classes,
        name: islandName,
        title: islandName,
        json: islands[i]
    })

    markersLayer.addLayer(circle);
    island_markers[i] = circle;
    islands[i].circle = circle;

    circle.on({
        mousedown: function(evt) {
            if (isDev) {
                evt.target.classList.add('pig show');
                map.dragging.disable();
                map.on('mousemove', function(e) {
                    evt.target.setLatLng(e.latlng);
                });
            } else {
                evt.target._path.classList.remove("pig", "show");
                clearComp();
                hidePopup();
            }
        },
        mouseup: function (evt) {
            if (isDev) {
                map.removeEventListener('mousemove');
                console.log(evt.target.options.title);
                console.log("[" + evt.latlng.lat + ", " + evt.latlng.lng + "],");
                map.dragging.enable(); //this doesn't seem to work
            }
        }
    });

    if (islands[i].chickens) {

        var chickenLoc = modifyLoc(islands[i].loc, cRad * 0.5, cRad * 0.6);

        var marker = L.marker(chickenLoc, { 
            icon: chicken_marker,
            title: 'chicken',
            opacity: 0
        } 
        ).addTo(chickensLayer);
        marker.setIcon(chicken_marker);

    }

    if (islands[i].snakes) {

        var snakeLoc = modifyLoc(islands[i].loc, cRad * 0.5, (cRad * 0.6) * -1);

        var marker = L.marker(snakeLoc, { 
            icon: snake_marker,
            title: 'snake' ,
            opacity: 0 
        } 
        ).addTo(snakesLayer);

        
    }

    if (islands[i].pigs) {

        var pigLoc = modifyLoc(islands[i].loc, (cRad * 0.5) * -1, (cRad * 0.6) * -1);

        var marker = L.marker(pigLoc, { 
            icon: pig_marker,
            title: 'pigs'  ,
            opacity: 0
        } 
        ).addTo(pigsLayer);

        
    }
}

//add beacons
var beaconsLayer = new L.LayerGroup();
layerArray.push(['beacons', beaconsLayer]);
map.addLayer(beaconsLayer);

var beacon_icon = L.icon({
    iconUrl: '/images/markers/beacon_marker.png',
    shadowUrl: '/images/markers/beacon_marker.png',

    iconSize:     [31, 40], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
});

for(var t in beacons) {
    var loc = beacons[t].loc;
    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: beacon_icon,
        title: 'Beacon',
        opacity: 0
    } 
    ).addTo(beaconsLayer);
    //.bindPopup(beacons[t].desc);
}


//add cargorun
var cargorunsLayer = new L.LayerGroup();
layerArray.push(['cargoruns', cargorunsLayer]);

var cargorun_icon = L.icon({
    iconUrl: '/images/markers/crate_marker.png',
    shadowUrl: '/images/markers/crate_marker.png',

    iconSize:     [31, 40], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
});

var cargo_run_markers = [];
for(var t in cargoruns) {
    var loc = cargoruns[t].loc;
    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: cargorun_icon,
        title: 'Cargo Run',
        name: cargoruns[t].title,
        opacity: 0
    } 
    ).addTo(cargorunsLayer)
    .bindPopup(cargoruns[t].title);

    cargo_run_markers[t] = marker;
}
//map.addLayer(cargorunsLayer);



//add thrones
var thronesLayer = new L.LayerGroup();
layerArray.push(['thrones', thronesLayer]);
map.addLayer(thronesLayer);

var throne_icon = L.icon({
    iconUrl: '/images/markers/throne_marker.png',
    shadowUrl: '/images/markers/throne_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
});

for(var t in thrones) {
    var loc = thrones[t].loc;
    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: throne_icon,
        title: 'Skelton Throne',
        opacity: 0
    } 
    ).addTo(thronesLayer)
    .bindPopup(thrones[t].desc);
}





var searchLayers = L.layerGroup([
    cargorunsLayer,
    markersLayer 
]);


function localData(text, callResponse)
{
    //here can use custom criteria or merge data from multiple layers
    callResponse(islands.concat(cargoruns));
    return {	//called to stop previous requests on map move
        abort: function() {
            console.log('aborted request:'+ text);
        }
    };
}

function customTip(text,val) {
    var className = getMarkerData(val);
    //console.log("check type: " + className);
    return '<a href="#" class="' + className + '">'+text+'</a>';
}

var controlSearch = new L.Control.Search({
    position:'topright',		
    layer: searchLayers,
    //sourceData: localData,
    propertyName: 'name', //title
    initial: false,
    zoom: 6,
    /* marker: {
        icon: cargorun_icon,
        animate: false,
        circle: false
    }, */
    marker: false,
    buildTip: customTip
});
map.addControl( controlSearch );


var SearchedMarker;
controlSearch.on('search:locationfound', function(event) {
    console.log(event);
    SearchedMarker =  event.layer;
    if (typeof SearchedMarker.setOpacity !== "undefined") {
        SearchedMarker.setOpacity(1);
        SearchedMarker.openPopup();
    }
});

controlSearch.on('search:collapsed', function(event) {
    if (typeof SearchedMarker.setOpacity !== "undefined") {
        SearchedMarker.setOpacity(0);
        SearchedMarker.closePopup();
    }
});



function getMarkerData(loc) {
    var mData = "island";

    cargo_run_markers.forEach(function(cr) {
         if (cr.getLatLng().lat == loc.lat && cr.getLatLng().lng == loc.lng) {
            console.log("Cargo Run Destination Found");
            mData = "cargo"; 
        }
        
    }); 

    return mData;

}



var toggleMarkers = function(theType, onoff) {
    var theLayer = getLayer(theType);
    //console.log(theType);

    theLayer.eachLayer(function (layer) {
        console.log(layer);
        if (onoff) {
            layer.setOpacity(1);
        } else {
            layer.setOpacity(0);
        }
    });

};

var getLayer = function(layerName) {
    for (var p=0; p<layerArray.length; p++) {
        if (layerArray[p][0] == layerName) {
            return layerArray[p][1];
        }
    }
};




function findNearestMarker(coords, type) {
    var minDist = 1000,
    markerDist,
    closest = {};

    for(var i in islands) {
        var title = islands[i].title;
        var loc = islands[i].loc;
        markerDist = map.distance(loc, coords);
        if ((markerDist < minDist) && islands[i][type]) {
            minDist = markerDist;
            closest.title = title;
            closest.islandData = islands[i];
        }
    }
    
    closest.bearing = window.angle360(coords.lat,coords.lng,closest.islandData.loc[0],closest.islandData.loc[1]);
    return closest;
};


var customOptions =
{
'maxWidth': '500',
'minWidth': '120',
'className' : 'context_popup'
};


var popup = L.popup(customOptions);

map.on('contextmenu', function(e) {
    var myLoc = e.latlng;
    popup
        .setLatLng(e.latlng)
        .setContent("<ul><li class='js-addMarker'>Add Marker</li>\
        <li class='js-clearMarkers'>Clear Markers</li>\
        <li class='js-closest' data-type='chickens'>Closest Chickens</li>\
        <li class='js-closest' data-type='pigs'>Closest Pigs</li>\
        <li class='js-closest' data-type='snakes'>Closest Snakes</li>\
        <li class='js-closest' data-type='outpost'>Closest Outpost</li>\
        </ul>")
        .openOn(map);

    $(".js-addMarker").click(function() {
        addXmark(myLoc);
        setQstring();
        map.closePopup();
    });

    $(".js-clearMarkers").click(function() {
        clearXmarks();
        clearComp();
        hidePopup();
        setQstring();
        map.closePopup();
    });

    $(".js-closest").click(function() {
        var type = $(this).data("type");
        var found = findNearestMarker(e.latlng, type);
        var mkr = found.islandData;

        $(".islandClass").removeClass("show pigs chickens snakes outposts");
        mkr.circle._path.classList.add(type, "show");

        var CapType = type.charAt(0).toUpperCase() + type.slice(1);
        var words = "<span class='type'>" + CapType + "</span> can be found to the <span class='direction'>" + window.getCardinalFromDeg(found.bearing) + "</span> at <span class='title'>" + found.title + "</span>";

        addComp(myLoc, found.bearing); //add compass at click point
        showPopup(words);
        map.closePopup();
    });
    

    // create popup contents
    /* var customPopup = "Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
    */
});

function addComp(latLng, degs) {
    clearComp();
    compMark = L.marker(latLng, {icon: boatMarker, draggable: false}).addTo(map);
    console.log(compMark._icon.style);
    var newStyle = compMark._icon.style.transform + " rotate(" + degs + "deg)";
    console.log(newStyle);
    compMark._icon.style.transform = newStyle;
    xMarkers.push(compMark);
}

function clearComp() {
    if(compMark) {
        map.removeLayer(compMark);
    }
}

function addXmark(latLng) {
    var xMark = L.marker(latLng, {icon: xmarksspot, draggable: true}).addTo(map);
    xMark.on('dragend', function (e) {
        console.log('marker dragend event');
        setQstring();
    });
    xMarkers.push(xMark);
}

function clearXmarks() {
    xMarkers.forEach(function(mkr) {
        map.removeLayer(mkr);
    });
    xMarkers = [];
}

function showPopup(words) {
    $('.floating_dialog').html(words).addClass("show");
}

function hidePopup() {
    $('.floating_dialog').removeClass("show");
}


//Graticule
var options = {interval: 8.2,
    vinterval: 7.7,
    showOriginLabel: false,
    redraw: 'move'/* ,
    zoomIntervals: [
     {start: 3, end: 6, interval: 5.85} 
 ]*/};
L.simpleGraticule(options).addTo(map); 


map.on('zoomend', function() {
    adjustAlphaNum();
});

map.on('move', function() {
    adjustAlphaNum();
});

map.on('moveend', function() {
    adjustAlphaNum();
});

function adjustAlphaNum() {
    var currentZoom = map.getZoom()
    if (currentZoom >= 4) {
        $(".leaflet-grid-label").addClass("big");
    }
    //console.log(map.getZoom(), map.getCenter());
    //console.log(map.getBounds());
}


function modifyLoc(locArray, newLat, newLong) {
    var newLoc =[locArray[0]+ newLat, locArray[1]+ newLong];
    return newLoc;
}


window.dev = {
    toggleOn: function() {
        console.log("dev");
        $(".islandClass").addClass("show");
        isDev = true;
    }
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

function readXstring() {
    var urlParams = new URLSearchParams(window.location.search);
    var mkrs = window.decodeURIComponent(urlParams.get('mkrs'));

    if (urlParams.get('mkrs') !== null) {
        var decodedData =  window.atob(mkrs); // decode the string
        var marks = decodedData.split(";");
        marks.forEach(function(entry) {
            if (entry !== "") {
                addXmark(entry.split(","));
            }
        });
    }
}



function getNextIsland(direction) {
    if (direction == "left") {
        currentSearchIsland--;
        if (currentSearchIsland < 0) {
            currentSearchIsland = islands.length - 1;
        }
    } else {
        currentSearchIsland++;
        if (currentSearchIsland >= islands.length) {
            currentSearchIsland = 0;
        }
    }

    if (islands[currentSearchIsland].isFortress || islands[currentSearchIsland].outpost || islands[currentSearchIsland].isSeapost) {
        return (getNextIsland(direction))
    }
    return (islands[currentSearchIsland]);
}

$(function() {


    $(".js-searchforisland").click(function() {
        
        var theIsland = getNextIsland($(this).data("dir"));

        var LatLong = theIsland.loc;
        map.setView(LatLong, 7);
        //map.panTo(LatLong, 7);
        adjustAlphaNum();
    });


    $(".js-toggleMarkers").click(function() {
        toggleMarkers($(this).attr("name"), $(this).is(":checked"));
    });

    $(".js-fullscreen").click(function() {
        window.toggleFullScreen();
    });

    $(".js-share").click(function() {
        var fullURL = window.location.href;
        navigator.clipboard.writeText(fullURL).then(function() {
            console.log('Async: Copying to clipboard was successful!');
            showPopup("Current Map Location URL Copied To Clipboard!");
            setTimeout(hidePopup, 4000);
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });


    $(".js-installfiles").click(function() {
        console.log("click install");
        pwa.installer();
    });

    $(".js-settings").click(function() {
        console.log("click settings");
        $(".settings").addClass("open");
    });

    $(".js-close-settings").click(function() {
        console.log("click settings");
        $(".settings").removeClass("open");
    });

    readXstring();
    
});



