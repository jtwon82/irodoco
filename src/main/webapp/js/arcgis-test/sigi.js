dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("esri.map");
dojo.require("esri.dijit.Popup");
dojo.require("dojo.number");
dojo.require("dijit.layout.TabContainer");
dojo.require("esri.dijit.Legend");
dojo.require("esri.utils");
dojo.require("esri.toolbars.navigation");
dojo.require("dijit.form.Button");
dojo.require("dijit.Toolbar");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.dijit.Measurement");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.toolbars.draw");
dojo.require("esri.layers.agsimageservice");
dojo.require("esri.arcgis.utils");
dojo.require("esri.virtualearth.VETiledLayer");
dojo.require("esri.tasks.geometry");
dojo.require("dojox.gfx");
dojo.require("esri.tasks.route");
dojo.require("dijit.Dialog");

dojo.require("dijit.form.DropDownButton");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.form.TextBox");

var layer_info = [];
var layer_info_adm = [];
var map, drawToolBar, symbol, geomTask;
var gsvc = null;
var pt = null;
var loading;
var layer;
var visible = [];
var resizeTimer;
var identifyTask, identifyParams;
var legend;
var legendAdm;
var initExtent;
var initFactor = 28489297.737236004;
var navToolbar;
var mapLoaded = false;
var isIdentify = false;
var selectionToolbar = null;
var featureLayer = null;
var featureLayer2 = null;
var featureLayer3 = null;
var centerPoint;
var isFeature = false;
var url = base_url;
var dataUrl = url + "sigi/netApps/";
var picUrl = base_url + "media/photo/";
var videoUrl = base_url + "media/video/";
var layerObject = MAP_SERVICE;
var landsatObject = "LANDSAT";
var layerLandsat = false;
var queryLayers = [];
var queryLayersAdm = [];
var bufferLayers = [];
var pointSymbol = null;
var selSymbol = null;
var basemap;
var basemap_ocean;
var activeBaseMap = null;
var lastBaseMap = null;
// var imageServiceParameters;
var overviewMapDijit;
var bingMapKey = "AsxtakN7WqZ-AjpgvhxvrHgENDh-spnL7HIh3SaLOzmDjN8J4AO-PeSU-j7Ssav0";
var searchOptions = "<option value=''></option>";
var selectedLayer = "";
var templateString = "";
var bufferHandler = null;
var gsvc = null;
var selected = "";
var popupInfoWindow = null;
var evtClick = null;
var evtPoint = null;
var drawToolBarBuffer = null;
var measurement = null;
var objIndex = 0;
var isInfoWindowShowing = false;
var x1 = 0;
var y1 = 0;
var x = 0;
var y = 0;
var offset;
var routeTask, routeParams;
var stopSymbol, routeSymbol, lastStop;
var routeHandler;

var drawingNode;
var drawingSurface;
var routeBar;
var services_administrasi = url + "arcgis/rest/services/"
		+ ADMINISTRASI_SERVICE + "/MapServer";

function init() {
	var lods = [ {
		"level" : 5,
		"resolution" : 4891.9698102499797,
		"scale" : 18489297.737236001
	}, {
		"level" : 6,
		"resolution" : 2445.9849051249898,
		"scale" : 9244648.8686180003
	}, {
		"level" : 7,
		"resolution" : 1222.9924525624949,
		"scale" : 4622324.4343090001
	}, {
		"level" : 8,
		"resolution" : 611.49622628137968,
		"scale" : 2311162.2171550002
	}, {
		"level" : 9,
		"resolution" : 305.74811314055756,
		"scale" : 1155581.108577
	}, {
		"level" : 10,
		"resolution" : 152.87405657041106,
		"scale" : 577790.55428899999
	}, {
		"level" : 11,
		"resolution" : 76.437028285073239,
		"scale" : 288895.27714399999
	}, {
		"level" : 12,
		"resolution" : 38.21851414253662,
		"scale" : 144447.638572
	}, {
		"level" : 13,
		"resolution" : 19.10925707126831,
		"scale" : 72223.819285999998
	}, {
		"level" : 14,
		"resolution" : 9.5546285356341549,
		"scale" : 36111.909642999999
	} ];

	esri.config.defaults.map.panDuration = 1000;
	esri.config.defaults.map.panRate = 50;

	esri.config.defaults.io.proxyUrl = url + "proxypage_net/proxy.ashx";
	esri.config.defaults.io.alwaysUseProxy = false;

	esri.config.defaults.geometryService = new esri.tasks.GeometryService(url
			+ "arcgis/rest/services/Utilities/Geometry/GeometryServer");

	loading = dojo.byId("loadingImg");

	popupInfoWindow = new esri.dijit.Popup({
		fillSymbol : new esri.symbol.SimpleFillSymbol(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID,
				new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_SOLID,
						new dojo.Color([ 255, 0, 0 ]), 2), new dojo.Color([
						255, 255, 0, 0.25 ]))
	}, dojo.create("div"));

	dojo.connect(popupInfoWindow, "onSelectionChange", function() {
		if ($('#photoGrid').dialog('isOpen')) {
			$('#photoGrid').html('');
			$('#photoGrid').dialog('close');
			$('#photoGrid').css('visibility', 'hidden');
		}
		if ($('#videoGrid').dialog('isOpen')) {
			$('#videoGrid').html('');
			$('#videoGrid').dialog('close');
			$('#videoGrid').css('visibility', 'hidden');
		}
		drawingSurface.clear();
		if (map.infoWindow.selectedIndex != -1) {
			selFeature = map.infoWindow
					.getSelectedFeature(map.infoWindow.selectedIndex);
			var mapPoint = findCenterPoint(selFeature);
			map.centerAt(mapPoint);
		}
	});
	dojo.connect(popupInfoWindow, "onHide", function() {
		drawingSurface.clear();
	});

	initExtent = new esri.geometry.Extent({
		"xmin" : XMIN,
		"ymin" : YMIN,
		"xmax" : XMAX,
		"ymax" : YMAX,
		"spatialReference" : {
			"wkid" : 102100
		}
	});

	map = new esri.Map("map", {
		nav : true,
		infoWindow : popupInfoWindow,
		extent : initExtent,
		lods : lods
	});

	/*
	 * basemap = new esri.virtualearth.VETiledLayer({ bingMapsKey: bingMapKey,
	 * mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD });
	 */

	basemap = select_basemap(BASEMAP_REF);

	map.addLayer(basemap, 0);

	layer = new esri.layers.ArcGISDynamicMapServiceLayer(url
			+ "arcgis/rest/services/" + layerObject + "/MapServer");
	layer.setImageFormat("png");

	if (layer.loaded) {
		buildLayerList(layer);
	} else {
		dojo.connect(layer, "onLoad", buildLayerList);
	}

	layerAdm = new esri.layers.ArcGISDynamicMapServiceLayer(
			services_administrasi);
	layerAdm.setImageFormat("png");

	if (layerAdm.loaded) {
		getInfoAdministrasi(layerAdm);
	} else {
		dojo.connect(layerAdm, "onLoad", getInfoAdministrasi);
	}

	navToolbar = new esri.toolbars.Navigation(map);

	dojo.connect(navToolbar, "onExtentHistoryChange",
			extentHistoryChangeHandler);

	if (url.indexOf("localhost") == -1) {
		var layerInfo = {
			layer : layer.layer,
			title : " "
		};
		legend = new esri.dijit.Legend({
			layerInfos : layerInfo,
			map : map,
			respectCurrentMapScale : true
		}, "legendDiv");
		legend.startup();

		var layerInfoAdm = {
			layer : layerAdm.layer,
			title : " "
		};
		legendAdm = new esri.dijit.Legend({
			layerInfos : layerInfoAdm,
			map : map,
			respectCurrentMapScale : true
		}, "legendAdmDiv");
		legendAdm.startup();
	}

	dojo.connect(map, "onUpdateStart", showLoading);
	dojo.connect(map, "onUpdateEnd", hideLoading);
	dojo.connect(map, "onLoad", mapReady);
	dojo.connect(map, "onExtentChange", extentChange);
	dojo.connect(map, "onZoomEnd", mapZoomEnd);
	dojo.connect(map, "onZoom", mapZoom);
	dojo.connect(map, "onZoomStart", mapZoomStart);
	dojo.connect(map, "onPanStart", mapPanStart);
	dojo.connect(map, "onPanEnd", mapPanEnd);

	gsvc = new esri.tasks.GeometryService(url
			+ "arcgis/rest/services/Utilities/Geometry/GeometryServer");
	map.setMapCursor('wait');
}

