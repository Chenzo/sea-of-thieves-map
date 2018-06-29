console.log("sea of thieves map");



var map = L.map('mapid', {
    crs: L.CRS.Simple
});

//map is 8000, 5610

var bounds = [[0,0], [700,1000]];
var image = L.imageOverlay('images/sotm.jpg', bounds).addTo(map);

map.fitBounds(bounds);



var sol = L.latLng([ 145, 175.2 ]);
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
}).addTo(map).bindPopup("Lone Cove");



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





//sample data values for populate map
var data = [
    {"loc":[200,300], "title":"aquamarine"},
    {"loc":[41.575730,13.002411], "title":"black"},
    {"loc":[41.807149,13.162994], "title":"blue"},
    {"loc":[41.507149,13.172994], "title":"chocolate"},
    {"loc":[41.847149,14.132994], "title":"coral"},
    {"loc":[41.219190,13.062145], "title":"cyan"},
    {"loc":[41.344190,13.242145], "title":"darkblue"},	
    {"loc":[41.679190,13.122145], "title":"Darkred"},
    {"loc":[41.329190,13.192145], "title":"Darkgray"},
    {"loc":[41.379290,13.122545], "title":"dodgerblue"},
    {"loc":[41.409190,13.362145], "title":"gray"},
    {"loc":[41.794008,12.583884], "title":"green"},	
    {"loc":[41.805008,12.982884], "title":"greenyellow"},
    {"loc":[41.536175,13.273590], "title":"red"},
    {"loc":[41.516175,13.373590], "title":"rosybrown"},
    {"loc":[41.506175,13.273590], "title":"royalblue"},
    {"loc":[41.836175,13.673590], "title":"salmon"},
    {"loc":[41.796175,13.570590], "title":"seagreen"},
    {"loc":[41.436175,13.573590], "title":"seashell"},
    {"loc":[41.336175,13.973590], "title":"silver"},
    {"loc":[41.236175,13.273590], "title":"skyblue"},
    {"loc":[41.546175,13.473590], "title":"yellow"},
    {"loc":[41.239190,13.032145], "title":"white"}
];


////////////populate map with markers from sample data
for(i in data) {
    var title = data[i].title,	//value searched
        loc = data[i].loc,		//position found
        marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
    marker.bindPopup('title: '+ title );
    markersLayer.addLayer(marker);
}