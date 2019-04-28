import * as pwa from './modules/pwa.js';
import * as island_data from './modules/island_data.js';
import * as throne_data from './modules/throne_data.js';
import * as beacon_data from './modules/beacon_data.js';
import * as cargorun_data from './modules/crates_data.js';
import * as places_data from './modules/places_data.js';
import * as tools from './modules/tools.js';


var layerArray = [];

var lang = window.location.pathname.substr(1);
console.log("language: " + lang);

var islands = island_data.islands;
var thrones = throne_data.thrones;
var beacons = beacon_data.beacons;
var cargoruns = cargorun_data.cargoruns;
var places = places_data.beacons;

function compare(a, b){
    const nameA = a.title.replace(/the /gi, '').toUpperCase();
    const nameB = b.title.replace(/the /gi, '').toUpperCase();
    if (nameA > nameB) return 1;
    if (nameB > nameA) return -1;
  
    return 0;
  }

islands.sort(compare);
//islands.sort(thrones);

islands.forEach(function(im) {
    im['searchData'] = "island|" + im.title;
});
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

var layer = L.tileLayer(cdnpath + "images/tiles/v3/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 7,
    bounds: bounds,
    noWrap: !0,
    tms: !1
}).addTo(map);


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

var islandsLayer = new L.LayerGroup();
layerArray.push(['islands', chickensLayer]);
map.addLayer(islandsLayer);

var chickensLayer = new L.LayerGroup();
layerArray.push(['chickens', chickensLayer]);

var snakesLayer = new L.LayerGroup();
layerArray.push(['snakes', snakesLayer]);

var pigsLayer = new L.LayerGroup();
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
    });

    addPlaceToList(islandName, classes, i);
	
    var textLoc = modifyLoc(islands[i].loc, (cRad + (cRad * 0.1)), (0));
	var islandMarker = new L.Marker(textLoc, {
		icon: new L.DivIcon({
			className: 'title-location',
            iconAnchor:   [0, 0],
            iconSize: null,
			html: '<span class="my-div-span" data-anchor-x="0">'+islands[i].title+'</span>'
		})
    }).addTo(islandsLayer);
    /*
	islandMarker.bindPopup('<div class="lf-popup">'+
							'<img src="/images/screenshots/small/'+((typeof islands[i].img != 'undefined')?islands[i].img :'bientot.jpg')+'" />'+
							'<span class="popup-title-island">'+islands[i].title+'</span>'+
							'<span class="popup-type-island">'+islands[i].type+'</span>'+
							'<span class="popup-img-island hiddenDiv">'+((typeof islands[i].img != 'undefined')?islands[i].img :'bientot.jpg')+'</span>'+
							'<span class="popup-hasChickens-island hiddenDiv">'+((islands[i].hasOwnProperty('chickens'))?"O":"N")+'</span>'+
							'<span class="popup-hasPigs-island hiddenDiv">'+((islands[i].hasOwnProperty('pigs'))?"O":"N")+'</span>'+
							'<span class="popup-hasSnakes-island hiddenDiv">'+((islands[i].hasOwnProperty('snakes'))?"O":"N")+'</span>'+
						'</div>', {minWidth: 322});
						
	islandMarker.on('mouseover', function (e) {
		this.openPopup();
	});
	islandMarker.on('mouseout', function (e) {
		this.closePopup();
	});
	islandMarker.on('click', function (e) {
		map.setView(this.getLatLng(), 6);
		
		var modal = document.getElementById('islandModal');
		var img = document.getElementById('islandModalImg');
		var titre = document.getElementById('islandModalTitre');
		var type = document.getElementById('islandModalType');
		var span = document.getElementsByClassName("closeModal")[0];
		
		modal.style.display = "block";
		
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
            modal.style.display = "none";
        }
		
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		img.src = "/images/screenshots/medium/" + document.getElementsByClassName("popup-img-island")[0].innerHTML;
		titre.innerHTML = document.getElementsByClassName("popup-title-island")[0].innerHTML;
		type.innerHTML = document.getElementsByClassName("popup-type-island")[0].innerHTML;
		
		$('#islandModalAnimals').html("");
		if(document.getElementsByClassName("popup-hasChickens-island")[0].innerHTML == "O"){
			$('#islandModalAnimals').append('<div class="animal-box"><img src="/images/animal-info-box/chicken-icon-small.png" /></div>');
		}
		if(document.getElementsByClassName("popup-hasPigs-island")[0].innerHTML == "O"){
			$('#islandModalAnimals').append('<div class="animal-box"><img src="/images/animal-info-box/pig-icon-white.png" height="20" /></div>');
		}
		if(document.getElementsByClassName("popup-hasSnakes-island")[0].innerHTML == "O"){
			$('#islandModalAnimals').append('<div class="animal-box"><img src="/images/animal-info-box/snake-icon-white-small.png" /></div>');
		}
		
		this.closePopup();
    });
    */

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
            title: 'chicken'
            //opacity: 0
        } 
        ).addTo(chickensLayer);
        marker.setIcon(chicken_marker);

    }

    if (islands[i].snakes) {

        var snakeLoc = modifyLoc(islands[i].loc, cRad * 0.5, (cRad * 0.6) * -1);

        var marker = L.marker(snakeLoc, { 
            icon: snake_marker,
            title: 'snake' 
            //opacity: 0 
        } 
        ).addTo(snakesLayer);

        
    }

    if (islands[i].pigs) {

        var pigLoc = modifyLoc(islands[i].loc, (cRad * 0.5) * -1, (cRad * 0.6) * -1);

        var marker = L.marker(pigLoc, { 
            icon: pig_marker,
            title: 'pigs'  
            //opacity: 0
        } 
        ).addTo(pigsLayer);

        
    }
}


