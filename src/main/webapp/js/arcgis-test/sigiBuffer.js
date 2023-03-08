
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