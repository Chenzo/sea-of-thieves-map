import * as pwa from './modules/pwa.js';
import * as island_data from './modules/island_data.js';
import * as throne_data from './modules/throne_data.js';



var islands = island_data.islands;
var thrones = throne_data.thrones;
var isOnline = pwa.isOnline;

console.log("-- detect isOnline: " + isOnline);

var map = L.map("mapid", {
    maxZoom: 7,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false
}).setView([70, 70], 4);

var bounds = new L.LatLngBounds(map.unproject([0, 20924], 7), map.unproject([20924, 0], 7));

map.fitBounds(bounds);

var layer = L.tileLayer("images/tiles/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 7,
    bounds: bounds,
    noWrap: !0,
    tms: !1
}).addTo(map);


map.setMaxBounds(bounds, {padding: [200,200]});




var userMarkersLayer = new L.LayerGroup();
map.addLayer(userMarkersLayer);




function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);


    var xmarksspot = L.icon({
        iconUrl: '/images/xmarksthespot.png',
        shadowUrl: '/images/xmarksthespot.png',
    
        iconSize:     [40, 45], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [20, 24], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
    });
    
    //L.marker(e.latlng, {icon: xmarksspot}).addTo(map);
}

map.on('click', onMapClick);




var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);
var controlSearch = new L.Control.Search({
    position:'topright',		
    layer: markersLayer,
    initial: false,
    zoom: 4,
    marker: false
});
map.addControl( controlSearch );




for(var i in islands) {
    var title = islands[i].title;
    var circle = L.circle(islands[i].loc, {
        //color: 'red',
        strokeweight: 1,
        opacity: 0,
        color: '#fff',
        fillColor: '#fff',
        fillOpacity: 0,
        radius: islands[i].radius,
        className: 'customclass',
        title: title
        //draggable: true
    }).bindPopup(title);
    markersLayer.addLayer(circle);
}



//add thrones
var thronesLayer = new L.LayerGroup();
map.addLayer(thronesLayer);


for(var t in thrones) {
    var loc = thrones[t].loc;

    var throne_icon = L.icon({
        iconUrl: '/images/markers/throne_marker.png',
        shadowUrl: '/images/markers/throne_marker.png',
    
        iconSize:     [30, 30], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: throne_icon,
        title: 'Skelton Throne'  
        /* opacity: 0.5 */
    } 
    ).addTo(thronesLayer)
    .bindPopup("<b>Skelton Throne</b><br>located kinda here...");

}



/*
var overlayMaps = {
    "Thrones": thronesLayer ,
    "Sport": sport,
    "Sights": sights 
    };
    
L.control.layers(overlayMaps).addTo(map); */






//Graticule
var options = {interval: 5.85,
    showOriginLabel: false,
    redraw: 'move',
    zoomIntervals: [
     {start: 3, end: 6, interval: 5.85}
 ]};
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


function tweakHeight() {
    console.log("hieght fix");
    var wH = $(window).height();
    $(".sotm_wrapper").css({"height" : wH + "px"});
    $("#mapid").css({"height" : wH + "px"});
}

var currentSearchIsland = -1;

$(function() {

    //This is a fix for the menubar dropping down?
    tweakHeight();
    $(window).resize(function() {
        tweakHeight();
    });
    $(window).on("load", function (e) {
        tweakHeight();
    });

    $(".js-searchforisland").click(function() {
        
        if ($(this).data("dir") == "left") {
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
        var LatLong = islands[currentSearchIsland].loc;
        map.setView(LatLong, 6);
        //map.panTo(LatLong, 6);
        
    });
});









