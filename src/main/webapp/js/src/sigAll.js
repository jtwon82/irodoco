
function activateBuffer() {
	$('#bufferWindow').dialog('open');
	dijit.byId('buffer').set('checked', true);

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
}

function doGetEvtPoint(evt) {
	evtPoint = evt.mapPoint;
}

function doBuffer(geometry) {
	objIndex = 0;
	if (!isNaN(parseInt($('#buffer_input').val()))) {
		buffer1 = parseInt($('#buffer_input').val());
		buffer2 = buffer1 * 2;
	}

	map.graphics.clear();
	var params = new esri.tasks.BufferParameters();
	params.geometries = [ geometry ];
	params.distances = [ buffer1 ];
	params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
	params.outSpatialReference = map.spatialReference;

	gsvc.buffer(params, function(geometries) {
		var symbol = new esri.symbol.SimpleFillSymbol(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID,
				new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_SOLID,
						new dojo.Color([ 255, 0, 0, 0.65 ]), 2),
				new dojo.Color([ 255, 0, 0, 0.35 ]));

		var graphic = null;
		dojo.forEach(geometries, function(geometry) {
			graphic = new esri.Graphic(geometry, symbol);
			map.graphics.add(graphic);
		});
		executeQueryTask(evtPoint, graphic.geometry, layerObject);
	});
}

