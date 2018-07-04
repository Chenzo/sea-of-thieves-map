console.log("sea of thieves map");



window.map_center = [4900, 4900];
window.map_mZoom  = 6;

var map_settings = {
    minZoom: 2,
    maxZoom: window.map_mZoom,
    center: window.map_center,
    zoom: 4,
    attributionControl: false,
    crs: L.CRS.Simple
    //zoomControl: false,
    //layers: allLayers
};

var map = L.map('mapid', map_settings).setView([0, 0], 4);

var bounds = new L.LatLngBounds(
    map.unproject([0, 9000], 6),
    map.unproject([8900, 0], 6));


map.setMaxBounds(bounds);

var layer_settings = {
    //tms: true,
    bounds: bounds,
    noWrap: true,
    crs: L.CRS.Simple
};

//L.tileLayer('./images/sot_map_tiles/{z}/{x}/{y}.png', layer_settings).addTo(map);

var tiles = L.tileLayer('./images/sot_map_tiles/{z}/{x}/{y}.png', layer_settings);

tiles.getTileUrl = function(coords) {
 // coords.y = -coords.y;
    console.log(coords);
  return L.TileLayer.prototype.getTileUrl.bind(tiles)(coords);
}

tiles.addTo(map);

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);





var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);


/* var controlSearch = new L.Control.Search({
    position:'topright',		
    layer: markersLayer,
    initial: false,
    zoom: 4,
    marker: false
});

map.addControl( controlSearch );

 */
var islands = [
    {"loc":[494.035156, 433.823242], "title":"Lone Cove", radius: 10},
    {"loc":[376, 391], "title":"Cannon Cove", radius: 12},
    {"loc":[412.825195, 441.530273], "title":"Rum Runner Isle", radius: 4},
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


var options = {interval: 26,
    showOriginLabel: false,
    redraw: 'move',
    zoomIntervals: [
     {start: 2, end: 6, interval: 26}
 ]};

L.simpleGraticule(options).addTo(map);




map.on('zoomend', function() {
    console.log("haHA!!!");
    adjustAlphaNum();
});

map.on('move', function() {
    adjustAlphaNum();
});

function adjustAlphaNum() {
    console.log(map.getZoom(), map.getCenter());
    console.log(map.getBounds());
}