function extentChange(extent) {
	if (mapLoaded) {

		var s = "";
		s = "XMin: " + extent.xmin + " " + "YMin: " + extent.ymin + " "
				+ "XMax: " + extent.xmax + " " + "YMax: " + extent.ymax;
		drawingSurface.clear();
	}
}

function mapPanStart() {
	drawingSurface.clear();
}

function mapPanEnd() {
	if (mapLoaded) {
		drawingSurface.clear();
		if (map.infoWindow.isShowing) {
			if (map.infoWindow.selectedIndex != -1) {
				map.infoWindow.reposition();
			}
		}
	}
}

function mapZoom() {
	drawingSurface.clear();
}

function mapZoomStart() {
	drawingSurface.clear();
}

function mapZoomEnd() {
	if (mapLoaded) {
		drawingSurface.clear();
		if (map.infoWindow.isShowing) {
			if (map.infoWindow.selectedIndex != -1) {
				map.infoWindow.reposition();
			}
		}
	}
}

function showLoading() {
	esri.show(loading);
	if (mapLoaded) {
		if (map.infoWindow.isShowing) {
			isInfoWindowShowing = true;
			drawingSurface.clear();
		}
	}
}

function hideLoading(error) {
	esri.hide(loading);
	if (mapLoaded) {
		if (map.infoWindow.isShowing) {
			drawingSurface.clear();
			drawInfoPointer();
			isInfoWindowShowing = false;
		}
	}
}

function maintainInfoPointer() {
	if (map.infoWindow.selectedIndex != -1) {
		selFeature = map.infoWindow
				.getSelectedFeature(map.infoWindow.selectedIndex);
		var mapPoint = findCenterPoint(selFeature);
		var selPoint = map.toScreen(mapPoint);

		x = selPoint.x;
		y = selPoint.y;

		offset = $(".esriPopupWrapper").offset();
		x1 = offset.left + ($(".esriPopupWrapper").width() / 2);
		y1 = offset.top + ($(".esriPopupWrapper").height() / 2) - 20;
		x2 = x1;
		y2 = y1;
		if ($(".esriPopupWrapper").height() < 200) {
			y1 = offset.top + 20;
			y2 = y1;
			y1 = y1 - 10;
			y2 = y1 + 20;
			x1 = x1 - 10;
			x2 = x1 + 20;
		} else {
			if (Math.abs(x1 - x) <= 300) {
				y1 = y1 - 40;
				y2 = y1 + 80;
				x1 = x1 - 40;
				x2 = x1 + 80;
			} else if (Math.abs(x1 - x) <= 600) {
				y1 = y1 - 30;
				y2 = y1 + 60;
				x1 = x1 - 30;
				x2 = x1 + 60;
			} else {
				y1 = y1 - 20;
				y2 = y1 + 40;
				x1 = x1 - 20;
				x2 = x1 + 40;
			}
		}
		drawingSurface.clear();

		drawingSurface.createPath().moveTo(x, y).lineTo(x1, y1).lineTo(x2, y2)
				.closePath().setFill("#f7f7f7").setStroke({
					color : "#dddddd",
					width : 2
				});
	} else {
		drawingSurface.clear();
	}
}

function findCenterPoint(selFeature) {
	var selPoint;

	if (selFeature.geometry.type == 'point') {
		selPoint = selFeature.geometry;
	} else if (selFeature.geometry.type == 'multipoint') {
		var geom = '{"type":"multipoint",' + '"points":'
				+ JSON.stringify(selFeature.geometry.points) + ',' + '"x": '
				+ selFeature.geometry.points[0][0] + ',' + '"y": '
				+ selFeature.geometry.points[0][1] + ','
				+ '"spatialReference":'
				+ JSON.stringify(selFeature.geometry.spatialReference) + '}';
		selPoint = JSON.parse(geom);
	} else if (selFeature.geometry.type == 'line'
			|| selFeature.geometry.type == 'polyline') {
		var geom = selFeature.geometry;

		var idx = Math.floor(geom.paths.length / 2);
		var idx2 = Math.floor(geom.paths[idx].length / 2);
		var pt = geom.getPoint(idx, idx2);

		selPoint = pt;
	} else {
		var geom = selFeature.geometry;

		var sumX = 0;
		var sumY = 0;
		var countPoint = 0;
		var pt;
		for (i = 0; i < geom.rings.length; i++) {
			for (j = 0; j < geom.rings[i].length; j++) {
				pt = geom.getPoint(i, j);
				sumX += pt.x;
				sumY += pt.y;
				countPoint++;
			}
		}
		var X1;
		var Y1;
		var center;
		if (countPoint > 0) {
			X1 = sumX / countPoint;
			Y1 = sumY / countPoint;
			center = new esri.geometry.Point(X1, Y1, map.spatialReference);
		} else {
			var idx = Math.floor(geom.rings.length / 2);
			var idx2 = Math.floor(geom.rings[idx].length / 2);
			center = geom.getPoint(idx, idx2);
		}
		selPoint = center;
	}
	return selPoint;
}