function executeFind(criteria) {
	var findTask = new esri.tasks.FindTask(url + "ArcGIS/rest/services/"
			+ layerObject + "/MapServer");
	var findParameters = new esri.tasks.FindParameters();

	findParameters.contains = true;
	if (selectedLayer != "") {
		findParameters.layerIds = [ selectedLayer ];
	} else {
		findParameters.layerIds = queryLayers;
	}
	findParameters.returnGeometry = true;
	findParameters.searchText = criteria;
	findParameters.outSpatialReference = map.spatialReference;

	drawingSurface.clear();
	map.infoWindow.hide();
	$('#dataGrid').dialog('open');
	$('#dataGrid').html("");
	tables = "<div id='loadingImg2' sytle='width:95%;'><table width='100%' style='border:0px;'><tr style='border:0px;'><td  style='border:0px;' align='center'><img src='"
			+ base_url
			+ "resources/images/default/grid/loading.gif' /></td></tr></table></div><table id='Layer_Result'></table>";
	$('#dataGrid').html(tables);

	dojo.connect(findTask, "onComplete", function(results) {
		if (results.length > 0) {
			var screenPoint;
			var selFeature = results[0].feature;
			var selPoint = findCenterPoint(selFeature);
			screenPoint = selPoint;

			var features = new Array();
			var i = 0;
			buildTableBuffer(results);

			dojo.forEach(results, function(result) {
				var feature = result.feature;
				var layer_id = result.layerId;
				features[i] = feature;
				i++;
				feature.attributes.layerName = result.layerName;
				var template = new esri.InfoTemplate();
				template.setContent(showResultGeneric(feature, layer_id));
				feature.setInfoTemplate(template);

				var inputs = dojo.query(".list_item"), input;
				dojo.forEach(inputs, function(input) {
					if (input.value == result.layerId) {
						input.checked = true;
					}
				});
			});

			map.infoWindow.setFeatures(features);
			// map.infoWindow.show(screenPoint,
			// esri.dijit.InfoWindow.ANCHOR_BOTTOMLEFT);
			map.infoWindow.show(screenPoint,
					esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
		} else {
			drawingSurface.clear();
			map.infoWindow.clearFeatures();
		}

		$('#loadingImg2').html('');
		$('#loadingImg2').css('visibility', 'hidden');
		$('#loadingImg2').css('display', 'none');
	});

	findTask.execute(findParameters);
}



//sigRote

function activateRouteTask() {
	routeBar = new esri.toolbars.Draw(map);
	routeBar.activate(esri.toolbars.Draw.POINT);

	dijit.byId("drawingMenu").toggleDropDown();
	routeHandler = dojo.connect(map, "onClick", addStop);

	routeTask = new esri.tasks.RouteTask(url
			+ "ArcGIS/rest/services/SIGI_NA/NAServer/Route");
	routeParams = new esri.tasks.RouteParameters();
	routeParams.stops = new esri.tasks.FeatureSet();
	routeParams.outSpatialReference = {
		"wkid" : 102100
	};
	routeParams.returnRoutes = true;

	dojo.connect(routeTask, "onSolveComplete", showRoute);
	dojo.connect(routeTask, "onError", errorHandler);

	stopSymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(
			esri.symbol.SimpleMarkerSymbol.STYLE_CROSS).setSize(12);
	stopSymbol.outline.setWidth(4);
	routeSymbol = new esri.symbol.SimpleLineSymbol().setColor(
			new dojo.Color([ 0, 0, 255, 0.8 ])).setWidth(3);
}
// Adds a graphic when the user clicks the map. If 2 or more points exist, route
// is solved.
function addStop(evt) {
	var stop = map.graphics.add(new esri.Graphic(evt.mapPoint, stopSymbol));
	routeParams.stops.features.push(stop);

	if (routeParams.stops.features.length >= 2) {
		routeTask.solve(routeParams);
		lastStop = routeParams.stops.features.splice(0, 1)[0];
	}
}

// Adds the solved route to the map as a graphic
function showRoute(solveResult) {
	map.graphics.add(solveResult.routeResults[0].route.setSymbol(routeSymbol));

	routeParams.stops.features.splice(0, 0, lastStop);
	map.graphics
			.remove(routeParams.stops.features[routeParams.stops.features.length - 2]);
	map.graphics
			.remove(routeParams.stops.features[routeParams.stops.features.length - 1]);
	routeParams.stops.features.splice(0, routeParams.stops.features.length);
}

// Displays any error returned by the Route Task
function errorHandler(err) {
	// alert("An error occured\n" + err.message + "\n" +
	// err.details.join("\n"));
	alert("Route tidak ditemukan");

	routeParams.stops.features.splice(0, 0, lastStop);
	map.graphics
			.remove(routeParams.stops.features[routeParams.stops.features.length - 2]);
	map.graphics
			.remove(routeParams.stops.features[routeParams.stops.features.length - 1]);
	routeParams.stops.features.splice(routeParams.stops.features.length - 2, 2);
}


//sig task
function executeIdentifyTask(evt) {
	if (isIdentify) {
		/* Layer Object */
		identifyTask = new esri.tasks.IdentifyTask(url
				+ "arcgis/rest/services/" + MAP_SERVICE + "/MapServer");
		identifyParams = new esri.tasks.IdentifyParameters();
		identifyParams.tolerance = 10;
		identifyParams.returnGeometry = true;
		identifyParams.layerIds = queryLayers;
		identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
		identifyParams.width = map.width;
		identifyParams.height = map.height;
		identifyParams.geometry = evt.mapPoint;
		identifyParams.mapExtent = map.extent;

		var deferred = identifyTask.execute(identifyParams);
		objIndex = 0;
		$('#dataGrid').html("");
		tables = "<table id='Layer_Result'></table>";
		$('#dataGrid').html(tables);

		deferred.addCallback(function(response) {
			return dojo.map(response, function(result) {
				var layer_id = result.layerId;
				var feature = result.feature;
				feature.attributes.layerName = result.layerName;
				var template = new esri.InfoTemplate();

				template.setContent(showResultGeneric(feature, layer_id));
				feature.setInfoTemplate(template);
				buildTableBuffer(response);

				var inputs = dojo.query(".list_item"), input;
				dojo.forEach(inputs, function(input) {
					if (input.value == result.layerId) {
						input.checked = true;
					}
				});

				return feature;
			});
		});

		/* Administrasi Object */
		var identifyTaskAdm = new esri.tasks.IdentifyTask(url
				+ "arcgis/rest/services/" + ADMINISTRASI_SERVICE + "/MapServer");
		var identifyParamsAdm = new esri.tasks.IdentifyParameters();
		identifyParamsAdm.tolerance = 10;
		identifyParamsAdm.returnGeometry = true;
		identifyParamsAdm.layerIds = queryLayersAdm;
		identifyParamsAdm.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
		identifyParamsAdm.width = map.width;
		identifyParamsAdm.height = map.height;
		identifyParamsAdm.geometry = evt.mapPoint;
		identifyParamsAdm.mapExtent = map.extent;

		var deferredAdm = identifyTaskAdm.execute(identifyParamsAdm);
		$('#dataGrid').html("");
		tables = "<table id='Layer_Result'></table>";
		$('#dataGrid').html(tables);

		deferredAdm.addCallback(function(response) {
			return dojo.map(response, function(result) {
				var feature = result.feature;
				var layer_id = result.layerId;
				feature.attributes.layerName = result.layerName;
				var template = new esri.InfoTemplate();
				template.setContent(showResultGeneric(feature, layer_id));
				feature.setInfoTemplate(template);

				buildTableBuffer(response);

				var inputs = dojo.query(".list_item_adm"), input;
				dojo.forEach(inputs, function(input) {
					if (input.value == result.layerId) {
						input.checked = true;
					}
				});

				return feature;
			});
		});

		map.infoWindow.setFeatures([ deferredAdm, deferred ]);
		map.infoWindow.show(evt.mapPoint,
				esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	}
}

function executeIdentifyTaskQuery(geom, layer, selectedLayer, centerPoint) {
	identifyTask = new esri.tasks.IdentifyTask(url + "arcgis/rest/services/"
			+ layer + "/MapServer");
	identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 10;
	identifyParams.returnGeometry = true;
	identifyParams.layerIds = [ selectedLayer ];
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	identifyParams.width = map.width;
	identifyParams.height = map.height;
	identifyParams.geometry = geom;
	identifyParams.mapExtent = map.extent;

	var deferred = identifyTask.execute(identifyParams);
	$('#dataGrid').html("");
	tables = "<table id='Layer_Result'></table>";
	$('#dataGrid').html(tables);
	objIndex = 0;

	deferred.addCallback(function(response) {
		return dojo.map(response, function(result) {

			var feature = result.feature;
			var layer_id = result.layerId;
			feature.attributes.layerName = result.layerName;
			var template = new esri.InfoTemplate();

			template.setContent(showResultGeneric(feature, layer_id));
			feature.setInfoTemplate(template);
			buildTableBuffer(response);
			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == result.layerId) {
					input.checked = true;
				}
			});

			return feature;
		});
	});

	map.infoWindow.setFeatures([ deferred ]);
	map.infoWindow.show(centerPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
}