var lastZoomApplied = null;
map.on('zoomend', function() {
    if (map.getZoom() <3){
        map.removeLayer(islandsLayer);
    }
    else {
		map.addLayer(islandsLayer);
	}
	var tooltip = $('.title-location');
	switch (map.getZoom()) {
		case 5:
            tooltip.css('font-size', 24);
			if(lastZoomApplied != map.getZoom()){
				//adjustIslandsAnchorPointOnZoom(0.18);
			}
			lastZoomApplied = map.getZoom();
            break;
        case 6:
            tooltip.css('font-size', 33);
			if(lastZoomApplied != map.getZoom()){
				//adjustIslandsAnchorPointOnZoom(0.41);
			}
			lastZoomApplied = map.getZoom();
            break;
        case 7:
            tooltip.css('font-size', 63);
			if(lastZoomApplied != map.getZoom()){
				//adjustIslandsAnchorPointOnZoom(1.73);
			}
			lastZoomApplied = map.getZoom();
            break;
        default:
            tooltip.css('font-size', 14);
			if(lastZoomApplied != map.getZoom()){
				//adjustIslandsAnchorPointOnZoom(0);
			}
			lastZoomApplied = 4;
    }
});

//add beacons
var beaconsLayer = new L.LayerGroup();
layerArray.push(['beacons', beaconsLayer]);


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
    var title = beacons[t].title + " Beacon"
    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: beacon_icon,
        title: title
        //opacity: 0
    } 
    ).addTo(beaconsLayer);
    //.bindPopup(beacons[t].desc);

    var classes = "beaconClass " + window.websafe(title);
    addPlaceToList(title, classes, t);
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
        name: cargoruns[t].title
        //opacity: 0
    } 
    ).addTo(cargorunsLayer)
    .bindPopup(cargoruns[t].title);

    cargo_run_markers[t] = marker;

    var classes = "cargoClass " + window.websafe(cargoruns[t].title);
    addPlaceToList(cargoruns[t].title, classes, t);
}

//add thrones
var thronesLayer = new L.LayerGroup();
layerArray.push(['thrones', thronesLayer]);