function drawInfoPointer() {
	if (map.infoWindow.selectedIndex != -1) {
		selFeature = map.infoWindow
				.getSelectedFeature(map.infoWindow.selectedIndex);
		var mapPoint = findCenterPoint(selFeature);
		var selPoint = map.toScreen(mapPoint);

		offset = $(".esriPopupWrapper").offset();
		x1 = offset.left + ($(".esriPopupWrapper").width() / 2);
		y1 = offset.top + ($(".esriPopupWrapper").height() / 2) - 20;
		x = selPoint.x;
		y = selPoint.y;

		if ($(".esriPopupWrapper").height() < 200) {
			y1 = offset.top + 20;
			y2 = y1;
			y1 = y1 - 10;
			y2 = y1 + 20;
			x1 = x1 - 10;
			x2 = x1 + 20;
		} else {
			y1 = y1 - 40;
			y2 = y1 + 80;
			x1 = x1 - 40;
			x2 = x1 + 80;
		}

		drawingSurface.clear();

		drawingSurface.createPath().moveTo(x, y).lineTo(x1, y1).lineTo(x2, y2)
				.closePath().setFill("#f7f7f7").setStroke({
					color : "#dddddd",
					width : 2
				});
	}
}

function extentHistoryChangeHandler() {
	dijit.byId("zoomprev").disabled = navToolbar.isFirstExtent();
	dijit.byId("zoomnext").disabled = navToolbar.isLastExtent();
}

function showCoordinates(evt) {
	var pt = evt.mapPoint;

	var outSR = new esri.SpatialReference({
		wkid : 4326
	});
	var params = new esri.tasks.ProjectParameters();
	params.geometries = [ pt ];
	params.outSR = outSR;

	gsvc.project(params, function(projectedPoints) {
		pt = projectedPoints[0];

		dojo.byId("map_coordinates").innerHTML = "&nbsp;Latitude = "
				+ pt.x.toFixed(6) + ",&nbsp;Longitude = " + pt.y.toFixed(6);
	});
}
function mapReady(map) {
	dojo.connect(map, "onClick", executeIdentifyTask);
	dojo.connect(map, "onMouseUp", getCenterPoint);
	// dojo.connect(map, "onMouseMove", showCoordinates);
	dojo.connect(map, "onMouseDrag", showCoordinates);

	identifyTask = new esri.tasks.IdentifyTask(url + "arcgis/rest/services/"
			+ layerObject + "/MapServer");

	dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
	initToolbar(map);
	initDrawToolbar(map);

	navToolbar.activate(esri.toolbars.Navigation.PAN);
	selectionToolbar = new esri.toolbars.Draw(map);
	dijit.byId('pan').set('checked', true);

	$(document).ready(jQueryReady);
	map.setMapCursor('move');
	var scalebar = new esri.dijit.Scalebar({
		map : map,
		scalebarUnit : 'metric',
		attachTo : "top-right"
	});
	overviewMapDijit = new esri.dijit.OverviewMap({
		map : map,
		visible : true,
		attachTo : "bottom-right",
		expandFactor : 1,
		width : 300,
		color : "#D84E13",
		opacity : .40

	});
	overviewMapDijit.startup();

	drawingNode = dojo.byId("map_gc");
	drawingSurface = dojox.gfx.createSurface(drawingNode, $("#map_gc").width(),
			$("#map_gc").height());

	if (LAT != "" && LONG != "") {
		esri
				.request({
					url : url
							+ "arcgis/rest/services/Geometry/GeometryServer/project?inSR=4326&outSR=102113&geometries={'geometryType':'esriGeometryPoint','geometries':[{'x':"
							+ LONG + ",'y':" + LAT + "}]}",
					content : {
						f : "json"
					},
					callbackParamName : "callback",
					load : addXYRefToMap,
					error : esriConfig.defaults.io.errorHandler
				});
	}
}

function initDrawToolbar(mymap) {
	drawToolBar = new esri.toolbars.Draw(map);
	dojo.connect(drawToolBar, "onDrawEnd", addToMap);
}

function setSymbol(obj, sym) {
	if (selSymbol != null) {
		selSymbol.style.border = "0px solid";
	}
	obj.style.border = "1px solid #999999";
	selSymbol = obj;
	pointSymbol = new esri.symbol.PictureMarkerSymbol(sym, 27, 27);
}

function addToMap(geometry) {
	drawToolBar.deactivate();
	map.showZoomSlider();
	switch (geometry.type) {
	case "point":
		if (pointSymbol === null || pointSymbol === "") {
			var symbol = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10,
					new esri.symbol.SimpleLineSymbol(
							esri.symbol.SimpleLineSymbol.STYLE_SOLID,
							new dojo.Color([ 255, 0, 0 ]), 1), new dojo.Color([
							0, 255, 0, 0.25 ]));
		} else {
			var symbol = pointSymbol
		}
		break;
	case "polyline":
		var symbol = new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([ 255,
						0, 0 ]), 3);
		break;
	case "polygon":
		var symbol = new esri.symbol.SimpleFillSymbol(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID,
				new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_DASHDOT,
						new dojo.Color([ 255, 0, 0 ]), 2), new dojo.Color([
						255, 255, 0, 0.25 ]));
		break;
	case "multipoint":
		if (pointSymbol === null || pointSymbol === "") {
			var symbol = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10,
					new esri.symbol.SimpleLineSymbol(
							esri.symbol.SimpleLineSymbol.STYLE_SOLID,
							new dojo.Color([ 255, 0, 0 ]), 1), new dojo.Color([
							0, 255, 0, 0.25 ]));
		} else {
			var symbol = pointSymbol
		}
		break;
	}
	var graphic = new esri.Graphic(geometry, symbol);
	map.graphics.add(graphic);
}

function initToolbar(mymap) {
	measurement = new esri.dijit.Measurement({
		map : mymap,
		defaultAreaUnit : esri.Units.SQUARE_KILOMETERS,
		defaultLengthUnit : esri.Units.KILOMETERS
	}, dojo.byId('measurementDiv'));
	measurement.startup();
}

function zoomToLayer(sel) {
	esri.request({
		url : url + "arcgis/rest/services/" + layerObject + "/MapServer/"
				+ sel.id,
		content : {
			f : "json"
		},
		callbackParamName : "callback",
		load : layerHandler
	});

}

function zoomToDefaultExtent() {
	map.setExtent(initExtent);
}
function selectSubLayers(obj, subs) {
	var arrSubs = subs.split(",");
	var inputs = dojo.query(".list_item"), input;
	var inputs_parent = dojo.query(".list_item_parent"), input;
	dojo.forEach(inputs, function(input) {
		if (inArray(input.value, arrSubs)) {
			if (obj.checked) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		}
	});
	dojo.forEach(inputs_parent, function(input) {
		if (inArray(input.value, arrSubs)) {
			if (obj.checked) {
				input.checked = true;
				var evnt = input["onclick"];

				if (typeof (evnt) == "function") {
					evnt.call(input);
				}
			} else {
				input.checked = false;
			}
		}
	});

	updateLayerVisibility();
}
function selectSubLayersAdm(obj, subs) {
	var arrSubs = subs.split(",");
	var inputs = dojo.query(".list_item_adm"), input;

	dojo.forEach(inputs, function(input) {
		if (inArray(input.value, arrSubs)) {
			if (obj.checked) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		}
	});
	updateAdmVisibility();
}
function inArray(needle, haystack) {
	var length = haystack.length;
	for (var i = 0; i < length; i++) {
		if (haystack[i] == needle)
			return true;
	}
	return false;
}

