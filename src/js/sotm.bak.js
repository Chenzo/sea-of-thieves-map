console.log("sea of thieves map");



var map = L.map('mapid', {
    crs: L.CRS.Simple
});

//map is 8000, 5610

var bounds = [[0,0], [700,1000]];
var image = L.imageOverlay('images/sotm.jpg', bounds).addTo(map);

map.fitBounds(bounds);



/* var sol = L.latLng([ 145, 175.2 ]);
L.marker(sol).addTo(map);
//map.setView( [70, 120], 1);
var myIcon = L.divIcon({className: 'my-div-icon'});
// you can set .my-div-icon styles in CSS
L.marker([500, 400], {icon: myIcon}).addTo(map).bindPopup("I am a green leaf.");



var circle = L.circle([494.035156, 433.823242], {
    //color: 'red',
    stroke: 0,
    fillColor: '#fff',
    fillOpacity: 0.5,
    radius: 10,
    className: 'customclass',
    //draggable: true
}).addTo(map).bindPopup("Lone Cove"); */



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











//Tile work and fail:

//var southWest = map.unproject([0, 9776], map.getMaxZoom());
//var northEast = map.unproject([8990, 0], map.getMaxZoom());
//map.setMaxBounds(new L.LatLngBounds(southWest, northEast));


/* var bounds = [[0,0], [919,1000]];
L.tileLayer('http://localhost:3000/images/tiles/sotm_v1_1-3.jpg', {  
    minZoom: 0,
    maxZoom: 18
}).addTo(map);
map.fitBounds(bounds);  */

/* var bounds = [[0,0], [919,1000]];
L.TileLayer.Kitten = L.TileLayer.extend({
    getTileUrl: function(coords) {
        var i = Math.ceil( Math.random() * 4 );
        return "http://localhost:3000/images/tiles/sotm_v1_{x}-2.jpg"
    },
    getAttribution: function() {
        return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>"
    }
});

L.tileLayer.kitten = function() {
    return new L.TileLayer.Kitten();
}


L.tileLayer.kitten().addTo(map);
map.fitBounds(bounds); */














/*
var gridOverlay = new L.LayerGroup();
map.addLayer(gridOverlay);

var startTop = 637;
var width = 23.4;
var height = 23.3;
for(downCount = 0; downCount < 26; downCount++){
    var startLeft = 210;
    down = startTop - height;
    for(count = 0; count < 26; count++){
        over = startLeft + width;
        var polygon = L.polygon([
            [startTop, startLeft],
            [startTop, over],
            [down, over],
            [down, startLeft]
        ], {
            fillColor: '#fff',
            stroke: 0,
            zindex: 30,
            className: 'alphanum_grid',
            title: 'VINCE'
        })
        
        startLeft+= width;
        gridOverlay.addLayer(polygon);
    }
    startTop-= height;
}
*/





/* var grid = L.gridLayer({
    attribution: 'Grid Layer',
    tileSize: 200,
    zIndex: 6000
});
grid.createTile = function (coords) {
    var tile = document.createElement('div');
    tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
    tile.style.outline = '1px solid red';
    //tile.style.background = 'white';
    return tile;
};

grid.on('loading', function() { console.log('loading'); });
		//grid.on('load', function() { console.log('load'); });
		//grid.on('tileunload', function(tile) { console.log('tileunload ' + tile.coords.x + ',' + tile.coords.y + ',' + tile.coords.z); });

map.addLayer(grid); */