var throne_L_icon = L.icon({
    iconUrl: '/images/markers/throne_marker_l.png',
    shadowUrl: '/images/markers/throne_marker_l.png',
    iconSize:     [31, 40],// size of the icon
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var throne_S_icon = L.icon({
    iconUrl: '/images/markers/throne_marker_s.png',
    shadowUrl: '/images/markers/throne_marker_s.png',
    iconSize:     [31, 40],// size of the icon
    iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

for(var t in thrones) {
    var loc = thrones[t].loc;
    var size = thrones[t].isLarge ? " Large" : " Small";
    var title = thrones[t].title + size + " Skelton Throne";
    var mkr = thrones[t].isLarge ? throne_L_icon : throne_S_icon;

    var marker = L.marker(loc, {  
        icon: mkr,
        title: title
    } 
    ).addTo(thronesLayer)
    .bindPopup(thrones[t].desc);

console.log(t+ " | " + title + " | " + thrones[t].desc);

    var classes = "throneClass " + window.websafe(title);
    addPlaceToList(title, classes, t);
}





var searchLayers = L.layerGroup([
    //cargorunsLayer,
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
    //position:'topright',	
    container: 'findbox',
    layer: searchLayers,
    //sourceData: localData,
    propertyName: 'name', //title
    initial: false,
    collapsed: false,
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

var toggleLayer = function(theType, onoff) {
    var theLayer = getLayer(theType);
    //console.log(theType);

	if (onoff) {
		map.addLayer(theLayer);
    }
    else {
		map.removeLayer(theLayer);
	}
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

function adjustIslandsAnchorPointOnZoom(anchorXmodifier){
	islandsLayer.getLayers().forEach(function(marker){
		var icon = marker.options.icon
		var iconAnchor = icon.options.iconAnchor;
		
		var oriAnchorX = $(icon.options.html).data("anchor-x");
		var anchorX = oriAnchorX + (oriAnchorX * anchorXmodifier);
		icon.options.iconAnchor = [anchorX, iconAnchor[1]];
		marker.setIcon(icon);
	});
}



function addPlaceToList(islandName, classes, idx) {
    $(".list_of_islands").append("<li class='js-placelist " + classes + "' data-name=\"" + islandName + "\" data-idx='" + idx + "'>" + islandName + "</li>");
}


function applySearchFilter() {
    var searchFor = $(".js-filter-search").val().toLowerCase();
    if (searchFor.length > 0) {
        $(".list_of_places").addClass("searching");
        $(".search-cancel").addClass("searching");
        var resultCount = 0;
        console.log(searchFor);
        $(".js-placelist").each(function(idx, thing) {
            var fName = $(thing).data("name").toLowerCase();
            //console.log(fName.indexOf(searchFor));
            console.log($(thing).data("name"));
            if (fName.indexOf(searchFor) > -1) {
                $(thing).addClass("found");
                $(thing).attr("tabindex", 0);
                /* if (resultCount == 0) {
                    $(thing).addClass("highlight");
                } */
                resultCount++;
            } else {
                //hide it
                $(thing).removeClass("found highlight");
                $(thing).removeAttr("tabindex");
            }
        });
    } else {
        $(".list_of_places").removeClass("searching");
        $(".search-cancel").removeClass("searching");
    }
}


var popUpInt = 0;
$(function() {


    $(".js-filter-search").on('input propertychange paste', function() {
        applySearchFilter();        
    });
    $(".js-filter-search").keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $(this).click();
            $(".js-placelist.found").first().click();
        } 
    }).keydown(function(e){  
        if(e.which === 40) {
            $(".js-placelist").nextAll(".found:first").focus();
        }
    });

    $(".js-clear-search").on("click", function() {
        $(".js-filter-search").val("");
        applySearchFilter();
    })

    $(".js-placelist").on('click', function() {
        var radius, LatLong;
        var classes = $(this).attr('class');
        if (classes.indexOf("islandClass") > -1) {
            radius = 7;
            if (parseInt(islands[$(this).data("idx")].radius) > 2) {
                radius = 6;
            }
            LatLong = islands[$(this).data("idx")].loc;
        } else if (classes.indexOf("beaconClass") > -1) {
            radius = 6;
            LatLong = beacons[$(this).data("idx")].loc;
        } else if (classes.indexOf("throneClass") > -1) {
            radius = 6;
            LatLong = thrones[$(this).data("idx")].loc;
        } else if (classes.indexOf("cargoClass") > -1) {
            radius = 6;
            LatLong = cargoruns[$(this).data("idx")].loc;
        }
        /* map.flyTo(LatLong, radius, {
            animate: true,
            duration: 2 // in seconds
        }); */
        map.setView(LatLong, radius);
    });
    $(".js-placelist").keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $(this).click();
        } 
    });
    $(".js-placelist").keydown(function(e){
        //console.log(e.which);   
        if(e.which === 40) {
            //console.log("direction")
            $(this).nextAll(".found:first").focus();
        } else if (e.which === 38) {
            $(this).prevAll(".found:first").focus();
        }
    });
    $(".js-placelist").on('focus', function() {
        console.log("FOC'D");
        $(".highlight").removeClass("highlight");
        $(this).addClass("highlight");
    });




    

    $(".js-searchforisland").click(function() {
        
        var theIsland = getNextIsland($(this).data("dir"));

        var LatLong = theIsland.loc;
        map.setView(LatLong, 7);
        //map.panTo(LatLong, 7);
        adjustAlphaNum();

        showPopup("Island " + (currentSearchIsland + 1) + " of " + islands.length);
        clearTimeout(popUpInt);
        popUpInt = setTimeout(hidePopup, 3000);
    });


    $(".js-toggleMarkers").click(function() {
        toggleLayer($(this).attr("name"), $(this).is(":checked"));
		
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