function buildLayerList(layer) {

	visible = [];
	queryLayers = [];
	bufferLayers = [];
	parentLayer = "";
	var items = dojo
			.map(
					layer.layerInfos,
					function(info, index) {
						if (!array_key_exists(info.id, layer_info)) {
							layer_info[info.id] = info;
						}
						if (info.parentLayerId != "-1") {
							if (info.subLayerIds == null) {
								searchOptions += "<option value='" + info.id
										+ "'>&nbsp;&nbsp;&nbsp;" + info.name
										+ "</option>";
								return "<div style='display:table-row'><div style='display:table-row;'><div style='display:table-cell; padding-left: 10px'><input type='checkbox' class='list_item' id='layers_"
										+ info.id
										+ "' value='"
										+ info.id
										+ "' onclick='updateLayerVisibility(); check_scale(this.value)' /></div><div style='cursor:pointer;padding-left:5px; display: table-cell; width:20px;'><img src='"
										+ base_url
										+ "resources/images/nav_zoomin.png' id='"
										+ info.id
										+ "' height='16px' onclick='zoomToLayer(this);' /></div><div style='display:table-cell; padding-left: 5px'><label for='layers_"
										+ info.id
										+ "'>"
										+ info.name
										+ "</label></div></div></div>";
								return "<strong>" + info.name + "</strong>";
							} else {

								return "<div style='display:table-row'><div style='display:table-row;'><div style='display:table-cell; padding-left: 5px'><input type='checkbox' class='list_item_parent' id='layers_"
										+ info.id
										+ "' value='"
										+ info.id
										+ "' onclick='selectSubLayers(this,\""
										+ info.subLayerIds
										+ "\");' /></div><div style='cursor:pointer;padding-left:5px; display: table-cell;'>"
										+ info.name + "</div></div></div>";
							}
						} else {
							parentLayer = info.name;
							if (parentLayer != "Pusat Administrasi"
									&& parentLayer != "Batas Administrasi") {
								if (info.subLayerIds != null) {
									return "<div style='display: table-row'><div style='display:table-row; height: 18px'><input type='checkbox' class='list_item_parent' id='layers_"
											+ info.id
											+ "' value='"
											+ info.id
											+ "' onclick='selectSubLayers(this,\""
											+ info.subLayerIds
											+ "\");' style=' display:table-cell;' /><span style=' display:table-cell;font-weight:bold;line-height:18px;vertical-align:bottom;'>"
											+ info.name + "</span></div></div>";
								} else {
									searchOptions += "<option value='"
											+ info.id + "'>&nbsp;&nbsp;&nbsp;"
											+ info.name + "</option>";
									return "<div style='display:table-row'><div style='display:table-row;'><div style='display:table-cell; padding-left: 10px'><input type='checkbox' class='list_item' id='layers_"
											+ info.id
											+ "' value='"
											+ info.id
											+ "' onclick='updateLayerVisibility(); check_scale(this.value)' /></div><div style='cursor:pointer;padding-left:5px; display: table-cell; width:20px;'><img src='"
											+ base_url
											+ "resources/images/nav_zoomin.png' id='"
											+ info.id
											+ "' height='16px' onclick='zoomToLayer(this);' /></div><div style='display:table-cell; padding-left: 5px'><label for='layers_"
											+ info.id
											+ "'>"
											+ info.name
											+ "</label></div></div></div>";
									return "<strong>" + info.name + "</strong>";
								}

								/*
								 * if (parentLayer == 'Bidang Sumber Daya Air' ||
								 * parentLayer == 'Bidang Bina Marga' ||
								 * parentLayer == 'Bidang Cipta Karya') { return "<span
								 * style='font-weight:bold;line-height:25px;'><input
								 * type='checkbox' class='list_item_parent'
								 * onclick='selectSubLayers(this,\""+info.subLayerIds+"\");' /> " +
								 * info.name + "</span>"; } else { return "<span
								 * style='font-size:12px;font-weight:bold;'>" +
								 * info.name + "</span>"; }
								 */
							}
						}
						return "";
					});

	var layerList = "";
	for (i = 0; i < items.length; i++) {
		if (items[i] != "") {
			layerList += items[i] + "";
		}
	}

	dojo.byId("layer_list").innerHTML = layerList;
	visible.push(-1);
	queryLayers.push(-1);
	layer.setVisibleLayers(visible);

	map.addLayers([ layer ]);
	map.infoWindow.resize(500, 300);

	$('#searchCombo').html(searchOptions);
	$('#searchCombo').change(function() {
		selectedLayer = $(this).val();
		if (selectedLayer != "") {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == selectedLayer) {
					input.checked = true;
				}
			});
		} else {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == 2 || input.value == 3) {
					input.checked = true;
				}
			});
		}
		updateLayerVisibility();
		objIndex = 0;
		activateLayer();
	});
	$('#searchCombo2').html(searchOptions);
	$('#searchCombo2').change(function() {
		selectedLayer = $(this).val();
		if (selectedLayer != "") {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == selectedLayer) {
					input.checked = true;
				}
			});
		} else {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == 2 || input.value == 3) {
					input.checked = true;
				}
			});
		}
		updateLayerVisibility();
		objIndex = 0;
	});
}

