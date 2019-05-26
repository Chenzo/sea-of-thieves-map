
var place_list = [];

function addPlaceToList(type, name, classes, markerObj) {
    var tPlace = {
        "type" : type,
        "name" : name,
        "classes" : classes,
        "markerObj" : markerObj
    };

    place_list.push(tPlace);
}


function buildPlaceList() {
    place_list.forEach(function(place, idx) {
        $(".list_of_islands").append("<li class='js-placelist " + place.classes + "' data-name=\"" + place.name + "\" data-idx='" + idx + "' data-type=\"" + place.type + "\">" + place.name + "</li>");
    });
}

function getMarkerOBJbyIDX(idx) {
    
    var toggleMarker = false;
    if (place_list[idx].type == "beacon" || place_list[idx].type == "throne" || place_list[idx].type == "cargorun" || place_list[idx].type == "talltale") {
        console.log("should toggle")
        toggleMarker = true;
    }

    console.log("type: " + place_list[idx].type);

    var radius = 7;
    if (parseInt(place_list[idx].markerObj.radius) > 2) {
        radius = 6;
    }

    var sData = {
        "radius" : radius,
        "LatLong" : place_list[idx].markerObj.loc,
        "name" : place_list[idx].name,
        "toggleMarker" : toggleMarker
    };

    return sData;
}




function applySearchFilter() {
    var searchFor = $(".js-filter-search").val().toLowerCase();
    if (searchFor.length > 0) {
        $(".list_of_places").addClass("searching");
        $(".search-cancel").addClass("searching");
        var resultCount = 0;
        //console.log(searchFor);
        $(".js-placelist").each(function(idx, thing) {
            var fName = $(thing).data("name").toLowerCase();
            //console.log($(thing).data("name"));
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





function toggleListFilter(type, onoff) {
    if (onoff) {
        $(".js-placelist[data-type='" + type + "']").removeClass("filteredOut");
    } else {
        $(".js-placelist[data-type='" + type + "']").addClass("filteredOut");
    }
    
}





export {
    place_list,
    addPlaceToList,
    buildPlaceList,
    applySearchFilter,
    getMarkerOBJbyIDX,
    toggleListFilter
};
