/**
 *  File: L.SimpleGraticule.js
 *  Desc: A graticule for Leaflet maps in the L.CRS.Simple coordinate system.
 *  Auth: Andrew Blakey (ablakey@gmail.com)
 */



TopCount = 1;

L.SimpleGraticule = L.LayerGroup.extend({
    options: {
        interval: 20,
        vinterval: 20,
        showOriginLabel: true,
        redraw: 'move',
        hidden: false,
        zoomIntervals : []
    },

    lineStyle: {
        stroke: true,
        color: '#111',
        opacity: 0,
        weight: 1,
        interactive: false,
        clickable: false //legacy support
    },
    currentLetterCount: 1,
    currentNumberCount: 1,

    initialize: function(options) {
        L.LayerGroup.prototype.initialize.call(this);
        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        this._map = map;

        var graticule = this.redraw();
        this._map.on('viewreset ' + this.options.redraw, graticule.redraw, graticule);

        this.eachLayer(map.addLayer, map);
    },

    onRemove: function(map) {
        map.off('viewreset '+ this.options.redraw, this.map);
        this.eachLayer(this.removeLayer, this);
    },

    hide: function() {
        this.options.hidden = true;
        this.redraw();
    },

    show: function() {
        this.options.hidden = false;
        this.redraw();
    },

    redraw: function() {
        this._bounds = this._map.getBounds().pad(0.5);

        this.clearLayers();

        if (!this.options.hidden) {

            var currentZoom = this._map.getZoom();

            for(var i = 0 ; i < this.options.zoomIntervals.length ; i++) {
                if(currentZoom >= this.options.zoomIntervals[i].start && currentZoom <= this.options.zoomIntervals[i].end){
                    this.options.interval = this.options.zoomIntervals[i].interval;
                    break;
                }
            }

            this.constructLines(this.getMins(), this.getLineCounts());

            if (this.options.showOriginLabel) {
                this.addLayer(this.addOriginLabel());
            }
        }

        return this;
    },

    getLineCounts: function() {
        return {
            x: Math.ceil((this._bounds.getEast() - this._bounds.getWest()) /
                this.options.interval),
            y: Math.ceil((this._bounds.getNorth() - this._bounds.getSouth()) /
                this.options.vinterval)
        };
    },

    getMins: function() {
        //rounds up to nearest multiple of x
        var s = this.options.interval;
        var v = this.options.vinterval;
        return {
            x: Math.floor(this._bounds.getWest() / s) * s,
            y: (Math.floor(this._bounds.getSouth() / v) * v)
        };
    },

    constructLines: function(mins, counts) {
        var lines = new Array(counts.x + counts.y);
        var labels = new Array(counts.x + counts.y);

        this.currentLetterCount = 1;
        //for horizontal lines
        for (var i = 0; i <= counts.x; i++) {
            var x = mins.x + i * this.options.interval;
            lines[i] = this.buildXLine(x);
            labels[i] = this.buildLabel('gridlabel-horiz', x);
        }

        //for vertical lines
        for (var j = 0; j <= counts.y; j++) {
            var y = mins.y + j * this.options.vinterval;
            lines[j + i] = this.buildYLine(y);
            labels[j + i] = this.buildLabel('gridlabel-vert', y);
        }

        lines.forEach(this.addLayer, this);
        labels.forEach(this.addLayer, this);
    },

    buildXLine: function(x) {
        var bottomLL = new L.LatLng(this._bounds.getSouth(), x);
        var topLL = new L.LatLng(this._bounds.getNorth(), x);

        return new L.Polyline([bottomLL, topLL], this.lineStyle);
    },

    buildYLine: function(y) {
        var leftLL = new L.LatLng(y, this._bounds.getWest());
        var rightLL = new L.LatLng(y, this._bounds.getEast());

        return new L.Polyline([leftLL, rightLL], this.lineStyle);
    },

    buildLabel: function(axis, val) {
        var bounds = this._map.getBounds().pad(-0.003);
        var latLng;
        var newVal = Math.floor(val);
        
        if (axis == 'gridlabel-horiz') {
            var niceLabel = getLetter(newVal);
            val = val + 4; //move to middle of square
            var sX = (bounds.getNorth() > 0) ? 0 : bounds.getNorth(); //prevent letters from dragging off map - Vince
            latLng = new L.LatLng(sX, val);
        } else {
            niceLabel = getNumber(newVal);
            val = val - 3.2; //move to middle of square
            var sY = (bounds.getWest() < 0) ? 0 : bounds.getWest(); //prevent numbers from dragging off map - Vince
            latLng = new L.LatLng(val, sY); 
        }

        return L.marker(latLng, {
            interactive: false,
            clickable: false, //legacy support
            icon: L.divIcon({
                iconSize: [0, 0],
                className: 'leaflet-grid-label',
                html: '<div class="' + axis + '">' + niceLabel + '</div>'
            })
        });
    },

    addOriginLabel: function() {
        return L.marker([0, 0], {
            interactive: false,
            clickable: false, //legacy support
            icon: L.divIcon({
                iconSize: [0, 0],
                className: 'leaflet-grid-label',
                html: '<div class="gridlabel-horiz">(0,0)</div>'
            })
        });
    }
});

L.simpleGraticule = function(options) {
    return new L.SimpleGraticule(options);
};



var letters = [];
letters[0] = "A";
letters[8] = "B";
letters[16] = "C";
letters[24] = "D";
letters[32] = "E";
letters[41] = "F";
letters[49] = "G";
letters[57] = "H";
letters[65] = "I";
letters[73] = "J";
letters[82] = "K";
letters[90] = "L";
letters[98] = "M";
letters[106] = "N";
letters[114] = "O";
letters[123] = "P";
letters[131] = "Q";
letters[139] = "R";
letters[147] = "S";
letters[155] = "T";
letters[164] = "U";
letters[172] = "V";
letters[180] = "W";
letters[188] = "X";
letters[196] = "Y";
letters[205] = "Z";
function getLetter(val) {
    if (letters[val]) {
        return letters[val];
    } else if (letters[val-1] ) {
        return letters[val-1];
    } else if (letters[val+1]) {
        return letters[val+1];
    } else {
        return "";
    } 
}



var numbers = [];
numbers[0] = "1";
numbers[-8] = "2";
numbers[-16] = "3";
numbers[-24] = "4";
numbers[-31] = "5";
numbers[-39] = "6";
numbers[-47] = "7";
numbers[-54] = "8";
numbers[-62] = "9";
numbers[-70] = "10";
numbers[-77] = "11";
numbers[-85] = "12";
numbers[-93] = "13";
numbers[-101] = "14";
numbers[-108] = "15";
numbers[-116] = "16";
numbers[-124] = "17";
numbers[-131] = "18";
numbers[-139] = "19";
numbers[-147] = "20";
numbers[-154] = "21";
numbers[-162] = "22";
numbers[-170] = "23";
numbers[-178] = "24";
numbers[-185] = "25";
numbers[-193] = "26";
function getNumber(val) {
    if (numbers[val]) {
        return numbers[val];
    } else if (numbers[val-1] ) {
        return numbers[val-1];
    } else if (numbers[val+1]) {
        return numbers[val+1];
    } else {
        return "";
    } 
}