function getInfoAdministrasi(layerAdm) {

	parentLayer = "";
	visible = [];
	queryLayersAdm = [];
	bufferLayers = [];
	var items_adm = dojo
			.map(
					layerAdm.layerInfos,
					function(info, index) {
						if (!array_key_exists(info.id, layer_info_adm)) {
							layer_info_adm[info.id] = info;
						}
						if (info.parentLayerId != "-1") {
							if (info.name == "Ibukota Negara"
									|| info.name == "Indonesia's Capital City") {
								queryLayersAdm.push(info.id);
								bufferLayers.push(info.id);
								visible.push(info.id);
								searchOptions += "<option value='" + info.id
										+ "'>&nbsp;&nbsp;&nbsp;" + info.name
										+ "</option>";
								return "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='list_item_adm' checked='checked' id='layers_"
										+ info.id
										+ "' value='"
										+ info.id
										+ "' onclick='updateAdmVisibility();' /><img src='"
										+ base_url
										+ "resources/images/nav_zoomin.png' id='"
										+ info.id
										+ "' height=16 style='cursor:pointer;padding-left:7px;' onclick='zoomToLayer(this);' /> <label for='layers_"
										+ info.id
										+ "'>"
										+ info.name
										+ "</label>";
							} else {
								searchOptions += "<option value='" + info.id
										+ "'>&nbsp;&nbsp;&nbsp;" + info.name
										+ "</option>";
								return "&nbsp;&nbsp;&nbsp;<input type='checkbox' class='list_item_adm' id='layers_"
										+ info.id
										+ "' value='"
										+ info.id
										+ "' onclick='updateAdmVisibility();' /><img src='"
										+ base_url
										+ "resources/images/nav_zoomin.png' id='"
										+ info.id
										+ "' height=16 style='cursor:pointer;padding-left:7px;' onclick='zoomToLayer(this);' /> <label for='layers_"
										+ info.id
										+ "'>"
										+ info.name
										+ "</label>";
							}
							return info.name;
						} else {
							parentLayer = info.name;
							return "<span style='font-weight:bold;line-height:25px;'><input type='checkbox' class='list_item_parent' onclick='selectSubLayersAdm(this,\""
									+ info.subLayerIds
									+ "\");' /> "
									+ info.name + "</span>";
							// return "<span
							// style='font-size:12px;font-weight:bold;'>" +
							// info.name + "</span>";
						}
						return "";
					});

	var layerList_adm = "";
	for (i = 0; i < items_adm.length; i++) {
		if (items_adm[i] != "") {
			layerList_adm += items_adm[i] + "<br />";
		}
	}
	dojo.byId("layer_list_adm").innerHTML = layerList_adm;

	layerAdm.setVisibleLayers(visible);
	legendAdm.refresh([ {
		layer : layerAdm,
		title : ' '
	} ]);
	map.addLayers([ layerAdm ]);
	map.infoWindow.resize(500, 300);
	$('#searchCombo').html(searchOptions);
	$('#searchCombo').change(function() {
		selectedLayer = $(this).val();
		if (selectedLayer != "") {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == selectedLayer) {
					input.checked = true;
				}
			});
		} else {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == 2 || input.value == 3) {
					input.checked = true;
				}
			});
		}
		updateAdmVisibility();
		objIndex = 0;
		activateLayer();
	});
	$('#searchCombo2').html(searchOptions);
	$('#searchCombo2').change(function() {
		selectedLayer = $(this).val();
		if (selectedLayer != "") {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == selectedLayer) {
					input.checked = true;
				}
			});
		} else {
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == 2 || input.value == 3) {
					input.checked = true;
				}
			});
		}
		updateAdmVisibility();
		objIndex = 0;
	});
	updateAdmVisibility();
}

function resetCanvas() {
	map.graphics.clear();
	map.showZoomSlider();
	dijit.byId('pan').set('checked', true);
	navToolbar.activate(esri.toolbars.Navigation.PAN);
	map.setMapCursor('move');
	drawToolBar.deactivate();

	dijit.byId("drawingMenu").toggleDropDown();
}
function check_scale(id) {
	var scale_layer = map.getScale();
	if ((array_key_exists(id, layer_info) && $('#layers_' + id).is(':checked') && parseInt(scale_layer) > parseInt(layer_info[id].minScale))
			&& (parseInt(layer_info[id].minScale) > 0 || parseInt(layer_info[id].maxScale) > 0)) {
		$('#layer_name_message').html(layer_info[id].name);
		var min_value = number_format(layer_info[id].minScale, 0, ',', '.');
		$('#layer_scalemin_message').html(min_value);
		$('#dialog-message').dialog('open');
		$('#dialog-message #button_box_msg').attr('id', id);
		$('.button_box_msg').unbind('click');
		$('.button_box_msg').click(
				function() {
					$('#dialog-message').dialog('close');
					esri.request({
						url : url + "arcgis/rest/services/" + layerObject
								+ "/MapServer/" + id,
						content : {
							f : "json"
						},
						callbackParamName : "callback",
						load : layerHandler
					});
				});
	}
}
function layerHandler(response, io) {
	var scale = initFactor;

	if (response.minScale != 0) {
		var zoomFactor = response.minScale / scale;
		var extent = initExtent.expand(zoomFactor).centerAt(
				initExtent.getCenter());
		map.setExtent(extent);
	} else {
		esri
				.request({
					url : url
							+ "arcgis/rest/services/Geometry/GeometryServer/project?inSR=4326&outSR=102113&geometries={'geometryType':'esriGeometryPoint','geometries':[{'x':"
							+ response.extent.xmin + ",'y':"
							+ response.extent.ymin + "},{'x':"
							+ response.extent.xmax + ",'y':"
							+ response.extent.ymax + "}]}",
					content : {
						f : "json"
					},
					callbackParamName : "callback",
					load : doZoomToMap,
					error : esriConfig.defaults.io.errorHandler
				});
	}
}
function doZoomToMap(response, io) {
	initExtent = new esri.geometry.Extent({
		"xmin" : response.geometries[0].x,
		"ymin" : response.geometries[0].y,
		"xmax" : response.geometries[1].x,
		"ymax" : response.geometries[1].y,
		"spatialReference" : {
			"wkid" : 102100
		}
	});

	map.setExtent(initExtent);
}

function updateLayerVisibilitxy() {
	var inputs = dojo.query(".list_item"), input;

	visible = [];
	queryLayers = [];
	bufferLayers = [];
	dojo.forEach(inputs, function(input) {
		if (input.checked) {
			queryLayers.push(input.value);
			bufferLayers.push(input.value);
			visible.push(input.value);
		}
	});
	if (visible.length === 0) {
		visible.push(-1);
		queryLayers.push(-1);
	}
	layer.setVisibleLayers(visible);
	if (url.indexOf("localhost") == -1) {
		legend.refresh([ {
			layer : layer,
			title : ' '
		} ]);
	}
}
function updateAdmVisibility() {
	var inputs = dojo.query(".list_item_adm"), input;

	visible = [];
	queryLayersAdm = [];
	bufferLayers = [];
	dojo.forEach(inputs, function(input) {
		if (input.checked) {
			queryLayersAdm.push(input.value);
			bufferLayers.push(input.value);
			visible.push(input.value);
		}
	});
	if (visible.length === 0) {
		visible.push(-1);
		queryLayersAdm.push(-1);
	}
	layerAdm.setVisibleLayers(visible);
	if (url.indexOf("localhost") == -1) {
		legendAdm.refresh([ {
			layer : layerAdm,
			title : ' '
		} ]);
	}
}

