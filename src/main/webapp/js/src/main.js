
			var map, googleLayer, staticMap, owidth, tb, beforePoint, markerSymbol, markerSymbol2, navToolbar, player, layer_set, layers, resizeTimer ;
			layer_set = {};
			layers = {};

			require(["dojo/ready", "dojo/on", "dojo/dom-construct", "dojo/_base/array", "dojo/parser"
//				, "agsjs/layers/GoogleMapsLayer"
//			    , "gmaps/layers/GoogleMapsLayer"

				, "esri/dijit/Print"
				, "esri/dijit/Measurement", "esri/toolbars/draw"
		        , "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol"
		        , "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol"
		        , "esri/graphic", "esri/symbols/PictureMarkerSymbol"
		        , "esri/Color", "esri/layers/FeatureLayer", "esri/dijit/FeatureTable"
		        , "esri/geometry/Polyline"
				, "esri/map"
				, "esri/dijit/InfoWindowLite"
				, "esri/layers/FeatureLayer"
				, "esri/dijit/editing/TemplatePicker"
//				, "esriES/staticmap"
				
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
		        , PictureFillSymbol, CartographicLineSymbol
		        , Graphic, PictureMarkerSymbol
		        , Color, FeatureLayer, FeatureTable
		        , Polyline
				, Map
				, InfoWindowLite
				, FeatureLayer
				, TemplatePicker
//				, StaticMap
				
				, dialog, registry
			) {
				ready(function() {
//					staticMap = new StaticMap();
					var startExtent = new esri.geometry.Extent({
						xmax:107.8360824541581,
						xmin:107.44469451470498,
						ymax:-6.764243098993435,
						ymin:-7.0433644979192165,
						"spatialReference" : {
							"wkid" : 4326
						}
					});
					map = new esri.Map("map", { 
						basemap : 'streets',
						extent: startExtent,
						zoom : 12
					});
					initialize();

					{
						// arcgis에 구글레이어 올리기
//						googleLayer = new GoogleMapsLayer();
//						map.addLayer(googleLayer);
						
						
						dojo.connect(map, 'onExtentChange', function(evt){
//							console.log( 73, map.getZoom() );
						});

					}
					{
						// 지도에 오브젝트 올리기
						markerSymbol = new PictureMarkerSymbol('/images/icon-chk1.png',24,24);
						markerSymbol2 = new PictureMarkerSymbol('/images/icon-chk2.png',24,24);
						
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
	
							// id=info 클릭시 발생되는 이벤트
							on(dojo.byId("info"), "click", function(evt) {
								if ( evt.target.id == "info" || !evt.target.id ) {
									return;
								}
								var tool = evt.target.id.toLowerCase();
								map.disableMapNavigation();
								tb.activate(tool);
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
//									console.log(133, data );
									map.infoWindow.resize( data.WIDTH, data.HEIGHT );
								}catch(e){
									data.OBJ_TYPE='';
								}
								console.log( 144, data );

								if ( data.OBJ_TYPE=='INCIDENT' ){
									trace("/mapobj-incident-click");
//									console.log(138, map )
//									map.infoWindow.resize(100, 100);
									
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
													$("#gallery").empty().append("<img src='"+url+"' width='100%' onclick='map.infoWindow.hide();'/>");
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
													}, 500);
												}
											}
										}
									}else{
										if ( data.INTV_YN=='Y' ){
											setTimeout(function(){
												var url = "/cctv-img?CCTV_ID="+ data.ID;
												$("#gallery").empty().append("<img src='"+url+"' width='100%'/>");
											}, 500);
										}else{
											setTimeout(function(){
												player = jwplayer("gallery");
												player.setup({
													image: "/cctv-img?CCTV_ID="+ data.ID,
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
														file: "/cctv-img?CCTV_ID="+ data.ID
													});
												});
											}, 1000);
										}
									}
								}else{
//									var graphic = new esri.Graphic(evt.geometry, symbol);
//									var json = {title: evt.geometry.type, content: evt.geometry.type, data: '{"OBJ_TYPE":"TEST"}' };
//									var infoTemplate = new esri.InfoTemplate(json);
//									graphic.setInfoTemplate(infoTemplate);
//									
//									map.graphics.add(graphic);
									
//									map.infoWindow.setTitle("Some title");  
//							        map.infoWindow.resize(355, 140);  
								}
							});
