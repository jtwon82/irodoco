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