function jQueryReady() {

	$('#dialog_link').click(function() {
		$('#dialog').dialog('open');
		return false;
	});
	$('#dialog_link_adm').click(function() {
		$('#dialog_adm').dialog('open');
		return false;
	});
	$('#dialog2_link').click(function() {
		$('#dialog2').dialog('open');
		return false;
	});
	$('#dialog3_link').click(function() {
		$('#measureWindow').dialog('open');
		return false;
	});
	var status_pengukuran = 0;
	$('#pengukuran').click(
			function() {
				if (status_pengukuran == 0) {
					$('#measureWindow').dialog('open');
					$("#measureWindow").siblings('div.ui-dialog-titlebar')
							.remove();
					$("#measureWindow").siblings('div.ui-dialog').css(
							'background-color', '#EFEFEF');
					status_pengukuran = 1;
				} else {
					$('#measureWindow').dialog('close');
					status_pengukuran = 0;
				}
				return false;
			});
	$('#dialog4_link').click(function() {
		$('#baseMapWindow').dialog('open');
		return false;
	});
	$('#submit_btn_link')
			.click(
					function() {
						esri
								.request({
									url : url
											+ "arcgis/rest/services/Geometry/GeometryServer/project?inSR=4326&outSR=102113&geometries={'geometryType':'esriGeometryPoint','geometries':[{'x':"
											+ $('#long_coord').val() + ",'y':"
											+ $('#lat_coord').val() + "}]}",
									content : {
										f : "json"
									},
									callbackParamName : "callback",
									load : addXYToMap,
									error : esriConfig.defaults.io.errorHandler
								});
						return false;
					});

	$('#dialog_link, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});

	$('#dialog_link_adm, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});

	$('#dialog2_link, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});

	$('#dialog3_link, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});

	$('#submit_btn_link, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});
	$('#grid_link').click(function() {
		$('#dataGrid').dialog('open');
		return false;
	});

	$('#search_btn_link').click(function() {
		executeFind($("#criteria").val());
	});

	$('#search_btn_link').keyup(function(evt) {
		if (evt.keyCode == 13 || evt.keyCode == 32) {
			executeFind($("#criteria").val());
		}
	});

	$('#criteria').keyup(function(evt) {
		if (evt.keyCode == 13) {
			executeFind($("#criteria").val());
		}
	});
	$('#dialog').dialog({
		autoOpen : false,
		width : 450,
		height : 300,
		zIndex : 200,
		position : [ 'left', 'bottom' ],
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#dialog_adm').dialog({
		autoOpen : false,
		width : 350,
		height : 300,
		zIndex : 200,
		position : [ 'left', 'bottom' ],
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#baseMapWindow').dialog({
		autoOpen : false,
		width : 300,
		height : 300,
		zIndex : 200,
		position : [ 'left', 'bottom' ],
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#dialog2').dialog({
		autoOpen : false,
		width : 250,
		height : 300,
		zIndex : 200,
		position : [ 'left', 'bottom' ],
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#measureWindow').dialog({
		autoOpen : false,
		width : 250,
		height : 200,
		zIndex : 200,
		position : [ 390, 110 ],
		closeOnEscape : true,
		open : function(event, ui) {
			map.setMapCursor('default');
		},
		close : function(event, ui) {
			measurement.setTool('distance', false);
			measurement.setTool('area', false);
			measurement.setTool('location', false);
			measurement.clearResult();
			map.setMapCursor('move');
		}
	});
	$('#symbolWindow').dialog({
		autoOpen : false,
		width : 200,
		height : 315,
		zIndex : 200,
		position : [ 20, 80 ],
		closeOnEscape : true,
		close : function(event, ui) {
			drawToolBar.deactivate();
		},
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});
	$('#searchWindow').dialog({
		autoOpen : false,
		width : 230,
		height : 150,
		zIndex : 200,
		position : [ 20, 80 ],
		closeOnEscape : true,
		close : function(event, ui) {
			if (selectionToolbar != null) {
				selectionToolbar.deactivate();
			}
			if (featureLayer3 != null) {
				map.removeLayer(featureLayer3);
				featureLayer3 = null;
			}
			if (featureLayer != null) {
				map.removeLayer(featureLayer);
				featureLayer = null;
			}
			if (featureLayer2 != null) {
				map.removeLayer(featureLayer2);
				featureLayer2 = null;
			}
			dijit.byId('select').set('checked', false);
			dijit.byId('pan').set('checked', true);
			navToolbar.activate(esri.toolbars.Navigation.PAN);
			map.setMapCursor('move');
		},
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});

	$('#searchWindow2').dialog({
		autoOpen : false,
		width : 230,
		height : 250,
		zIndex : 200,
		position : [ 20, 80 ],
		closeOnEscape : true,
		close : function(event, ui) {
			dijit.byId('searchBtn').set('checked', false);
			dijit.byId('pan').set('checked', true);
			navToolbar.activate(esri.toolbars.Navigation.PAN);
			map.setMapCursor('move');
		},
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});

	$('#bufferWindow').dialog({
		autoOpen : false,
		width : 250,
		height : 170,
		zIndex : 200,
		position : [ 20, 80 ],
		closeOnEscape : true,
		close : function(event, ui) {
			if (bufferHandler != null) {
				dojo.disconnect(bufferHandler);
			}
			if (evtClick != null) {
				dojo.disconnect(evtClick);
			}
			if (drawToolBarBuffer != null) {
				drawToolBarBuffer.deactivate();
			}
			bufferHandler = null;
			evtClick = null;
			drawToolBarBuffer = null;
			map.graphics.clear();
			map.showZoomSlider();
			dijit.byId('pan').set('checked', true);
			dijit.byId('buffer').set('checked', false);
			navToolbar.activate(esri.toolbars.Navigation.PAN);
			map.setMapCursor('move');
		},
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});

	$('#buffer_type').change(function() {
		if (bufferHandler != null) {
			dojo.disconnect(bufferHandler);
		}
		if (evtClick != null) {
			dojo.disconnect(evtClick);
		}
		if (drawToolBarBuffer != null) {
			drawToolBarBuffer.deactivate();
		}
		drawToolBarBuffer = null;
		bufferHandler = null;
		evtClick = null;
		drawToolBarBuffer = new esri.toolbars.Draw(map);

		if ($('#buffer_type').val() == "point") {
			evtClick = dojo.connect(map, "onClick", doGetEvtPoint);
			drawToolBarBuffer.activate(esri.toolbars.Draw.POINT);
		} else {
			evtClick = dojo.connect(map, "onMouseUp", doGetEvtPoint);
			drawToolBarBuffer.activate(esri.toolbars.Draw.LINE);
		}
		bufferHandler = dojo.connect(drawToolBarBuffer, "onDrawEnd", doBuffer);
	});
	$('#dataGrid').dialog({
		autoOpen : false,
		width : 300,
		height : 300,
		zIndex : 200,
		position : [ 'left', 'bottom' ],
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
			}
		}
	});

	$('#photoGrid').dialog({
		autoOpen : false,
		width : 600,
		height : 400,
		zIndex : 200,
		position : 'center',
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
				$("#photoGrid").css("visibility", "hidden");
			}
		}
	});

	$('#videoGrid').dialog({
		autoOpen : false,
		width : 520,
		height : 420,
		zIndex : 200,
		position : 'center',
		closeOnEscape : true,
		buttons : {
			"Close" : function() {
				$(this).dialog("close");
				$("#videoGrid").css("visibility", "hidden");
			}
		}
	});

	$('#dialog-message').dialog({
		autoOpen : false,
		height : 130,
		width : 300,
		modal : true,
		dialogClass : 'dlgfixed',
		position : "center"
	});
	$("#navToolbar").css("visibility", "visible");
	$("#navTitle").css("visibility", "visible");
	$("#layerContainer").css("visibility", "visible");
	$("#dataGrid").css("visibility", "visible");
	$(".esriPopup").draggable({
		stop : function(event, ui) {
			maintainInfoPointer();
		},
		drag : function(event, ui) {
			maintainInfoPointer();
		},
		cancel : '.contentPane'
	});

	mapLoaded = true;
}

function openVideo(video) {
	var content = '<a href="'
			+ video
			+ '" style="display:block;width:490px;height:320px" id="flvPlayer"></a>';

	/*
	 * var content = '<div style="text-align:center;"><object'; content += '
	 * id="MediaPlayer" width="480" height="320"'; content += '
	 * classid="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6"'; content += '
	 * standby="Loading Microsoft Windows Media Player components..."'; content += '
	 * type="application/x-oleobject">'; content += ' <param name="Url"
	 * value="'+video+'">'; content += ' <param name="AutoSize" value="true">';
	 * content += ' <param name="AutoStart" value="true">'; content += ' <param
	 * name="Balance" value="0">'; content += ' <param name="DisplaySize"
	 * value="0">'; content += ' <param name="Mute" value="false">'; content += '
	 * <param name="PlayCount" value="0">';
	 * 
	 * content += ' <param name="Rate" value="1.0">'; content += ' <param
	 * name="ShowAudioControls" value="true">'; content += ' <param
	 * name="ShowControls" value="true">'; content += ' <param
	 * name="ShowDisplay" value="true">'; content += ' <param
	 * name="ShowStatusBar" value="true">'; content += ' <param
	 * name="ShowTracker" value="true">'; content += ' <param
	 * name="StretchToFit" value="true">'; content += ' <param
	 * name="TransparentAtStart" value="false">'; content += ' <param
	 * name="Volume" value="100">';
	 * 
	 * content += ' <embed type="application/x-ms-wmp"'; content += '
	 * name="mediaplayer"'; content += '
	 * pluginspage="http://www.microsoft.com/Windows/MediaPlayer"'; content += '
	 * src="'+video+'"'; content += ' Width="480"'; content += ' Height="320"';
	 * content += ' AutoSize="1"'; content += ' AutoStart="1"'; content += '
	 * Balance="0"'; content += ' DisplaySize="0"'; content += ' Mute="0"';
	 * content += ' PlayCount="0"'; content += ' Rate="1.0"'; content += '
	 * ShowAudioControls="1"'; content += ' ShowControls="1"'; content += '
	 * ShowDisplay="1"'; content += ' ShowStatusBar="1"'; content += '
	 * ShowTracker="1"'; content += ' StretchToFit="1"'; content += '
	 * TransparentAtStart="0"'; content += ' Volume="100">'; content += '
	 * </embed>'; content += ' </object></div>';
	 */
	$("#videoGrid").html(content);
	$('#videoGrid').dialog('open');
	$("#videoGrid").css("visibility", "visible");
	flowplayer("flvPlayer", base_url + "resources/js/libs/flowplayer-3.2.7.swf");
}

function openPhoto(photo) {
	var newImg = new Image();
	newImg.src = photo;
	var height = newImg.height;
	var width = newImg.width;
	$(newImg).ready(
			function() {
				if (newImg.width > 550) {
					$("#photoGrid").html(
							"<img align=center id=photoImg src='" + photo
									+ "' width=550 />");
				} else {
					$("#photoGrid").html(
							"<img align=center id=photoImg src='" + photo
									+ "' />");
				}
				$('#photoGrid').dialog('open');
				$("#photoGrid").css("visibility", "visible");

				return {
					width : newImg.width,
					height : newImg.height
				};
			});
}
function showSelectionLayer() {
	$('#searchWindow').dialog('open');
}

function showSearchBox() {
	$('#searchWindow2').dialog('open');
}

function addXYRefToMap(response, ioArgs) {
	map.graphics.clear();
	var xycoords = response.geometries;

	var outSR = new esri.SpatialReference({
		wkid : 102113
	});
	var geoPoint = new esri.geometry.Point(xycoords[0].x, xycoords[0].y, outSR);
	var symbol = new esri.symbol.SimpleMarkerSymbol(
			esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
			new esri.symbol.SimpleLineSymbol(
					esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([
							255, 0, 0 ]), 1), new dojo.Color(
					[ 255, 0, 0, 0.25 ]));

	var graphic = new esri.Graphic(geoPoint, symbol);
	map.graphics.add(graphic);

	var factor = 75000; // some factor for converting point to extent

	var myFeatureExtent = new esri.geometry.Extent(xycoords[0].x - factor,
			xycoords[0].y - factor, xycoords[0].x + factor, xycoords[0].y
					+ factor, outSR);
	map.setExtent(myFeatureExtent);
}

function addXYToMap(response, ioArgs) {
	var xycoords = response.geometries;

	var outSR = new esri.SpatialReference({
		wkid : 102113
	});
	var geoPoint = new esri.geometry.Point(xycoords[0].x, xycoords[0].y, outSR);
	if (pointSymbol === null || pointSymbol === "") {
		var symbol = new esri.symbol.SimpleMarkerSymbol(
				esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10,
				new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_SOLID,
						new dojo.Color([ 255, 0, 0 ]), 1), new dojo.Color([ 0,
						255, 0, 0.25 ]));
	} else {
		var symbol = pointSymbol
	}
	var graphic = new esri.Graphic(geoPoint, symbol);
	map.graphics.add(graphic);
}

