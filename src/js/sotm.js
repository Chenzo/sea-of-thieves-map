console.log("sea of thieves map");



var map = L.map('mapid', {
    crs: L.CRS.Simple
});

//map is 8000, 5610
var bounds = [[0,0], [700,1000]];
var image = L.imageOverlay('images/sotm.jpg', bounds).addTo(map);

map.fitBounds(bounds);



function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);



var gridOverlay = new L.LayerGroup();
map.addLayer(gridOverlay);

/* var polygon = L.polygon([
    [637, 210],
    [637, 234],
    [615, 234],
    [615, 210]
]); */

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
        });
        
        startLeft+= width;
        gridOverlay.addLayer(polygon);
    }
    startTop-= height;
}






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
        title: title,
        add: function() {
            console.log("here?");
        }
        //draggable: true
    }).bindPopup(title);

    markersLayer.addLayer(circle);
}

map.on('zoomend', function() {
    console.log("haHA!!!");
});

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

