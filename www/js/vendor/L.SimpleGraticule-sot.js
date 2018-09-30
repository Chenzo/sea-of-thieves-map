/**
 *  File: L.SimpleGraticule.js
 *  Desc: A graticule for Leaflet maps in the L.CRS.Simple coordinate system.
 *  Auth: Andrew Blakey (ablakey@gmail.com)
 */



TopCount = 1;

L.SimpleGraticule = L.LayerGroup.extend({
    options: {
        interval: 20,
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
                this.options.interval)
        };
    },

    getMins: function() {
        //rounds up to nearest multiple of x
        var s = this.options.interval;
        return {
            x: Math.floor(this._bounds.getWest() / s) * s,
            y: Math.floor(this._bounds.getSouth() / s) * s
        };
    },

    constructLines: function(mins, counts) {
        var lines = new Array(counts.x + counts.y);
        var labels = new Array(counts.x + counts.y);

        this.currentLetterCount = 1;
        TopCount = 1;
        //for horizontal lines
        for (var i = 0; i <= counts.x; i++) {
            var x = mins.x + i * this.options.interval;
            lines[i] = this.buildXLine(x);
            labels[i] = this.buildLabel('gridlabel-horiz', x);
        }

        //for vertical lines
        for (var j = 0; j <= counts.y; j++) {
            var y = mins.y + j * this.options.interval;
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
            val = val + 4;
            latLng = new L.LatLng(bounds.getNorth(), val);
        } else {
            niceLabel = getNumber(newVal);
            latLng = new L.LatLng(val, bounds.getWest());
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
    } else {

        return "";
    }
}



var numbers = [];
numbers[-6] = "1";
numbers[-12] = "2";
numbers[-18] = "3";
numbers[-24] = "4";
numbers[-30] = "5";
numbers[-36] = "6";
numbers[-41] = "7";
numbers[-47] = "8";
numbers[-53] = "9";
numbers[-59] = "10";
numbers[-65] = "11";
numbers[-71] = "12";
numbers[-77] = "13";
numbers[-82] = "14";
numbers[-88] = "15";
numbers[-94] = "16";
numbers[-100] = "17";
numbers[-106] = "18";
numbers[-112] = "19";
numbers[-117] = "20";
numbers[-123] = "21";
numbers[-129] = "22";
numbers[-135] = "23";
numbers[-141] = "24";
numbers[-147] = "25";
numbers[-153] = "26";
function getNumber(val) {

    if (numbers[val]) {
        return numbers[val];
    }
    return ""; //val;
}