function resetToolbar(bt) {
	if ($('#symbolWindow').dialog('isOpen')) {
		$('#symbolWindow').dialog('close');
	}
	if ($('#symbolWindow2').dialog('isOpen')) {
		$('#symbolWindow2').dialog('close');
	}
	if ($('#bufferWindow').dialog('isOpen')) {
		$('#bufferWindow').dialog('close');
	}

	if (routeHandler != null) {
		dojo.disconnect(routeHandler);
	}
	if (bufferHandler != null) {
		dojo.disconnect(bufferHandler);
	}
	if (evtClick != null) {
		dojo.disconnect(evtClick);
	}
	if (drawToolBarBuffer != null) {
		drawToolBarBuffer.deactivate();
	}
	if (routeBar != null) {
		routeBar.deactivate();
	}
	routeBar = null;
	bufferHandler = null;
	evtClick = null;
	drawToolBarBuffer = null;

	dijit.byId('buffer').set('checked', false);
	drawToolBar.deactivate();
	if (bt.id != "select") {
		selectionToolbar.deactivate();
	}
	if (bt.id != "select" && bt.id != "zoomin" && bt.id != "zoomout"
			&& bt.id != "pan") {
		if (isFeature) {
			if (selectedLayer != "") {
				if (featureLayer3 != null) {
					map.removeLayer(featureLayer3);
					featureLayer3 = null;
				}
			}
		}
		if ($('#searchWindow').dialog('isOpen')) {
			$('#searchWindow').dialog('close');
		}
		isFeature = false;
	}
	dijit.byId('zoomin').set('checked', false);
	dijit.byId('zoomout').set('checked', false);
	dijit.byId('pan').set('checked', false);
	dijit.byId('identify').set('checked', false);
	dijit.byId('select').set('checked', false);
	dijit.byId('searchBtn').set('checked', false);
	isIdentify = false;

	if (bt.id == "zoomfullext" || bt.id == "zoomprev" || bt.id == "zoomnext") {
		dijit.byId('pan').set('checked', true);
	} else {
		bt.set('checked', true);
	}

	if (bt.id == "zoomin" || bt.id == "zoomout" || bt.id == "select") {
		map.setMapCursor('crosshair');
	} else if (bt.id == "identify") {
		map.setMapCursor('help');
	} else {
		map.setMapCursor('move');
	}
}

