dojo.require('esri.dijit.BasemapGallery');

dojo.provide('gmaps.layers.GoogleMapsLayer');
dojo.declare("gmaps.layers.GoogleMapsLayer", esri.layers.Layer, {
    constructor: function(a) {
//		console.log('10 constructor', a);

        a = a || {};
        // 초기 화면
        this.initialExtent = new esri.geometry.Extent({
        	xmax:107.71909522576455,
			xmin:107.50743674798134,
			ymax:-6.8373708455754665,
			ymin:-6.979163142938748,
            spatialReference: {
                wkid: 4326
            }
        });
        this.fullExtent = this.initialExtent;
        
        // 타일맵 정의
        // http://www.voidcn.com/blog/jixg1800/article/p-1247106.html
		this.tileInfo = new esri.layers.TileInfo(
        		{
        		    "dpi": "90.71428571427429",
        		    "format": "PNG",
        		    "compressionQuality": 0,
        		    "spatialReference": {
        		        "wkid": "4326"
        		    },
        		    "rows": 256,
        		    "cols": 256,
        		    "origin": {
        		        "x": -180,
        		        "y": 90
        		    },
        		    "lods": [
						{level:0, resolution: 1.40625, scale: 590995197.1416691},
						{level:1, resolution: 0.703125, scale: 295497598.5708346},
						{level:2, resolution: 0.3515625, scale: 147748799.2854173},
						{level:3, resolution: 0.17578125, scale: 73874399.64270864},
						{level:4, resolution: 0.087890625, scale: 36937199.82135432},
						{level:5, resolution: 0.0439453125, scale: 18468599.91067716},
						{level:6, resolution: 0.02197265625, scale: 9234299.95533858},
						{level:7, resolution: 0.010986328125, scale: 4617149.97766929},
						{level:8, resolution: 0.0054931640625, scale: 2308574.98883465},
						{level:9, resolution: 0.00274658203124999, scale: 1154287.49441732},
						{level:10, resolution: 0.001373291015625, scale: 577143.747208662},
						{level:11, resolution: 0.0006866455078125, scale: 288571.873604331},
						{level:12, resolution: 0.000343322753906249, scale: 144285.936802165},
						{level:13, resolution: 0.000171661376953125, scale: 72142.9684010827},
						{level:14, resolution: 0.0000858306884765626, scale: 36071.4842005414},
						{level:15, resolution: 0.0000429153442382813, scale: 18035.7421002707},
						{level:16, resolution: 0.0000214576721191406, scale: 9017.87105013534}
        		    ]
        		}
		);
        this.opacity = a.opacity || 1;
        this._options = a;
        this._gmap = null;
        this.loaded = true
    },
    _setMap: function(a, b) {
//		console.log('120 _setMap', a, b);

        this._map = a;
        var c = document.createElement("div");
        if (this._options.id) c.id = this.id;
        dojo.style(c, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: (a.width || b.offsetWidth) + "px",
            height: (a.height || b.offsetHeight) + "px"
        });
        b.appendChild(c);
        this._div = c;
        this._visibilityChangeHandle = dojo.connect(this, "onVisibilityChange", this, this._visibilityChangeHandler);
        this._opacityChangeHandle = dojo.connect(this, "onOpacityChange", this, this._onOpacityChangeHandler);
        (this._options.visible === undefined ? true : this._options.visible) && this._initGMap();
        return c
    },
    _initGMap: function() {
//		console.log('152 _initGMap' );

        if (window.google && google.maps) {
            var a = this._esriExtentToLatLngBounds(this._map.extent ||
                    this.initialExtent),
                b = this._map.getLevel(),
                c = {
                    mapTypeId: this._options.mapTypeId || google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true,
                    draggable: false,
                    center: this._options.center || a.getCenter(),
                    zoom: this._options.zoom || b > -1 ? b : 1
                };
            c = new google.maps.Map(this._div, c);
            b < 0 && c.fitBounds(a);
			
            this._gmap = c;
            this._extentChangeHandle = dojo.connect(this._map, "onExtentChange", this, this._extentChangeHandler);
            this._panHandle = dojo.connect(this._map, "onPan", this, this._panHandler);
            this._resizeHandle = dojo.connect(this._map,
                "onResize", this, this._resizeHandler);
            this.onLoad(this)
            
            this._setExtent( this.initialExtent );
            
        } else if (gmaps.onApiLoad){
			dojo.connect(gmaps, "onApiLoad", this, this._initGMap);
		}else {
            gmaps.onApiLoad = function() {};
            dojo.connect(gmaps, "onApiLoad", this, this._initGMap);
            
            a = document.createElement("script");
            a.type = "text/javascript";
            b = window.location.protocol + "//maps.google.com/maps/api/js?key=AIzaSyD8nfeOtilBjtTer2yl8F57iXXWlxZcpLY&sensor=" + (this._options.sensor ? "true" : "false");
            if (this._options.client) b += "&client=" + this._options.client;
            if (this._options.version) b += "&v" + this._options.version;
            b += "&callback=gmaps.onApiLoad";
            a.src = b;
            document.getElementsByTagName("head").length > 0 ? document.getElementsByTagName("head")[0].appendChild(a) : document.body.appendChild(a);
            
        }
    },
    getGoogleMapInstance: function() {
        return this._gmap;
    },
    _esriExtentToLatLngBounds: function(a) {
//		console.log('256 _esriExtentToLatLngBounds');

        a = esri.geometry.webMercatorToGeographic(a);
//        console.log( 175, a );
        return new google.maps.LatLngBounds(new google.maps.LatLng(a.ymin, a.xmin, true), new google.maps.LatLng(a.ymax, a.xmax, true))
    },




    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // 지도 이동, 줌인아웃 이벤트 발생시 이벤트 핸들러
    _extentChangeHandler: function(a, b, c) {
//		console.log(158, ' _extentChangeHandler', a );
        
        c ? this._setExtent(a) : this._gmap.setCenter(this._esriPointToLatLng(a.getCenter()));
    },
    _panHandler: function(a) {
//		console.log('236 _panHandler');
        this._gmap.setCenter(this._esriPointToLatLng(a.getCenter()))
    },
    _opacityChangeHandler: function(a) {
//		console.log('188 _opacityChangeHandler');

        if (this._div) {
            a = Math.min(Math.max(a, 0), 1);
            var b = this._div.style;
            if (typeof b.opacity !== "undefined") b.opacity = a;
            else if (typeof b.filters !== "undefined") b.filters.alpha.opacity = Math.floor(100 * a);
            else if (typeof b.filter !== "undefined") b.filter = "alpha(opacity:" + Math.floor(a * 100) + ")"
        }
    },
    _visibilityChangeHandler: function(a) {
//		console.log('199 _visibilityChangeHandler');

        if (a) {
            esri.show(this._div);
            if (this._gmap) {
                google.maps.event.trigger(this._gmap, "resize");
                this._setExtent(this._map.extent);
                this._panHandle = this._panHandle || dojo.connect(this._map, "onPan", this, "_panHandler");
                this._extentChangeHandle = this._extentChangeHandle || dojo.connect(this._map, "onExtentChange", this, "_extentChangeHandler")
            } else this._initGMap()
        } else if (this._div) {
            esri.hide(this._div);
            if (this._panHandle) {
                dojo.disconnect(this._panHandle);
                this._panHandle = null
            }
            if (this._extentChangeHandle) {
                dojo.disconnect(this._extentChangeHandle);
                this._extentChangeHandle = null
            }
        }
    },
    _resizeHandler: function() {
//		console.log('222 _resizeHandler');

        dojo.style(this._div, {
            width: this._map.width + "px",
            height: this._map.height + "px"
        });
        google.maps.event.trigger(this._gmap, "resize")
    },
    _setExtent: function(a) {
//		console.log('241 _setExtent', a);

        var b = this._map.getLevel();
        if (b >= 0) {
            this._gmap.setCenter(this._esriPointToLatLng(a.getCenter()));
            this._gmap.setZoom(b)
        } else this._gmap.fitBounds(this._esriExtentToLatLngBounds(a))
    },
    _esriPointToLatLng: function(a) {
//		console.log('250 _esriPointToLatLng', a);

//        a = esri.geometry.webMercatorToGeographic(a);
//		console.log('250 _esriPointToLatLng', a);
		
        return new google.maps.LatLng(a.y, a.x)
    },














    setMapTypeId: function(a) {
//		console.log('108 setMapTypeId', a);

        if (this._gmap) this._gmap.setMapTypeId(a);
        else this._options.mapTypeId = a;
    },
    getGMap: function() {
//		console.log('115 getGMap');

        return this._gmap
    },








    _unsetMap: function(a, b) {
//		console.log('140 _unsetMap');

        b && b.removeChild(this._div);
        dojo.destroy(this._div);
        this._gmap = this._div = this._map = null;
        dojo.disconnect(this._extentChangeHandle);
        dojo.disconnect(this._panHandle);
        dojo.disconnect(this._resizeHandle);
        dojo.disconnect(this._visibilityChangeHandle);
        dojo.disconnect(this._opacityChangeHandle)
    }
});