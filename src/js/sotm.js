

var map = L.map("mapid", {
    maxZoom: 6,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false
}).setView([70, 70], 4);

var bounds = new L.LatLngBounds(map.unproject([0, 10462], 6), map.unproject([10462, 0], 6));

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
    {"loc":[-78.422607, 118.649658], "title":"The Crooked Masts", radius: 3},
    {"loc":[-25.71875, 15.59375], "title":"Sailor's Bounty", radius: 4},
    {"loc":[-18.227905, 40.417725], "title":"Smugglers' Bay", radius: 4},
    {"loc":[-20.850708, 54.960571], "title":"Salty Sands", radius: 2},
    {"loc":[-25.875, 66.875], "title":"Picaroon Palms", radius: 2},
    {"loc":[-24.90625, 85.8125], "title":"Scurvy Isley", radius: 2},
    {"loc":[-25.786011, 104.275391], "title":"Old Faithful Isle", radius: 4},
    {"loc":[-20.0625, 118.4375], "title":"Black Sand Atoll", radius: 2},
    {"loc":[-18.634888, 133.902466], "title":"Marauder's Arch", radius: 4},
    {"loc":[-30.094604, 30.657227], "title":"Sandy Shallows", radius: 2},
    {"loc":[-30.9375, 47.96875], "title":"Boulder Cay", radius: 2},
    {"loc":[-42.625, 21.96875], "title":"Keel Haul Fort", radius: 2},
    {"loc":[-45.8125, 41.28125], "title":"Sanctuary Outpost", radius: 4},
    {"loc":[-53.90625, 55], "title":"Lonely Isle", radius: 2},
    {"loc":[-53.125, 69.25], "title":"Hidden Spring Keep", radius: 3},
    {"loc":[-38.733154, 112.010498], "title":"Blind Man's Lagoon", radius: 2},
    {"loc":[-32.576904, 123.666748], "title":"Shark Fin Camp", radius: 2},
    {"loc":[-39.858154, 134.197998], "title":"Plunderer's Plight", radius: 2},
    {"loc":[-31.59375, 141.65625], "title":"Black Water Enclave", radius: 2},
    {"loc":[-38.125, 90.5625], "title":"Kraken's Watchtower", radius: 2},
    {"loc":[-51.208862, 103.17157], "title":"Dagger Tooth Outpost", radius: 4},

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
















