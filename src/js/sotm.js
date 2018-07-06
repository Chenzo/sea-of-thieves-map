

var map = L.map("mapid", {
    maxZoom: 6,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false
}).setView([70, 70], 4);

var bounds = new L.LatLngBounds(map.unproject([0, 9676], 6), map.unproject([10462, 0], 6));

map.fitBounds(bounds);

layer = L.tileLayer("images/tiles/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 6,
    bounds: bounds,
    noWrap: !0,
    tms: !1
}).addTo(map);
map.setMaxBounds(bounds);

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
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


var islands = [
    {"loc":[-39.625, 60.1], "title":"Lone Cove", radius: 4},
    {"loc":[-67.53125, 48.125], "title":"Cannon Cove", radius: 4},
    {"loc":[-65.09375, 62.84375], "title":"Rum Runner Isle", radius: 2},
    {"loc":[350.492188, 656.982422], "title":"The Crooked Masts", radius: 14},
    
]

for(i in islands) {
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


var options = {interval: 5.85,
    showOriginLabel: false,
    redraw: 'move',
    zoomIntervals: [
     {start: 3, end: 6, interval: 5.85}
 ]};

L.simpleGraticule(options).addTo(map); 


/* L.simpleGraticule({
    interval: .76,
    redraw: "move"
}).addTo(map) */


map.on('zoomend', function() {
    //console.log("haHA!!!");
    adjustAlphaNum();
});

map.on('move', function() {
    adjustAlphaNum();
});

function adjustAlphaNum() {
    //console.log(map.getZoom(), map.getCenter());
    //console.log(map.getBounds());
}
















