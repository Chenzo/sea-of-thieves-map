

var map = L.map("mapid", {
    maxZoom: 7,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false
}).setView([70, 70], 4);

var bounds = new L.LatLngBounds(map.unproject([0, 20924], 7), map.unproject([20924, 0], 7));

map.fitBounds(bounds);

layer = L.tileLayer("images/tiles/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 7,
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
    {"loc":[-49.613525, 122.312012], "title":"The Sunken Grove", radius: 3},
    {"loc":[-53.00293, 142.175415], "title":"Galleon's Grave Outpost", radius: 3},
    {"loc":[-62.65918, 114.48791], "title":"Isle of Last Words", radius: 2},
    {"loc":[-65.15625, 127.15625], "title":"Skull Keep", radius: 2},
    {"loc":[-69.125, 140.09375], "title":"Tri-Rock Isle", radius: 2},
    {"loc":[-77.875, 132.375], "title":"Shiver Retreat", radius: 2},
    {"loc":[-76.14502, 149.006836], "title":"Liar's Backbone", radius: 2},
    {"loc":[-90.52002, 127.038086], "title":"Shark Tooth Key", radius: 2},
    {"loc":[-88.67627, 142.475586], "title":"Kranken's Fall", radius: 4},
    {"loc":[-71.851074, 100.23291], "title":"Shipwreck Bay", radius: 4},
    {"loc":[-55.99707, 28.127686], "title":"Rapier Cay", radius: 2},
    {"loc":[-63.62207, 19.908936], "title":"Crescent Isle", radius: 3},
    {"loc":[-72.65625, 29.5], "title":"Golden Sand Outpost", radius: 4},
    {"loc":[-79.662964, 14.701294], "title":"Sea Dog's Rest", radius: 2},
    {"loc":[-79.412262, 57.996521], "title":"Twin Groves", radius: 2},
    {"loc":[-89, 45.9375], "title":"Wanderers Refuge", radius: 4},
    {"loc":[-89.544189, 28.243774], "title":"Lagoon of Whispers", radius: 2},
    {"loc":[-94.631592, 14.016357], "title":"Mermaid's Hideaway", radius: 3},
    {"loc":[-102.756592, 34.328857], "title":"Sailor's Knot Stronghold", radius: 3},
    {"loc":[-101.039307, 69.45874], "title":"Fools Lagoon", radius: 2},
    {"loc":[-98.539307, 80.95874], "title":"Castaway Isle", radius: 2},
    {"loc":[-101.820557, 94.89624], "title":"Old Boot Fort", radius: 2},
    {"loc":[-115.021362, 49.43103], "title":"Plunder Valley", radius: 4},
    {"loc":[-113.333862, 67.2747], "title":"Chicken Isle", radius: 2},
    {"loc":[-112.496826, 82.470093], "title":"Snake Isle", radius: 3},
    {"loc":[-114.133301, 103.807495], "title":"Crooks's Hollow", radius: 2},
    {"loc":[-112.352051, 119.151245], "title":"Barnacle Cay", radius: 2},
    {"loc":[-123.622437, 131.406738], "title":"Ancient Spire Outpost", radius: 2},
    {"loc":[-121.170898, 31.903809], "title":"Discovery Ridge", radius: 4},
    {"loc":[-134.920898, 42.466309], "title":"Old Salts Atoll", radius: 2},
    {"loc":[-126.573975, 62.819702], "title":"Lost Gold Fort", radius: 2},
    {"loc":[-142.713379, 57.555176], "title":"Shark Bait Cove", radius: 4},
    {"loc":[-145.838379, 71.555176], "title":"Lookout Point", radius: 2},
    {"loc":[-150.088379, 82.367676], "title":"Booty Isle", radius: 2},
    {"loc":[-132.392822, 80.059204], "title":"Plunder Outpost", radius: 3},
    {"loc":[-124.549072, 92.434204], "title":"Paradise Spring", radius: 2},
    {"loc":[-130.830322, 101.809204], "title":"Cutlass Cay", radius: 2},
    {"loc":[-127.950684, 114.55481], "title":"The Crow's Nest Fortress", radius: 2},
    {"loc":[-141.200684, 110.21106], "title":"Mutineer Rock", radius: 2},
    {"loc":[-141.24353, 125.804077], "title":"Devil's Ridge", radius: 3},
    {"loc":[-145.062866, 96.548401], "title":"Thieves' Haven", radius: 4}

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
















