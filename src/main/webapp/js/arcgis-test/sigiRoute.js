
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