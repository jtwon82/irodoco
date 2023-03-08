
			var map, googleLayer, staticMap, owidth, tb, beforePoint, markerSymbol, markerSymbol2, navToolbar, player, resizeTimer, road_layer, startExtent ;
			var navToolbar, routeHandler, bufferHandler, simpleFillSymbol, statesLabel, symbol, labelClass121, labelClass122, featureLayer, classbreaks;
//			layers = {};

			var mobile = false;
			var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
			for (var word in mobileKeyWords){
				if (navigator.userAgent.match(mobileKeyWords[word]) != null){
					mobile=true;
					break;
				}
			}
			
			require(["dojo/ready", "dojo/on", "dojo/dom-construct", "dojo/_base/array", "dojo/parser"
//				, "agsjs/layers/GoogleMapsLayer"
//			    , "gmaps/layers/GoogleMapsLayer"

				, "esri/dijit/Print"
				, "esri/dijit/Measurement", "esri/toolbars/draw"
		        , "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol"
		        , "esri/renderers/SimpleRenderer"
		        , "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol"
		        , "esri/graphic", "esri/symbols/PictureMarkerSymbol"
		        , "esri/Color", "esri/layers/FeatureLayer", "esri/dijit/FeatureTable"
		        , "esri/geometry/Polyline"
				, "esri/map"
				, "esri/dijit/InfoWindowLite"
				, "esri/layers/FeatureLayer"
				, "esri/dijit/editing/TemplatePicker"
//				, "esri/toolbars/navigation"
//				, "esriES/staticmap"
//				, "esri/config"
				, "esri/tasks/IdentifyTask"
				, "esri/tasks/IdentifyParameters"
				, "esri/renderers/ClassBreaksRenderer"
				, "esri/symbols/SimpleFillSymbol"
				, "esri/Color"
				, "esri/symbols/Font"
				, "esri/layers/LabelClass"
				, "esri/symbols/TextSymbol"
				
				, "esri/dijit/PopupTemplate"
				, "esri/layers/FeatureLayer"
				
				, "dijit/Toolbar"
				, "dijit/Dialog"
				, "dijit/registry"
				, "dijit/layout/BorderContainer"
				, "dijit/layout/ContentPane"
				, "dijit/TitlePane"
				, "dijit/form/CheckBox"
				, "dijit/form/Button"
			], function( ready, on, domConstruct, arrayUtils, parser
//				, GoogleMapsLayer
				
				, Print
				, Measurement, Draw
		        , SimpleMarkerSymbol, SimpleLineSymbol
		        , SimpleRenderer
		        , PictureFillSymbol, CartographicLineSymbol
		        , Graphic, PictureMarkerSymbol
		        , Color, FeatureLayer, FeatureTable
		        , Polyline
				, Map
				, InfoWindowLite
				, FeatureLayer
				, TemplatePicker
//				, StaticMap
				, IdentifyTask
				, IdentifyParameters
				, ClassBreaksRenderer
				, SimpleFillSymbol
				, Color
				, Font
				, LabelClass
				, TextSymbol
				
				, PopupTemplate
				, FeatureLayer
				
				, dialog, registry
			) {
				ready(function() {
					startExtent = new esri.geometry.Extent({
						xmax:107.73248481316496,
						xmin:107.49095725579222,
						ymax:-6.848776586432823,
						ymin:-6.974882794966135,
						"spatialReference" : {
							"wkid" : 4326
						}
					});
					map = new esri.Map("map", { 
						basemap : 'streets',
						extent: startExtent,
						zoom : 13,
						showLabels : true
					});

					{
						// arcgis에 구글레이어 올리기
//						googleLayer = new GoogleMapsLayer();
//						map.addLayer(googleLayer);
						
//			    		var pop_new3 = new esri.dijit.PopupTemplate({
//			    			"title": "Title [{Shape}]",
//			    			fieldInfos: [
//			    			             {fieldName: "Shape", visible: true, label: "Shape"},
//			    			             {fieldName: "SNODE_LON", visible: true, label: "SNODE_LON"},
//			    			             {fieldName: "NODE_ID", visible: true, label: "NODE_ID"}
//			    			],
//			    			showAttachments: true,
//			    			'':''});
//			    		var arcgisurl_sigi3 = new esri.layers.FeatureLayer('http://arcgis.pusjatan.pu.go.id/arcgis/rest/services/city_road/MapServer/0', {
//							mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
//							infoTemplate : pop_new3,
//							outFields : [ "*" ]
//						});
//						map.addLayer( arcgisurl_sigi3 );
			    		
						road_layer = new esri.layers.ArcGISDynamicMapServiceLayer( arcgisurl_sigi );
						road_layer.setImageFormat("png");
						map.addLayer( road_layer );
						road_layer.setVisibleLayers(visible);

						symbol = new TextSymbol({
							font : new Font("10", Font.WEIGHT_BOLD ),
							color : new Color("#f00")
						});
					}
					{
						// 지도에 오브젝트 올리기
						markerSymbol = new PictureMarkerSymbol('/images/icon/icon-chk1.png',24,24);
						markerSymbol2 = new PictureMarkerSymbol('/images/icon/icon-incident.png',24,24);
						
						var lineSymbol = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SOLID, new Color([ 255, 0,
										0 ]), 10, CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_MITER, 5);
						var fillSymbol = new PictureFillSymbol("/images/black-dot-small.png",
								new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('#000'), 1), 20, 20);
						
						// 맵이 로드되면 실행되는부분
						map.on('load', function() {
							tb = new Draw(map);
							
							// draw-end 이벤트 발생시 구동
							tb.on("draw-end", function(evt) {
								tb.deactivate();
								map.enableMapNavigation();
	
								var symbol;
								if (evt.geometry.type === "point"
										|| evt.geometry.type === "multipoint") {
									symbol = markerSymbol;
								} else if (evt.geometry.type === "line"
										|| evt.geometry.type === "polyline") {
									symbol = lineSymbol;
								} else if (evt.geometry.type == "polygon" ){
									symbol = fillSymbol;
								} else {
									symbol = fillSymbol;
								}
								
								var graphic = new esri.Graphic(evt.geometry, symbol);
								
								// 커스텀 팝업스타일
//								var json = {title: evt.geometry.type, content: evt.geometry.type, data: '{"OBJ_TYPE":""}' };
//								var infoTemplate = new esri.InfoTemplate(json);
//								graphic.setInfoTemplate(infoTemplate);
								
								map.graphics.add(graphic);
							});
							
							// 오브젝트 마우스오버
							dojo.connect(map.graphics, "onMouseOver", function(event) {
								map.setMapCursor("pointer");
							});
							dojo.connect(map.graphics, "onMouseOut", function() {
								map.setMapCursor("default");
//								map.infoWindow.hide();
							});
							dojo.connect(map.graphics,"onClick", function(event) {
								try{
									var data = JSON.parse( event.graphic.infoTemplate.data );
									data.OBJ_TYPE;
								}catch(e){
									return;
								}
								
								if ( data.OBJ_TYPE=='INCIDENT' ){
									trace("/mapobj-incident-click");
										
								}else if ( data.OBJ_TYPE=='CCTV' ){
									trace("/mapobj-cctv-click");
									data.URL = data.WEB_URL  || '' ;
									
									if ( mobile ){
										if ( mobile=='iPhone' || mobile=='iPad' ){
											if( data.INTV_YN=='Y' ){
												setTimeout(function(){
													var url = "/cctv-img?CCTV_ID="+ data.ID;
													$("#gallery").empty().append("<img src='"+url+"' width='100%' onclick='map.infoWindow.hide();'/>");
												}, 500);
											}else{
												if(data.IOS_URL){
													setTimeout(function(){
														window.open( data.IOS_URL, 'P');
													},1000);
													setTimeout(function(){
														map.infoWindow.hide();
													}, 1000);
												}else{
													setTimeout(function(){
														var url = "/cctv-img?CCTV_ID="+ data.ID;
														$("#gallery").empty().append("<img src='"+url+"' width='100%' onclick='map.infoWindow.hide();'/>");
													}, 500);
												}
											}
										}else{
											if ( data.INTV_YN=='Y' ){
												setTimeout(function(){
													var url = "/cctv-img?CCTV_ID="+ data.ID;
													var img = new Image();
													img.src = url;
													img.onload = function(){
														$("#gallery").empty().append("<img src='"+url+"' width='100%' onclick='map.infoWindow.hide();'/>");
														map.infoWindow.resize(map.infoWindow._contentPane.scrollWidth+20, img.height());
													}
												}, 500);
											}else{
												if (data.ANDR_URL){
													setTimeout(function(){
														window.open( data.ANDR_URL, 'P');
													},1000);
													setTimeout(function(){
														map.infoWindow.hide();
													}, 1000);
												}else{
													setTimeout(function(){
														var url = "/cctv-img?CCTV_ID="+ data.ID;
														$("#gallery").empty().append("<img src='"+url+"' width='100%' onclick='map.infoWindow.hide();'/>");
														map.infoWindow.resize(map.infoWindow._contentPane.scrollWidth+20, img.height());
													}, 500);
												}
											}
										}
									}else{
										if ( data.INTV_YN=='Y' ){
											setTimeout(function(){
												var DIR1 = data.DIR1;
												var DIR2 = data.DIR2;
												var DIR3 = data.DIR3;
												var DIR4 = data.DIR4;
												
												$("#gallery").empty();
												$("#gallery").append("<table>");
												$("#gallery").append("<tr><td class='dir1'></td><td class='dir2'></td></tr>");
												$("#gallery").append("<tr><td class=''>Direction 1</td><td class=''>Direction 2</td></tr>");
												$("#gallery").append("<tr><td class='dir3'></td><td class='dir4'></td></tr>");
												$("#gallery").append("<tr><td class=''>Direction 3</td><td class=''>Direction 4</td></tr>");
												$("#gallery").append("</table>");
												
												var img1 = new Image();
												img1.src = DIR1;
												img1.onload = function(){
													$("#gallery .dir1").empty().append("<img src='"+ this.src +"' width='100%'/><br/>");
												}
												var img2 = new Image();
												img2.src = DIR1;
												img2.onload = function(){
													$("#gallery .dir2").empty().append("<img src='"+ this.src +"' width='100%'/><br/>");
												}
												var img3 = new Image();
												img3.src = DIR1;
												img3.onload = function(){
													$("#gallery .dir3").empty().append("<img src='"+ this.src +"' width='100%'/><br/>");
												}
												var img4 = new Image();
												img4.src = DIR1;
												img4.onload = function(){
													$("#gallery .dir4").empty().append("<img src='"+ this.src +"' width='100%'/><br/>");
												}
												
												setTimeout(function(){
													map.infoWindow.resize( map.infoWindow._contentPane.scrollWidth, map.infoWindow._contentPane.scrollHeight + 100 ); //img1.height()+30 );
												}, 300);
											}, 500);
										}else{
											setTimeout(function(){
												player = jwplayer("gallery");
												player.setup({
													image: data.DIR1,
													file: data.URL,
//													file: "http://localhost:8080/cctv-img?CCTV_ID="+ data.ID,
													html5player: "/js/player/jwplayer.html5.js",
//													flashplayer: "/js/player/jwplayer.swf",
									 	  			width: 410,
									 	  		  	allowfullscreen: false,
									 	  	        autostart: true,
									 	  	        controls: true,
									 	  	        androidhls: true,
									 	  	    	empty:''
												});
	
												player.onError(function(){
													player.setup({
														image: data.DIR1
													});
												});
												
//												map.infoWindow.resize(430);
												map.infoWindow.resize( map.infoWindow._contentPane.scrollWidth+15, map.infoWindow._contentPane.scrollHeight + 100 );
												
												setTimeout(function(){
													jwplayer("gallery").stop();
													//map.infoWindow.hide();
												}, 30000);
											}, 1000);
										}
									}
								}else{
								}
							});
							dojo.connect(dijit.byId('map'), 'resize', function(evt) {
								map.infoWindow.resize();
					          });
						});
						
						map.on("layers-add-result", function(evt){
							var currentLayer = null;
							var layers = arrayUtils.map(evt.layers, function(result) {
								return result.layer;
							});
						});

						if ( sub_type=='googleTraffic' ){
							setTimeout(function(){
								UI.menuClick($(".subcontents .googleTraffic"), 'googleTraffic');
							},500)
							
						}else if ( sub_type=='incident' ){
							UI.menuClick($(".subcontents .incident"), 'incident');
						
						}else if ( sub_type=='cctv' ){
							UI.menuClick($(".subcontents .cctv"), 'cctv');
						
						}else if ( sub_type=='publicTraffic' ){
							UI.menuClick($(".subcontents .publicTraffic"), 'publicTraffic');
						
						}else if ( sub_type=='roadInfo' ){
							UI.menuClick($(".subcontents .roadInfo"), 'roadInfo');
						
						}else if ( sub_type=='hawkInfo' ){
							UI.menuClick($(".subcontents .hawkInfo"), 'hawkInfo');
							
						}
					}
					{
						// 거리측정 기본 라이브러리 구동시키기
						measurement = new esri.dijit.Measurement({
							map : map,
							defaultAreaUnit : esri.Units.SQUARE_KILOMETERS,
							defaultLengthUnit : esri.Units.KILOMETERS
						}, dojo.byId('measurementDiv'));
					}

					resizeLayout();
					measurement.startup();
					
				    var options={
				        basemap: "streets",
				        zoom: map.getZoom(),
				        longitude: map.extent.getCenter().y ,
				        latitude: map.extent.getCenter().x ,
				        size: [400, 300],
				        format: "JPG"
				    };
				    
					// https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=fl_selectfeatures
					{
						classbreaks = [ {
							attribute : "classbreak0",
							value : 20000,
							legendLabel : "0 - 20,000 Km"
						}, {
							attribute : "classbreak1",
							value : 40000,
							legendLabel : "20,000 - 40,000 Km"
						}, {
							attribute : "classbreak2",
							value : 70000,
							legendLabel : "40,000 - 70,000 Km"
						}, {
							attribute : "classbreak3",
							value : 100000,
							legendLabel : "70,000 - 100,000 Km"
						}, {
							attribute : "classbreak4",
							value : 9900000,
							legendLabel : "100,000 - greater Km"
						} ];
						
			            // draw legend items
						classbreaks.forEach(function(classbreak, i) {
			                domConstruct.create("div", {
			                    innerHTML:'<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
			                            '<path data-classbreak="' + classbreak.attribute + '" d="M 0 0 L 23 0 L 23 23 L 0 23 Z" />' +
			                            '</svg><span style="vertical-align: top; padding-left: 3px; color:black;">' + classbreak.legendLabel + '</span>'
			                }, 'legend');
			            });
					}
				});
			});
			
			
			
			
			
			var visible_column = '{\"webgis_5\":\",\",\"webgis_1\":\"nama,panjang,pengelola,status,kabupaten,propinsi\",\"webgis_2\":\"panjang,status,linkname,provinsi\",\"webgis_3\":\"fungsi,status,ruas,panjang,provinsi,lin_pu_sum,lintas_3,kondisi,video\",\"webgis_4\":\"balai,satker,provinsi,jenis_alat,jumlah,lokasi\"}';
			var layer_info = [];
			var visible = [];
			var queryLayers = [];
			var bufferLayers = [];
			var road_layer_clicked = false;

			function executeIdentifyTask(evt) {
				if( road_layer_clicked ){
					
					/* Layer Object */
					var identifyTask = new esri.tasks.IdentifyTask( arcgisurl_sigi );
					var identifyParams = new esri.tasks.IdentifyParameters();
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
					$('#dataGrid').empty().html("<table id='Layer_Result'></table>");
					
					deferred.addCallback(function(response) {
						var result = dojo.map(response, function(result) {
							var layer_id = result.layerId;
							var feature = result.feature;
							
							feature.attributes.layerName = result.layerName;
							var template = new esri.InfoTemplate();
							template.setContent( showResultGeneric(feature, layer_id) );
							feature.setInfoTemplate(template);
							buildTableBuffer(response);

							return feature;
						});
						return result;
					});
					
					map.infoWindow.setFeatures([ deferred ]);
					map.infoWindow.show( evt.mapPoint );
				}
			}

			function showResultGeneric(feature, layer_id) {
				var selPoint = findCenterPoint(feature);
				var content = getResultGeneric(feature, layer_id);
				
				map.infoWindow.show( selPoint );
				return content;
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
			function getResultGeneric(feature, layer_id) {
				var content = "<table width='100%'>";
				var column = JSON.parse(visible_column);
				var layer_name = feature.attributes.layerName.replace(/  +/g, ' ');
				var column_to_show = column['webgis_' + layer_id];
				var arr_column = column_to_show.split(',');
				
				$.each(feature.attributes, function(key2, val2){
					if ( in_array(key2.toLowerCase(), arr_column) ){
						content += "<tr><th align='left' width=75 nowrap style='font-size:11px' valign='top'>"
							+ key2
							+ "</th><th width=10 nowrap style='font-size:11px' valign='top'>:</th><td style='font-size:11px'>"
							+ val2 + "</td></tr>";
					}
				});
				
				content += "</table>";
				return content;
			}
			
			function buildTableBuffer(results) {
				if (results.length > 0) {
					objIndex = 0;
					var layerId = results[0].layerId;
					var tables = '<thead><tr>';
					tables += '<th>Nama</th>';
					tables += '<th>Layer</th>';
					tables += '</tr></thead><tbody>';
					$.each(results, function(idx, result) {
						$.each(result.feature, function(key, val) {
							if (key == "attributes") {
								tables += '<tr style="cursor:pointer;">';
								$.each(val, function(key2, val2) {
									if (key2.toLowerCase() == result.displayFieldName.toLowerCase()) {
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

			function array_key_exists(key, search) {
				if (!search
						|| (search.constructor !== Array && search.constructor !== Object)) {
					return false;
				}

				return key in search;
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
			
			// 화면 리사이즈 이벤트 발생시 레이아웃 재정렬
			function resizeLayout(){
				owidth = width;
				var width = $(window).width();
				if ( owidth!=width ){
					
					$("#left1").hide();
					$("#left2").hide();
					if(width>767){
						$("#left2").show();
					}else{
						$("#left1").show();
					}
					dijit.byId('content').resize();
				}
			}