function executeQueryTask(evt, geom, layerObject) {

	identifyTask = new esri.tasks.IdentifyTask(url + "arcgis/rest/services/"
			+ layerObject + "/MapServer");
	identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 1;
	identifyParams.returnGeometry = true;
	identifyParams.layerIds = bufferLayers;
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
	identifyParams.width = map.width;
	identifyParams.height = map.height;
	identifyParams.geometry = geom;
	identifyParams.mapExtent = map.extent;

	var deferred = identifyTask.execute(identifyParams);
	objIndex = 0;
	$('#dataGrid').html("");
	tables = "<table id='Layer_Result'></table>";
	$('#dataGrid').html(tables);

	deferred.addCallback(function(response) {
		return dojo.map(response, function(result) {

			var feature = result.feature;
			var layer_id = result.layerId;
			feature.attributes.layerName = result.layerName;

			var template = new esri.InfoTemplate();
			template.setContent(showResultGeneric(feature, layer_id));
			feature.setInfoTemplate(template);

			buildTableBuffer(response);

			var inputs = dojo.query(".list_item"), input;
			dojo.forEach(inputs, function(input) {
				if (input.value == result.layerId) {
					input.checked = true;
				}
			});
			return feature;
		});
	});

	map.infoWindow.setFeatures([ deferred ]);
	map.infoWindow.show(evt.mapPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
}

function showResultProvIdentify(feature) {
	var selPoint = findCenterPoint(feature);
	screenPoint = selPoint;
	var sel_value = feature.attributes.PROVINSI;
	sel_value = sel_value.replace("&", "%26");

	var content = "";
	content += "<table width='100%'>"
			+ "<tr><th align='left' width=75 nowrap style='font-size:11px'>Ibukota</th><th width=10 nowrap style='font-size:11px'>:</th><td style='font-size:11px'>"
			+ feature.attributes.IBU_PROV
			+ "</td></tr>"
			+ "<tr><td colspan=3 valign=top>"
			+ "<iframe width='100%' height='280' scrolling='no' frameborder=0 src='"
			+ dataUrl + "findProv.aspx?sel=" + sel_value + "' frameborder=0/>'"
			+ "</td></tr>" + "</table>";
	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	return content;
}

function showResultKabIdentify(feature) {
	var selPoint = findCenterPoint(feature);
	screenPoint = selPoint;
	var sel_value = feature.attributes.IBU_KABU;
	sel_value = sel_value.replace("&", "%26");

	var content = "";
	content += "<table width='100%'>"
			+ "<tr><td colspan=3 valign=top>"
			+ "<iframe width='100%' height='280' scrolling='no' frameborder=0 src='"
			+ dataUrl + "findKab.aspx?sel=" + sel_value + "' frameborder=0/>'"
			+ "</td></tr>" + "</table>";
	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	return content;
}

function getResultProv(feature) {
	var content = "";
	var sel_value = feature.attributes.PROVINSI;
	sel_value = sel_value.replace("&", "%26");

	content += "<table width='100%'>"
			+ "<tr><th align='left' width=75 nowrap style='font-size:11px'>Ibukota</th><th width=10 nowrap style='font-size:11px'>:</th><td style='font-size:11px'>"
			+ feature.attributes.NAMA
			+ "</td></tr>"
			+ "<tr><td colspan=3 valign=top>"
			+ "<iframe width='100%' height='280' scrolling='no' frameborder=0 src='"
			+ dataUrl + "findProv.aspx?sel=" + sel_value + "' frameborder=0/>'"
			+ "</td></tr>" + "</table>";
	return content;
}
function showResultProv(feature) {
	var selPoint = findCenterPoint(feature);
	screenPoint = selPoint;

	content = getResultProv(feature);

	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	return content;
}

function getResultKab(feature) {
	var content = "";
	var sel_value = feature.attributes.NAMA;
	sel_value = sel_value.replace("&", "%26");

	content += "<table width='100%'>"
			+ "<tr><td colspan=3 valign=top>"
			+ "<iframe width='100%' height='280' scrolling='no' frameborder=0 src='"
			+ dataUrl + "findKab.aspx?sel=" + sel_value + "' frameborder=0/>'"
			+ "</td></tr>" + "</table>";
	return content;
}

function showResultKab(feature) {
	var selPoint = findCenterPoint(feature);
	screenPoint = selPoint;

	var content = getResultKab(feature);

	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	return content;
}

function getResultGeneric(feature, layer_id) {
	var content = "<table width='100%'>";
	var column = JSON.parse(visible_column);
	var layer_name = feature.attributes.layerName;
	layer_name = layer_name.replace(/  +/g, ' ');
	var column_to_show = column['webgis_' + layer_id];
	var arr_column = column_to_show.split(',');

	var column_to_show_adm = column['adm_' + layer_id];
	var arr_column_adm = [];
	if (column_to_show_adm != undefined && column_to_show_adm != '') {
		arr_column_adm = column_to_show_adm.split(',');
	}
	$
			.each(
					feature,
					function(key, val) {
						if (key == "attributes") {
							$
									.each(
											val,
											function(key2, val2) {
												var keyfield = key2;
												if (in_array(keyfield
														.toLowerCase(),
														arr_column)
														|| in_array(keyfield
																.toLowerCase(),
																arr_column_adm)) {
													if (key2.toLowerCase() == "foto"
															&& typeof val2 != 'undefined'
															&& val2 != null
															&& trim(val2) != ''
															&& val2
																	.toLowerCase() != 'null') {
														content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>"
																+ key2
																+ "</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'><img src='"
																+ picUrl
																+ val2
																+ "' width=150 style='cursor:pointer;' onclick='javascript:openPhoto(\""
																+ picUrl
																+ val2
																+ "\");'/></td></tr>";
													} else if (key2
															.toLowerCase() == "foto_awal"
															&& typeof val2 != 'undefined'
															&& val2 != null
															&& trim(val2) != ''
															&& val2
																	.toLowerCase() != 'null') {
														content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>"
																+ key2
																+ "</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'><img src='"
																+ picUrl
																+ val2
																+ "' width=150 style='cursor:pointer;' onclick='javascript:openPhoto(\""
																+ picUrl
																+ val2
																+ "\");'/></td></tr>";
													} else if (key2
															.toLowerCase() == "foto_akhir"
															&& typeof val2 != 'undefined'
															&& val2 != null
															&& trim(val2) != ''
															&& val2
																	.toLowerCase() != 'null') {
														content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>"
																+ key2
																+ "</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'><img src='"
																+ picUrl
																+ val2
																+ "' width=150 style='cursor:pointer;' onclick='javascript:openPhoto(\""
																+ picUrl
																+ val2
																+ "\");'/></td></tr>";
													} else if (key2
															.toLowerCase() == "video"
															&& typeof val2 != 'undefined'
															&& val2 != null
															&& trim(val2) != ''
															&& val2
																	.toLowerCase() != 'null') {
														content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>VIDEO</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'><span style='cursor:pointer;color:blue;text-decoration:underline;' onclick='javascript:openVideo(\""
																+ videoUrl
																+ val2
																+ "\");'>Preview</span></td></tr>";
													} else if (key2
															.toLowerCase() != "objectid"
															&& key2
																	.toLowerCase() != "id"
															&& key2
																	.toLowerCase() != "_id"
															&& key2
																	.toLowerCase() != "id_"
															&& key2
																	.toLowerCase() != "shape"
															&& key2
																	.toLowerCase() != "shape_leng"
															&& key2
																	.toLowerCase() != "shape.len"
															&& key2
																	.toLowerCase() != "shape.area"
															&& key2
																	.toLowerCase() != "layername"
															&& key2
																	.toLowerCase() != "photo"
															&& key2
																	.toLowerCase() != "video") {
														content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>"
																+ key2
																+ "</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'>"
																+ val2
																+ "</td></tr>";
													}
												}

											});
						}
					});
	content += "</table>";
	return content;
}
function showResultGeneric(feature, layer_id) {
	var selPoint = findCenterPoint(feature);
	screenPoint = selPoint;
	var content = getResultGeneric(feature, layer_id);

	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
	return content;
}

function getResultLayer(features, layerObj) {
	selected = "";
	buildTable(features, layerObj);
	dojo.forEach(features, function(feature) {
		selected = selected + feature.attributes.NAMA + ",";
	});
}

function buildTableBuffer(results) {
	if (results.length > 0) {
		objIndex = 0;
		var layerId = results[0].layerId;
		var tables = '<thead><tr>';
		tables += '<th>Nama</th>';
		tables += '<th>Layer</th>';
		tables += '</tr></thead><tbody>';
		$
				.each(
						results,
						function(idx, result) {
							$
									.each(
											result.feature,
											function(key, val) {
												if (key == "attributes") {
													tables += '<tr style="cursor:pointer;" onclick="zoomToBuffer('
															+ objIndex + ');">';
													$
															.each(
																	val,
																	function(
																			key2,
																			val2) {
																		if (key2
																				.toLowerCase() == result.displayFieldName
																				.toLowerCase()) {
																			tables += "<td style='font-size:11px' valign='top'>"
																					+ val2
																					+ "</td>";
																			tables += "<td style='font-size:11px' valign='top'>"
																					+ result.layerName
																					+ "</td>";
																		}
																	});
													tables += '</tr>';
													objIndex++;
												}
											});
						});
		tables += '</tbody>';
		$('#Layer_Result').html(tables);
	}
}

function buildTable(results, layerObj) {
	if (results.length > 0) {
		var displayField = layerObj.displayField;
		var layerName = layerObj.name;
		var tables = '';
		tables = '<thead><tr>';
		$.each(results[0].attributes, function(key, val) {
			if (key.toLowerCase() == displayField.toLowerCase()) {
				tables += '<th field="' + key + '">' + key + '</th>';
			}
		});
		tables += '<th>Layer</th>';
		tables += '</tr></thead>';
		$
				.each(
						results,
						function(idx, result) {
							$
									.each(
											result,
											function(key, val) {
												if (key == "attributes") {
													tables += '<tr style="cursor:pointer;" onclick="zoomToBuffer('
															+ objIndex + ');">';
													$
															.each(
																	val,
																	function(
																			key2,
																			val2) {
																		if (key2
																				.toLowerCase() == displayField
																				.toLowerCase()) {
																			tables += "<td style='font-size:11px' valign='top'>"
																					+ val2
																					+ "</td>";
																			tables += "<td style='font-size:11px' valign='top'>"
																					+ layerName
																					+ "</td>";
																		}
																	});
													tables += '</tr>';
													objIndex++;
												}
											});
						});
		$('#Layer_Result').html(tables);
	}
}

function zoomToBuffer(objIdx) {
	map.infoWindow.select(objIdx);
}
function zoomToObject(selId, objIdx, layerId) {
	layerObj = map.getLayer(layerId);
	var selGraphic;
	$.each(layerObj.graphics, function(id, graphic) {
		if ((graphic.attributes) && graphic.attributes.OBJECTID == selId) {
			selGraphic = graphic;
			return;
		}
	});

	var content = "";
	content = getResultGeneric(selGraphic, layerId);
	var selPoint = findCenterPoint(selGraphic);
	screenPoint = selPoint;
	map.infoWindow.select(objIdx);
	map.infoWindow.setContent(content);
	map.infoWindow.show(screenPoint, esri.dijit.InfoWindow.ANCHOR_LOWERRIGHT);
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
function in_array(needle, haystack, argStrict) {

	var key = '', strict = !!argStrict;
	if (strict) {
		for (key in haystack) {
			if (haystack[key] === needle) {
				return true;
			}
		}
	} else {
		for (key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}
	}

	return false;
}