//							dojo.connect(map.infoWindow, "onShow", function() {
//								map.infoWindow.resize();
//					        });
							dojo.connect(dijit.byId('map'), 'resize', function(evt) {
//								console.log( 204, evt );
//					            clearTimeout(resizeTimer);
//					            resizeTimer = setTimeout(function() {
//					            	map.infoWindow.resize();
//					            }, 500);
								map.infoWindow.resize();
					          });
						});
						
						map.on("layers-add-result", function(evt){
							var currentLayer = null;
							var layers = arrayUtils.map(evt.layers, function(result) {
								return result.layer;
							});

							arrayUtils.forEach(layers, function(layer) {
								layer.on("click", function(evt) {
//									console.log(248, evt);
								});
							});
						});
					}
					
				    var options={
				        basemap: "streets",
				        zoom: map.getZoom(),
				        longitude: map.extent.getCenter().y ,
				        latitude: map.extent.getCenter().x ,
				        size: [400, 300],
				        format: "JPG"
				    };

//				    staticMap.getImage(options).then(function(imageURL){
//				        console.log( imageURL );
//				    });
				    
					// https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=fl_selectfeatures
					
				});
			});

			
			// 구글 소통정보 표시를 위한 함수
			var glOverlays = {};
			function toggle(name, vis, obj) {
//			    var gmap = vis ? googleLayer.getGoogleMapInstance() : null;
			    var glay = glOverlays[name];
			    switch (name) {
			            
					case 'ajax-test':
						$.ajax({
							type: 'POST',
							url: '/ajax',
							data: {
								'empty' : ''
							},
							dataType:"json",
							success: function(req) {
								
								$(req).each(function(id){
									console.log( 284, this.FCLT_LOCAT_LAT, this.FCLT_LOCAT_LON );
									
									var pt = (new esri.geometry.Point( this.FCLT_LOCAT_LON, this.FCLT_LOCAT_LAT ));
									
									map.graphics.add(new esri.Graphic(pt, markerSymbol));
								});
							}
						});
						break;
						
					case 'Incident':
						map.infoWindow.hide();
						map.graphics.clear();
						$.ajax({
							type: 'POST',
							url: '/ajax-incident',
							data: {
								'empty' : ''
							},
							dataType:"json",
							success: function(req) {
//								console.log( 271, req );
								
								$(req).each(function(id){
//									console.log( 284, this.LAT, this.LON );
									
									var pt = (new esri.geometry.Point( this.LON, this.LAT ));

									var graphic = new esri.Graphic(pt, markerSymbol2);

									// 기본 팝업 스타일
//									var popupTemplate = new esri.dijit.PopupTemplate({
//										title : " INCIDENT ",
//										fieldInfos : [ {
//											fieldName : "INCIDENT: "+ this.ID,
//											visible : true
//										}, {
//											fieldName : "INCIDENT: "+ this.ID,
//											visible : true
//										} ]
//									});

									var html = "";
									html+="<table border width='100%'>";
									html+="<cols width='20%' style='padding:10%;'>";
									html+="<cols width='*'>";
									html+="<tr>";
									html+="	<td>INCIDENT</td>";
									html+="	<td>"+this.TITLE+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Incident Type</td>";
									html+="	<td>"+(this.INCI_TYPE||'')+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Incident Kind</td>";
									html+="	<td>"+(this.INCI_KIND||'')+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Latitude</td>";
									html+="	<td>"+this.LAT+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Longitude</td>";
									html+="	<td>"+this.LON+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>State</td>";
									html+="	<td>"+(this.PRCS_STAT||'')+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Start Time</td>";
									html+="	<td>"+( new Date(this.STRT_DT) )+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>End Time</td>";
									html+="	<td>"+( new Date(this.END_DT) )+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Serious</td>";
									html+="	<td>"+(this.TRBL_GRADE||'')+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Restrict Type</td>";
									html+="	<td>"+(this.RSCT_TYPE||'')+"</td>";
									html+="</tr>";
									html+="<tr>";
									html+="	<td>Collecting Method</td>";
									html+="	<td>"+(this.COLL_MTHD||'')+"</td>";
									html+="</tr>";
									html+="</table>";
									
									this.WIDTH=500;
									this.HEIGHT=400;
									
									// 커스텀 팝업스타일
									var json = {title:"INCIDENT"
											, content: html
											, data: JSON.stringify(this) };
									var infoTemplate = new esri.InfoTemplate(json);

									dojo.connect(infoTemplate, 'onClick', function(){
//										console.log(370);
									});
									
									graphic.setInfoTemplate(infoTemplate);
									map.graphics.add(graphic);
								});
							}
						});
						break;
						
					case 'cctv':
						map.infoWindow.hide();
						map.graphics.clear();
						$.ajax({
							type: 'POST',
							url: '/ajax-cctv',
							data: {
								'empty' : ''
							},
							dataType:"json",
							success: function(req) {
//								console.log( 271, req );
								
								$(req).each(function(id){

									var pt = (new esri.geometry.Point( this.LON, this.LAT ));

									var defaultSymbol = new esri.symbol.PictureMarkerSymbol( '/images/icon-cctv.png', 17, 16);
									defaultSymbol.setOffset(0, 17);
									var graphic = new esri.Graphic(pt, defaultSymbol);
									
									this.WIDTH=430;
									this.HEIGHT=400;
									
									// 커스텀 팝업스타일
									var json = {title:"CCTV - "+ this.ID
											, content: "<span id='gallery'>Loading ...</span>"
											, data: JSON.stringify(this) };
									var infoTemplate = new esri.InfoTemplate(json);
									
									graphic.setInfoTemplate(infoTemplate);
									map.graphics.add(graphic);
								});
							}
						});
						break;
					
					case 'publicTraffic':
//						if ( !mobile ){
//							alert('This service is available from the mobile.');
//							return;
//						}
						map.infoWindow.hide();
						map.graphics.clear();
						
						var html = "";
						html += "<table width='100%' border class='layer'>";
						html += "<cols width='20%'/>";
						html += "<cols width='*'/>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer0==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"0\",bool:this.checked});'> </td>";
						html += "	<td>Terminal</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer1==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"1\",bool:this.checked});'> </td>";
						html += "	<td>Halte</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer2==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"2\",bool:this.checked});'> </td>";
						html += "	<td>Rute Elang-Jatinangor</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer3==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"3\",bool:this.checked});'> </td>";
						html += "	<td>Rute Jatinangor-Elang</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer4==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"4\",bool:this.checked});'> </td>";
						html += "	<td>Rute Alun-Alun-Ciburuy</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer5==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"5\",bool:this.checked});'> </td>";
						html += "	<td>Rute Ciburuy-Alun-Alun</td>";
						html += "</tr>";
						html += "<tr>";
						html += "	<td><input type='checkbox' "+ (layers.layer6==1?"checked":"") +" onclick='toggle(\"publictraffic\",false,{layerId:\"6\",bool:this.checked});'> </td>";
						html += "	<td>Rute Ciburuy-Alun-Alun</td>";
						html += "</tr>";
						html += "</table>";

						dijit.registry.byId("dialog").setContent( html );
						dijit.registry.byId("dialog").show();
						
						break;
						
					case 'publictraffic':
						
						if ( obj.layerId==0 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer0 );
								layers.layer0 = 1;
							}else{
								map.removeLayer( layer_set.layer0 );
								layers.layer0 = 0;
							}
						}else if ( obj.layerId==1 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer1 );
								layers.layer1 = 1;
							}else{
								map.removeLayer( layer_set.layer1 );
								layers.layer1 = 0;
							}
						}else if ( obj.layerId==2 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer2 );
								layers.layer2 = 1;
							}else{
								map.removeLayer( layer_set.layer2 );
								layers.layer2 = 0;
							}
						}else if ( obj.layerId==3 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer3 );
								layers.layer3 = 1;
							}else{
								map.removeLayer( layer_set.layer3 );
								layers.layer3 = 0;
							}
						}else if ( obj.layerId==4 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer4 );
								layers.layer4 = 1;
							}else{
								map.removeLayer( layer_set.layer4 );
								layers.layer4 = 0;
							}
						}else if ( obj.layerId==5 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer5 );
								layers.layer5 = 1;
							}else{
								map.removeLayer( layer_set.layer5 );
								layers.layer5 = 0;
							}
						}else if ( obj.layerId==6 ){
							if( obj.bool ){
								map.addLayer( layer_set.layer6 );
								layers.layer6 = 1;
							}else{
								map.removeLayer( layer_set.layer6 );
								layers.layer6 = 0;
							}
						}
						
						break;
						
					case 'Traffic':
