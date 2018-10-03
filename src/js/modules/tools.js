

window.updateQueryStringParam = function (key, value) {

    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if( typeof value == 'undefined' || value == null || value == '' ) { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace( /[&;]$/, "" );

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params == '?' ? '' : params;

    hash = window.location.hash;

    window.history.replaceState({}, "", baseUrl + params + hash);
}


window.websafe = function(string) {
        var clean = string.match(/[a-zA-Z0-9]+/g);
        var cleanString = clean.join('-');
        var cleanString = cleanString.toLowerCase();  
        return cleanString;
}


window.angle = function(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    return theta;
}
window.angle360 = function(cx, cy, ex, ey) {
    var theta = angle(cx, cy, ex, ey); // range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}


window.getCardinalFromDeg = function(deg) {
    var words = "North";
    if (deg >= 0 && 11.25 > deg) {
        words = "North";
    } else if (deg >= 11.25 && 33.75 > deg) {
        words = "North by North East";
    } else if (deg >= 33.75 && 56.25 > deg) {
        words = "North East";
    } else if (deg >= 56.25 && 78.75 > deg) {
        words = "East by North East";
    } else if (deg >= 78.75 && 101.25 > deg) {
        words = "East";
    } else if (deg >= 101.25 && 123.75 > deg) {
        words = "East by South East";
    } else if (deg >= 123.75 && 146.25 > deg) {
        words = "South East";
    } else if (deg >= 146.25 && 168.75 > deg) {
        words = "South by South East";
    } else if (deg >= 168.75 && 191.25 > deg) {
        words = "South";
    } else if (deg >= 191.25 && 213.75 > deg) {
        words = "South by South West";
    } else if (deg >= 213.75 && 236.25 > deg) {
        words = "South West";
    } else if (deg >= 236.25 && 258.75 > deg) {
        words = "West by South West";
    } else if (deg >= 258.75 && 281.25 > deg) {
        words = "West";
    } else if (deg >= 281.25 && 303.75 > deg) {
        words = "West by North West";
    } else if (deg >= 303.75 && 326.25 > deg) {
        words = "North West";
    } else if (deg >= 326.25 && 348.75 > deg) {
        words = "North by North West";
    } 

    return words;
}