function doIdentify(bt) {
	if (bt.checked) {
		isIdentify = true;
	} else {
		isIdentify = false;
	}
}

function activateLayer() {
	objIndex = 0;
	isFeature = true;
	var template = new esri.InfoTemplate();
	template.setContent(showResultProv);

	var template2 = new esri.InfoTemplate();
	template2.setContent(showResultKab);
	if (featureLayer3 != null) {
		map.removeLayer(featureLayer3);
		featureLayer3 = null;
	}
	if (featureLayer != null) {
		map.removeLayer(featureLayer);
		featureLayer = null;
	}
	if (featureLayer2 != null) {
		map.removeLayer(featureLayer2);
		featureLayer2 = null;
	}
	if (selectedLayer != "") {
		var template3 = new esri.InfoTemplate();
		template3.setContent(showResultGeneric);
		featureLayer3 = new esri.layers.FeatureLayer(url
				+ "arcgis/rest/services/" + layerObject + "/MapServer/"
				+ selectedLayer, {
			mode : esri.layers.FeatureLayer.MODE_SELECTION,
			id : selectedLayer,
			outFields : [ "*" ],
			infoTemplate : template3
		});

		dojo.connect(featureLayer3, "onSelectionComplete", function(results) {
			objIndex = 0;
			var tables = "<table id='Layer_Result'></table>";
			$('#dataGrid').html(tables);

			buildTable(results, featureLayer3);
		});
		map.addLayer(featureLayer3);
	}
	initSelectToolbar(map);
}

function initSelectToolbar(map) {

	var selectQuery = new esri.tasks.Query();

	dojo.connect(selectionToolbar, "onDrawEnd", function(geometry) {
		selectQuery.geometry = geometry;

		/* var deferred; */

		if (selectedLayer != "") {
			executeIdentifyTaskQuery(geometry, layerObject, selectedLayer,
					centerPoint);
			/*
			 * deferred =
			 * featureLayer3.selectFeatures(selectQuery,esri.layers.FeatureLayer.SELECTION_NEW);
			 * map.infoWindow.setFeatures([deferred]);
			 */
		}
		// map.infoWindow.show(centerPoint,
		// esri.dijit.InfoWindow.ANCHOR_BOTTOMLEFT);
		/*
		 * map.infoWindow.show(centerPoint,
		 * esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
		 */
	});
}

function getCenterPoint(evt) {
	centerPoint = evt.mapPoint;
}

function changeBaseMap(obj) {
	lastBaseMap = 'changeBaseMap';
	if (activeBaseMap != null) {
		document.getElementById(activeBaseMap).style.border = "0px solid";
	}
	obj.style.border = "1px solid #999999";
	activeBaseMap = obj.id;
	map.removeLayer(basemap);
	if (obj.id != "raster_map") {
		if (layerLandsat != false) {
			map.removeLayer(layerLandsat);
			layerLandsat = false;
		}
		if (obj.id == "oceans") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer");
		} else if (obj.id == "world_imagery") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer");
		} else if (obj.id == "topographic") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer");
		} else if (obj.id == "natgeo") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer");
		} else if (obj.id == "terrain") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer");
		} else if (obj.id == "streets") {
			basemap = new esri.layers.ArcGISTiledMapServiceLayer(
					"http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer");
		} else if (obj.id == "bing_aerial") {
			basemap = new esri.virtualearth.VETiledLayer({
				bingMapsKey : bingMapKey,
				mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL
			});
		} else if (obj.id == "bing_hybrid") {
			basemap = new esri.virtualearth.VETiledLayer(
					{
						bingMapsKey : bingMapKey,
						mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
					});
		} else {
			basemap = new esri.virtualearth.VETiledLayer({
				bingMapsKey : bingMapKey,
				mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD
			});
		}
		map.addLayer(basemap, 0);
	} else {
		layerLandsat = new esri.layers.ArcGISDynamicMapServiceLayer(url
				+ "arcgis/rest/services/" + landsatObject + "/MapServer");
		layerLandsat.setImageFormat("png");
		map.addLayer(layerLandsat, 1);
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer");
		map.addLayer(basemap, 0);
	}
	dojo.connect(map, "onUpdateEnd", function() {
		if (lastBaseMap == 'changeBaseMap') {
			overviewMapDijit.destroy();
			overviewMapDijit = new esri.dijit.OverviewMap({
				map : map,
				visible : true,
				attachTo : "bottom-right",
				expandFactor : 1,
				width : 300,
				color : "#D84E13",
				opacity : .40

			});
			overviewMapDijit.startup();
			lastBaseMap = null;
		}
	});
}

function select_basemap(basemap_ref) {
	if (basemap_ref == "oceans") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer");
	} else if (basemap_ref == "world_imagery") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer");
	} else if (basemap_ref == "raster_map") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(url
				+ "arcgis/rest/services/" + landsatObject + "/MapServer");
	} else if (basemap_ref == "topographic") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer");
	} else if (basemap_ref == "natgeo") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer");
	} else if (basemap_ref == "terrain") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer");
	} else if (basemap_ref == "streets") {
		basemap = new esri.layers.ArcGISTiledMapServiceLayer(
				"http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer");
	} else if (basemap_ref == "bing_aerial") {
		basemap = new esri.virtualearth.VETiledLayer({
			bingMapsKey : bingMapKey,
			mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL
		});
	} else if (basemap_ref == "bing_hybrid") {
		basemap = new esri.virtualearth.VETiledLayer(
				{
					bingMapsKey : bingMapKey,
					mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
				});
	} else {
		basemap = new esri.virtualearth.VETiledLayer({
			bingMapsKey : bingMapKey,
			mapStyle : esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD
		});
	}
	return basemap;
}
function array_key_exists(key, search) {
	if (!search
			|| (search.constructor !== Array && search.constructor !== Object)) {
		return false;
	}

	return key in search;
}
function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
			: Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ','
			: thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
			: dec_point, s = '', toFixedFix = function(n, prec) {
		var k = Math.pow(10, prec);
		return '' + (Math.round(n * k) / k).toFixed(prec);
	};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
dojo.addOnLoad(init);