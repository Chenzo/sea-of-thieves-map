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