//						console.log(335, map.extent.getCenter() );
						
						var a = esri.geometry.webMercatorToGeographic(map.extent);
						var center = map.extent.getCenter(); //a.getCenter();
						center = a.getCenter();
						var p = window.open('/main-gmap?lat='+center.y+'&lng='+center.x+'&zoom='+map.getLevel(), 'pp', 'width=700, height=700');

//						if (glay) {
//			                glay.setMap(null);
//			                glOverlays[name]=null;
//			            } else {
//			                var clz = eval('google.maps.'+ name +'Layer');
//			                glay = new clz();
//			                glay.setMap(gmap);
//			                glOverlays[name] = glay;
//			            }
			            break;
						
					case 'test':
						var drawingManager = googleLayer.getDrawManager();
						drawingManager.setMap(gmap);
						glOverlays[name] = drawingManager;
						$(".gmnoprint div:eq(2) div").click();
						break;
			    }
			}
			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			function initialize() {
				initTOC();
				
				// 거리측정 기본 라이브러리 구동시키기
				measurement = new esri.dijit.Measurement({
					map : map,
					defaultAreaUnit : esri.Units.SQUARE_KILOMETERS,
					defaultLengthUnit : esri.Units.KILOMETERS
				}, dojo.byId('measurementDiv'));
				measurement.startup();
				
				$(window).resize(function() {
					resizeLayout();
				});
				resizeLayout();
				
				

				var rute_busLayer0 = new esri.layers.FeatureLayer(arcgisurl_rute_bus0, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});

				var content = "" +
                  "<br><b>Name</b>: ${Nama_Halte}" +
                  "<br>";
		        var infoTemplate = new esri.InfoTemplate({title:'Halte', content: content});

		        var rute_busLayer1 = new esri.layers.FeatureLayer(arcgisurl_rute_bus1, {
					mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
					infoTemplate: infoTemplate,
					outFields : [ "*" ]
				});

				var rute_busLayer2 = new esri.layers.FeatureLayer(arcgisurl_rute_bus2, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});

				var rute_busLayer3 = new esri.layers.FeatureLayer(arcgisurl_rute_bus3, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});

				var rute_busLayer4 = new esri.layers.FeatureLayer(arcgisurl_rute_bus4, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});

				var rute_busLayer5 = new esri.layers.FeatureLayer(arcgisurl_rute_bus5, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});

				var url1 = "http://adonescm.ddns.net:46080/arcgis/rest/services/irodco/geom/MapServer/0";
				var url1s = new esri.layers.FeatureLayer(url1, {
					mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
					outFields : [ "*" ]
				});
				
				layer_set = { layer0:rute_busLayer0, layer1:rute_busLayer1, layer2:rute_busLayer2
						, layer3:rute_busLayer3, layer4:rute_busLayer4, layer5:rute_busLayer5, layer6: url1s };
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

			function initTOC() {
			    var toc = '';
			    $(".left").append( $("#left").html() );
			    dijit.byId('content').resize();
			}
			
			
			
			
			// 테스트로 구동해본 소스
			function createPrintDijit(app) {
				var layoutTemplate, templateNames, mapOnlyIndex, templates;
			
				// create an array of objects that will be used to create print
				// templates
				var layouts = [ {
					"name" : "Letter ANSI A Landscape",
					"label" : "Landscape",
					"format" : "pdf",
					"options" : {
						"legendLayers" : [], // empty array means no legend
						"scalebarUnit" : "Miles",
						"titleText" : "The Title"
					}
				} ];
			
				// create the print templates, could also use dojo.map
				var templates = [];
				dojo.forEach(layouts, function(lo) {
					var t = new esri.tasks.PrintTemplate();
					t.layout = lo.name;
					t.label = lo.label;
					t.format = lo.format;
					t.layoutOptions = lo.options
					templates.push(t);
				});
			
				app.printer = new esri.dijit.Print({
					"map" : map,
					"templates" : templates,
					url : app.printUrl,
				}, dojo.byId("printButton"));
			
				app.printer.startup();
			
				// fix the print button
				$('#dijit_form_Button_0').css('display', 'inline-block');
				$('#dijit_form_Button_0').css('width', '24');
				$('#dijit_form_Button_0').css('height', '24');
			
				$("#dijit_form_Button_0").prepend( "printer" );
				$("#dijit_form_Button_0_label").text('');
			}
			
			