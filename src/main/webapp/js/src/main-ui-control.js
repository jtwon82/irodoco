
	var MainUiControl = function () {
		    this.obj = new Array();
		    
		    // land mark
		    this.obj_incident = new Array();
		    this.obj_cctv = new Array();
		    
		    // public Traffic
		    this.obj_traffic = new Array();
		    this.icon_layer1 = new Array();
		    this.icon_layer2 = new Array();
		    this.icon_layer3 = new Array();
		    this.icon_layer4 = new Array();
		    this.layer_traffic;
		    this.idset_traffic = {};
		    
		    // Road Info
		    this.layer_rote;
		    this.idset_rote = {};

		    // Hawk Info
		    this.layer_hawk;
		    this.idset_hawk = {};
		    
		    this.is_ready = false;
		    this.click_menu = '';
		    this.list_viewd = false;
		    
		    this.interval = 0;
		    
		    this.evt = new Array();
		    this.layer;
		};
		MainUiControl.prototype = {
			menuClick: function (obj, func) {
				if( !UI.is_ready ){
					return;
				}
				
				// 메뉴버튼 편하게
				if( UI.list_viewd==true && UI.click_menu!=func ){
					UI.menuClick(obj, UI.click_menu);
				}
				if( UI.list_viewd==false ){
					if ( UI.click_menu!='' ){
						return;
					}
					UI.list_viewd = true;
					UI.click_menu = func;
					
					// 버튼 클릭처리
					$(".lt-icon li").each(function( id ){
						$(this).removeClass("lt-icon-active");
						$(this).find(".lt-icon-img img").attr("src", "/images/left_icon"+(id+1)+".png");
					});
					$(obj).addClass("lt-icon-active");
					var click_imgsrc = $(".subcontents .lt-icon-active .lt-icon-img img").attr("src");
					var click_imgsrc0 = click_imgsrc.split(".")[0];
					$(".subcontents .lt-icon-active .lt-icon-img img").attr("src", click_imgsrc0 +"_on.png");
					
					$("#spot ul li").empty();
					
					// 기능구현
					if( func == 'googleTraffic' ){
						var a = esri.geometry.webMercatorToGeographic(map.extent);
						var center = map.extent.getCenter(); //a.getCenter();
						center = a.getCenter();
						var urls = '/main-gmap?lat='+center.y+'&lng='+center.x+'&zoom='+map.getLevel();
						//var p = window.open(urls, 'pp', 'width=700, height=700');
						
						$("#content #map").hide();
						$("#content").append('<iframe src="'+ urls +'" width="100%" id="gmap" height="100%"></iframe>');
						UI.IntervalRun();
						
					}else if ( func == 'incident' ){
						var html = UI.Incident();
						showmap();
						UI.IntervalRun();
						
					}else if ( func == 'cctv' ){
						UI.Cctv();
						showmap();

					}else if ( func == 'publicTraffic' ){
						UI.PublicTraffic();
						showmap();

					}else if ( func == 'roadInfo' ){
						UI.RoteInfo();
						showmap();

					}else if ( func == 'hawkInfo' ){
						UI.HawkInfo();
						showmap();
					}
					
				}else{
					if ( UI.click_menu!=func && UI.list_viewd == true ){
						return;
					}
					UI.list_viewd = false;
					UI.click_menu = '';
					clearInterval(UI.interval);

					var click_imgsrc = $(".subcontents .lt-icon-active .lt-icon-img img").attr("src");
					var click_imgsrc0 = click_imgsrc.split(".")[0].replace("_on","");
					$(".subcontents .lt-icon-active .lt-icon-img img").attr("src", click_imgsrc0 +".png");
					
					$(obj).removeClass("lt-icon-active");
					
					if( func == 'googleTraffic' ){
						$("#content #gmap").remove();
						$("#content #map").show();
						
					}else if( func == 'incident' ){
						showmap();
						map_incident.clear();
						map.graphics.clear();
						map.infoWindow.hide();
						
					}else if ( func == 'cctv' ){
						showmap();
						map_cctv.clear();
						map.graphics.clear();
						map.infoWindow.hide();
						
					}else if ( func == 'publicTraffic' ){
						showmap();
						UI.PublicTrafficLayerAdd({layerId:UI.idset_traffic.keys(), bool:false});
						map.graphics.clear();
						map.infoWindow.hide();
						
					}else if ( func == 'roadInfo' ){
						showmap();
						UI.RoteInfoAdd({layerId:UI.idset_rote.keys(), bool:false, closed:true });
						map.graphics.clear();
						map.infoWindow.hide();
						
					}else if ( func == 'hawkInfo' ){
						showmap();
						
						UI.HawkInfoAdd({layerId:UI.idset_hawk.keys(), bool:false})
						map.graphics.clear();
						map.infoWindow.hide();
						
					}
				}
				
				
				
				
				
				
		    }, IntervalRun : function(){
		    	UI.interval = setInterval(function(){
		    		if ( UI.click_menu=='googleTraffic' ){
		    			$("#content #gmap").remove();
						var a = esri.geometry.webMercatorToGeographic(map.extent);
						var center = map.extent.getCenter(); //a.getCenter();
						center = a.getCenter();
						var urls = '/main-gmap?lat='+center.y+'&lng='+center.x+'&zoom='+map.getLevel();
						$("#content").append('<iframe src="'+ urls +'" width="100%" id="gmap" height="100%"></iframe>');
						
		    		}else if ( UI.click_menu=='incident' ){
						$("#spot ul li").remove();
						$("#spot ul").append("<li>Data Reload...</li>");
						map.graphics.clear();
						map.infoWindow.hide();
		    			setTimeout(function(){
		    				UI.Incident();
			    			setTimeout(function(){
			    				var keys = map_incident.keys();
					    		for( var i=0; i<keys.length; i++){
					    			$("#spot #"+ keys[i].split('_')[1] +" ").click();
					    		}
			    			},500);
		    			},1500);
		    		}
		    	}, 30000);
				
		    	
		    	
		    	
		    	
		    	
		    	
		    	
		    }, Incident : function(){
		    	UI.getData( 'incident', function(){
					$("#spot ul").empty();
					$("#spot ul").append("<div class='deth_tit'>Incident List</div>");
					
					$(UI.obj_incident).each(function( id ){
						var html = "<li><input type='checkbox' onclick='UI.IncidentLayerAdd({layerId:\""+this.ID+"\",bool:this.checked});' id='"+this.ID+"'/> <label for='"+this.ID+"'>"+this.TITLE+"</label></li>";
						$("#spot ul").append(html);
					});
		    	} );
		    }, IncidentLayerAdd : function( o ){
	    		
		    	if ( !o.bool ){
		    		map.graphics.remove( map_incident.get("incident_"+ o.layerId ) );
		    		map_incident.remove('incident_'+ o.layerId);
					map.infoWindow.hide();
		    		return;
		    	}
		    	
		    	var thiss = ''; //UI.obj_incident[ o.layerId ];
		    	UI.obj_incident.forEach(function(element, idx, array){
		    		if( element.ID==o.layerId ){
		    			thiss=element;
		    		}
		    	});
				var pt = (new esri.geometry.Point( thiss.LON, thiss.LAT ));
				var defaultSymbol = new esri.symbol.PictureMarkerSymbol('/images/icon/icon-incident.png',24,24);
				var graphic = new esri.Graphic(pt, defaultSymbol);


				var html = "";
				html+='<table border width="100%">';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">INCIDENT</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+thiss.TITLE+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Incident Type</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.INCI_TYPE||'')+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Incident Kind</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.INCI_KIND||'')+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Latitude</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+thiss.LAT+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Longitude</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+thiss.LON+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">State</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.PRCS_STAT||'')+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Start Time</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+( new Date(thiss.STRT_DT) )+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">End Time</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+( new Date(thiss.END_DT) )+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Serious</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.TRBL_GRADE||'')+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Restrict Type</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.RSCT_TYPE||'')+'</td>';
				html+='</tr>';
				html+='<tr><th align="left" width="75" nowrap="" style="font-size:11px" valign="top">Collecting Method</th>';
				html+='    <th width="10" nowrap="" style="font-size:11px" valign="top">:</th>';
				html+='    <td style="font-size:11px">'+(thiss.COLL_MTHD||'')+'</td>';
				html+='</tr>';
				html+='</table>';
				
				thiss.WIDTH=500;
				thiss.HEIGHT=400;
				
				// 커스텀 팝업스타일
				var json = {title:"INCIDENT"
						, content: html
						, data: JSON.stringify(thiss) };
				var infoTemplate = new esri.InfoTemplate(json);
				graphic.setInfoTemplate(infoTemplate);
				map.graphics.add(graphic);
				
				map_incident.put('incident_'+ o.layerId, graphic);
				
				
				
				
				
		    }, Cctv : function(){
		    	UI.getData( 'cctv', function(){
		    		$("#spot ul").empty();
					$("#spot ul").append("<div class='deth_tit'>CCTV List</div>");
					
					$(UI.obj_cctv).each(function( id ){
						var html = "<li><input type='checkbox' onclick='UI.CctvLayerAdd({layerId:\""+id+"\",bool:this.checked});' id='depth"+id+"'/> <label for='depth"+id+"'>"+this.TITLE+"</label></li>";
						$("#spot ul").append(html);
					});
		    	});
		    }, CctvLayerAdd : function( o ){
	    		
		    	if ( !o.bool ){
		    		map.graphics.remove( map_cctv.get("cctv_"+ o.layerId ) );
		    		map_cctv.remove('cctv_'+ o.layerId);
					map.infoWindow.hide();
		    		return;
		    	}
		    	
		    	var thiss = UI.obj_cctv[ o.layerId ];
		    	var input = $("#spot input:eq("+ o.layerId +")");
				var pt = (new esri.geometry.Point( thiss.LON, thiss.LAT ));
				var defaultSymbol = new esri.symbol.PictureMarkerSymbol( '/images/icon/icon-cctv.png', 24, 24);
				defaultSymbol.setOffset(0, 17);
				var graphic = new esri.Graphic(pt, defaultSymbol);
				
				thiss.WIDTH=430;
				thiss.HEIGHT=400;
				
				// 커스텀 팝업스타일
				var json = {title:"CCTV - "+ thiss.ID
						, content: "<div id='gallery'><img src='/images/icon/progrss.gif'/></div>"
						, data: JSON.stringify(thiss) };
				var infoTemplate = new esri.InfoTemplate(json);
				
				graphic.setInfoTemplate(infoTemplate);
				map.graphics.add(graphic);
				
				map_cctv.put('cctv_'+ o.layerId, graphic);
				
				
				
				
				
				
				
		    }, PublicTraffic : function(){
		    	
		    	if ( !UI.layer_traffic ){
					var content = "" +
	                  "<br><b>Name</b>: ${Nama_Halte} <br>";
			        var infoTemplate = new esri.InfoTemplate({title:'Halte', content: content});
			        
					var rute_busLayer2 = new esri.layers.FeatureLayer(arcgisurl_rute_bus+'/2', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						outFields : [ "*" ]
					});
					
					var rute_busLayer3 = new esri.layers.FeatureLayer(arcgisurl_rute_bus+'/4', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						outFields : [ "*" ]
					});
					
					var rute_busLayer4 = new esri.layers.FeatureLayer(arcgisurl_rute_bus+'/5', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						outFields : [ "*" ]
					});
					
					var rute_busLayer5 = new esri.layers.FeatureLayer(arcgisurl_rute_bus+'/3', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						outFields : [ "*" ]
					});
					
		    		UI.idset_traffic = new Map();
		    		UI.layer_traffic = new Map();
		    		UI.layer_traffic.put(2, rute_busLayer2);
		    		UI.layer_traffic.put(3, rute_busLayer3);
		    		UI.layer_traffic.put(4, rute_busLayer4);
		    		UI.layer_traffic.put(5, rute_busLayer5);
		    	}
				
				var html = "";	// 2, 4, 5, 3
				html += "	<li><input type='checkbox' "+ (UI.idset_traffic.layer2==1?"checked":"") +" onclick='UI.PublicTrafficLayerAdd({layerId:[2],bool:this.checked});' id='depth0'/><label for='depth0'>Rute Elang-Jatinangor</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_traffic.layer3==1?"checked":"") +" onclick='UI.PublicTrafficLayerAdd({layerId:[3],bool:this.checked});' id='depth1'/><label for='depth1'>Rute Jatinangor-Elang</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_traffic.layer4==1?"checked":"") +" onclick='UI.PublicTrafficLayerAdd({layerId:[4],bool:this.checked});' id='depth2'/><label for='depth2'>Rute Alun-Alun-Ciburuy</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_traffic.layer5==1?"checked":"") +" onclick='UI.PublicTrafficLayerAdd({layerId:[5],bool:this.checked});' id='depth3'/><label for='depth3'>Rute Ciburuy-Alun-Alun</label></li>";

	    		$("#spot ul").empty();
				$("#spot ul").append("<div class='deth_tit'>Public Transport</div>");
				$("#spot ul").append( html );
				
		    }, PublicTrafficLayerAdd: function( o ){
		    	
		    	o.layerId.forEach(function(element, index, ar){
		    		layer = UI.layer_traffic.get( element );
		    		
					if( o.bool ){
						map.addLayer( layer );
						UI.idset_traffic.put( element );

						UI.getStationByRote(element, function(){
							$(UI.obj_traffic).each(function(id){
								var thiss = this;
								var pt = (new esri.geometry.Point( thiss.LTTD, thiss.LNGT ));
								var defaultSymbol = new esri.symbol.PictureMarkerSymbol( '/images/icon/icon-bus.png', 24, 24);
								var graphic = new esri.Graphic(pt, defaultSymbol);
								
								graphic.setInfoTemplate( {title:"Halte - "+ thiss.STTN_NAME, content: thiss.STTN_NAME} );
								map.graphics.add(graphic);
								
								if ( element == 2){
									UI.icon_layer1.push( graphic );
									
								}else if ( element == 3){
									UI.icon_layer2.push( graphic );
									
								}else if ( element == 4){
									UI.icon_layer3.push( graphic );
									
								}else if ( element == 5){
									UI.icon_layer4.push( graphic );
									
								}
							});
						});
					}else{
						map.removeLayer( layer );
						UI.idset_traffic.remove( element );
						
						if ( element == 2){
							$(UI.icon_layer1).each(function(id){
					    		map.graphics.remove( this );
							});
							UI.icon_layer1 = new Array();
							
						}else if ( element == 3){
							$(UI.icon_layer2).each(function(id){
					    		map.graphics.remove( this );
							});
							UI.icon_layer2 = new Array();
							
						}else if ( element == 4){
							$(UI.icon_layer3).each(function(id){
					    		map.graphics.remove( this );
							});
							UI.icon_layer3 = new Array();
							
						}else if ( element == 5){
							$(UI.icon_layer4).each(function(id){
					    		map.graphics.remove( this );
							});
							UI.icon_layer4 = new Array();
							
						}
						map.infoWindow.hide();
					}
				
		    	});
	    	
				
				
				
		    }, RoteInfo: function(){
		    	
		    	if ( !UI.layer_rote ){
		    		arcgisurl_sigi1 = new esri.layers.FeatureLayer(arcgisurl_sigi +'/1', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.sigi_1(),
						outFields : [ "*" ]
					});
		    		arcgisurl_sigi2 = new esri.layers.FeatureLayer(arcgisurl_sigi +'/2', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.sigi_2(),
						outFields : [ "*" ]
					});
		    		arcgisurl_sigi3 = new esri.layers.FeatureLayer(arcgisurl_sigi +'/3', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.sigi_3(),
						outFields : [ "*" ]
					});
		    		arcgisurl_sigi4 = new esri.layers.FeatureLayer(arcgisurl_sigi +'/4', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.sigi_4(),
						outFields : [ "*" ]
					});

//					arcgisurl_iri10 = new esri.layers.FeatureLayer(arcgisurl_iri+'/0', {
//						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
//						infoTemplate : PT.iri_0(),
//						outFields : [ "*" ]
//					});
//					arcgisurl_iri11 = new esri.layers.FeatureLayer(arcgisurl_iri+'/1', {
//						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
//						infoTemplate : PT.iri_1(),
//						outFields : [ "*" ]
//					});

					arcgisurl_pata11 = new esri.layers.FeatureLayer(arcgisurl_pata +'/0', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.pata_0(),
						outFields : [ "*" ]
					});
					arcgisurl_pata12 = new esri.layers.FeatureLayer(arcgisurl_pata +'/1', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.pata_0(),
						outFields : [ "*" ]
					});
					
		    		UI.idset_rote = new Map();
		    		UI.layer_rote = new Map();
//		    		UI.layer_rote.put(1, arcgisurl_sigi1);
		    		UI.layer_rote.put(2, arcgisurl_sigi2);
		    		UI.layer_rote.put(3, arcgisurl_sigi3);
		    		UI.layer_rote.put(4, arcgisurl_sigi4);
//		    		UI.layer_rote.put(10, arcgisurl_iri10);
//		    		UI.layer_rote.put(11, arcgisurl_iri11);
		    		UI.layer_rote.put(121, arcgisurl_pata11);
		    		UI.layer_rote.put(122, arcgisurl_pata12);
		    		
		    	}
				
				var html = "";
				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(1)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[1],bool:this.checked,closed:false});' class='road_input' value='1' id='depth0'/><label for='depth0'>Tol Road</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(2)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[2],bool:this.checked,closed:false});' class='road_input' value='2' id='depth1'/><label for='depth1'>National Road</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(3)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[3],bool:this.checked,closed:false});' class='road_input' value='3' id='depth2'/><label for='depth2'>Province Road</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(4)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[4],bool:this.checked,closed:false});' class='road_input' value='4' id='depth3'/><label for='depth3'>Heavy equipment position</label></li>";
//				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(10)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[10],bool:this.checked,closed:false});' id='depth10'/><label for='depth10'>Node(IRI_Province Road)</label></li>";
//				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(11)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[11],bool:this.checked,closed:false});' id='depth11'/><label for='depth11'>Link(Province Road)</label></li>";
				html += "	<li><input type='checkbox' "+ (UI.idset_rote.containsKey(121)?"checked":"") +" onclick='UI.RoteInfoAdd({layerId:[121,122],bool:this.checked,closed:false});' id='depth12'/><label for='depth12'>Indonesia Boundary</label></li>";
				
	    		$("#spot ul").empty();
				$("#spot ul").append("<div class='deth_tit'>Road Info</div>");
				$("#spot ul").append(html);
				
		    }, RoteInfoAdd: function(o){

		    	o.layerId.forEach( function(element, i, a){
		    		road_layer_clicked=false;
		    		
		    		if( element==1 || element==2 || element==3 || element==4 ){
						var road_input = dojo.query(".road_input"), input;
						var visible = [];
						
						if ( o.closed ){
							var road_input = dojo.query(".road_input");
							dojo.forEach(road_input, function(input){
								input.checked = false;
							});
						}
						dojo.forEach(road_input, function(input) {
							if (input.checked) {
								visible.push(input.value);
							}
						});
						if (visible.length === 0) {
							visible.push(-1);
							road_layer_clicked=false;
						}else{
							if( element==4 ){
								road_layer_clicked=false;
							}else{
								road_layer_clicked=true;
							}
						}
						
						road_layer.setVisibleLayers(visible);
	    				dojo.connect(map, "onClick", executeIdentifyTask);
	    			}
			    	layer = UI.layer_rote.get( element );
			    	UI.layer = layer;
			    	
			    	if ( layer==undefined ){
			    		return;
			    	}
			    	
			    	if ( element>100 ){
						if ( element==121 ){
							layer.setLabelingInfo([ new esri.layers.LabelClass({
								"labelExpressionInfo" : {
									"value" : "{NAMA_KAB}"
								},
								"symbol" : symbol
							}) ]);
						}else{
							layer.setLabelingInfo([ new esri.layers.LabelClass({
								"labelExpressionInfo" : {
									"value" : "{NAMA_PROP}"
								},
								"symbol" : symbol
							}) ]);
						}
			    		
			    		UI.evt = new Array();
			    		layer.on("graphic-draw", function(evt) {
			    			var PRVN_NO = evt.graphic.attributes.KODE_PROP;
							UI.evt.push(evt);
							UI.RoteOther1(evt, PRVN_NO);
		                });
			    		$("#legend").show();
			    	}else{
			    		$("#legend").hide();
			    	}
					
			    	if ( o.bool ){
			    		if(layer)	map.addLayer( layer, i );
			    		UI.idset_rote.put( element );
			    	}else{
						if(layer)	map.removeLayer( layer, i );
			    		UI.idset_rote.remove( element );
			    		map.infoWindow.hide();
			    		$("#legend").hide();
			    	}
		    	});
	    	
		    	
		    }, RoteOther2: function(){
		    	UI.evt.forEach(function(evt){
                    var PRVN_NO = evt.graphic.attributes.KODE_PROP;
					UI.RoteOther1(evt, PRVN_NO);
		    	});
		    	
		    }, RoteOther1: function(evt, PRVN_NO){
			    var u = "/ajax-breaks?STTS_DT="+ $("select[name=STTS_DT]").val() +"&PRVN_NO="+ PRVN_NO;
		    	
        		esri.request({
					url : u,
					content : {f : "json"},
					callbackParamName : "callback",
					load : function( req ){
						try{
							var LNGT_NAME = $("select[name=LNGT]").val();
							if( LNGT_NAME=='TOT' ){
								var LNGT = req[0].TOT_LNGT;
							}else if( LNGT_NAME=='NATL' ){
								var LNGT = req[0].NATL_LNGT;
							}else if( LNGT_NAME=='PRVN' ){
								var LNGT = req[0].PRVN_LNGT;
							}else if( LNGT_NAME=='RGNY' ){
								var LNGT = req[0].RGNY_LNGT;
							}
							
						}catch(e){
							var LNGT = 0;
						}
						
	                    if (LNGT < classbreaks[0].value) {
	                    	var category = classbreaks[0].attribute;
	                    } else if (LNGT >= classbreaks[0].value && LNGT < classbreaks[1].value) {
	                    	var category = classbreaks[1].attribute;
	                    } else if (LNGT >= classbreaks[1].value && LNGT < classbreaks[2].value) {
	                    	var category = classbreaks[2].attribute;
	                    } else if (LNGT >= classbreaks[2].value && LNGT < classbreaks[3].value) {
	                    	var category = classbreaks[3].attribute;
	                    } else if (LNGT >= classbreaks[3].value) {
	                    	var category = classbreaks[4].attribute;
//	                    } else if (TOT_LNGT >= classbreaks[4].value && TOT_LNGT < classbreaks[5].value) {
//	                        var category = classbreaks[5].attribute;
//	                    } else if (TOT_LNGT >= classbreaks[5].value && TOT_LNGT < classbreaks[6].value) {
//	                        var category = classbreaks[6].attribute;
//	                    } else if (TOT_LNGT >= classbreaks[6].value && TOT_LNGT < classbreaks[7].value) {
//	                        var category = classbreaks[7].attribute;
//	                    } else if (TOT_LNGT >= classbreaks[7].value && TOT_LNGT < classbreaks[8].value) {
//	                        var category = classbreaks[8].attribute;
//	                    } else if (TOT_LNGT >= classbreaks[8].value) {
//	                        var category = classbreaks[9].attribute;
	                    }
	                    
	                    evt.node.setAttribute("data-classbreak", category);
					},
					error : esriConfig.defaults.io.errorHandler
				});
		    	
		    }, HawkInfo: function(){
		    	if ( !UI.layer_hawk ){
		    		var city_link = new esri.layers.FeatureLayer( arcgisurl_city +'/7', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_7(),
						outFields : [ "*" ]
					});
		    		var city_node = new esri.layers.FeatureLayer( arcgisurl_city +'/0', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_0(),
						outFields : [ "*" ]
					});
		    		var city_node1 = new esri.layers.FeatureLayer( arcgisurl_city +'/1', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_1(),
						outFields : [ "*" ]
					});
		    		var city_node2 = new esri.layers.FeatureLayer( arcgisurl_city +'/2', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_2(),
						outFields : [ "*" ]
					});
		    		var city_node3 = new esri.layers.FeatureLayer( arcgisurl_city +'/3', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_3(),
						outFields : [ "*" ]
					});
		    		var city_node4 = new esri.layers.FeatureLayer( arcgisurl_city +'/4', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_4(),
						outFields : [ "*" ]
					});
		    		var city_node5 = new esri.layers.FeatureLayer( arcgisurl_city +'/5', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_5(),
						outFields : [ "*" ]
					});
		    		var city_node6 = new esri.layers.FeatureLayer( arcgisurl_city +'/6', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_6(),
						outFields : [ "*" ]
					});
		    		
		    		
		    		
		    		var national_link = new esri.layers.FeatureLayer( arcgisurl_national +'/7', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.city_7(),
						outFields : [ "*" ]
					});
		    		var national_node = new esri.layers.FeatureLayer( arcgisurl_national +'/0', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_0(),
						outFields : [ "*" ]
					});
		    		var national_node1 = new esri.layers.FeatureLayer( arcgisurl_national +'/1', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_1(),
						outFields : [ "*" ]
					});
		    		var national_node2 = new esri.layers.FeatureLayer( arcgisurl_national +'/2', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_2(),
						outFields : [ "*" ]
					});
		    		var national_node3 = new esri.layers.FeatureLayer( arcgisurl_national +'/3', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_3(),
						outFields : [ "*" ]
					});
		    		var national_node4 = new esri.layers.FeatureLayer( arcgisurl_national +'/4', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_4(),
						outFields : [ "*" ]
					});
		    		var national_node5 = new esri.layers.FeatureLayer( arcgisurl_national +'/5', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_5(),
						outFields : [ "*" ]
					});
		    		var national_node6 = new esri.layers.FeatureLayer( arcgisurl_national +'/6', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.national_6(),
						outFields : [ "*" ]
					});

		    		var province_link = new esri.layers.FeatureLayer( arcgisurl_province +'/6', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_6(),
						outFields : [ "*" ]
					});
		    		var province_node = new esri.layers.FeatureLayer( arcgisurl_province +'/0', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_0(),
						outFields : [ "*" ]
					});
		    		var province_node1 = new esri.layers.FeatureLayer( arcgisurl_province +'/1', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_1(),
						outFields : [ "*" ]
					});
		    		var province_node2 = new esri.layers.FeatureLayer( arcgisurl_province +'/2', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_2(),
						outFields : [ "*" ]
					});
		    		var province_node3 = new esri.layers.FeatureLayer( arcgisurl_province +'/3', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_3(),
						outFields : [ "*" ]
					});
		    		var province_node4 = new esri.layers.FeatureLayer( arcgisurl_province +'/4', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_4(),
						outFields : [ "*" ]
					});
		    		var province_node5 = new esri.layers.FeatureLayer( arcgisurl_province +'/5', {
						mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
						infoTemplate : PT.province_5(),
						outFields : [ "*" ]
					});
		    		
		    		UI.idset_hawk = new Map();
		    		UI.layer_hawk = new Map();
		    		
		    		var idx=0;
		    		UI.layer_hawk.put(++idx, national_link);
		    		UI.layer_hawk.put(++idx, national_node);
		    		UI.layer_hawk.put(++idx, national_node1);
		    		UI.layer_hawk.put(++idx, national_node2);
		    		UI.layer_hawk.put(++idx, national_node3);
		    		UI.layer_hawk.put(++idx, national_node4);
		    		UI.layer_hawk.put(++idx, national_node5);
		    		UI.layer_hawk.put(++idx, national_node6);
		    		
		    		UI.layer_hawk.put(++idx, province_link);
		    		UI.layer_hawk.put(++idx, province_node);
		    		UI.layer_hawk.put(++idx, province_node1);
		    		UI.layer_hawk.put(++idx, province_node2);
		    		UI.layer_hawk.put(++idx, province_node3);
		    		UI.layer_hawk.put(++idx, province_node4);
		    		UI.layer_hawk.put(++idx, province_node5);
					
		    		UI.layer_hawk.put(++idx, city_link);
		    		UI.layer_hawk.put(++idx, city_node);
		    		UI.layer_hawk.put(++idx, city_node1);
		    		UI.layer_hawk.put(++idx, city_node2);
		    		UI.layer_hawk.put(++idx, city_node3);
		    		UI.layer_hawk.put(++idx, city_node4);
		    		UI.layer_hawk.put(++idx, city_node5);
		    		UI.layer_hawk.put(++idx, city_node6);
		    	}
				
		    	idx=0;
				var html = "";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Link</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node crack</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node geom</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node iri</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node potholes</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node reveling</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>National Node rutacd</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Link</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node crack</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node iri</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node potholes</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node raveling</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>Province Node rutacd</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Link</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node crack</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node geom</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node iri</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node potholes</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node raveling</label></li>";
				html += "	<li class='short'><input type='checkbox' "+ (UI.idset_hawk.containsKey(++idx)?"checked":"") +" onclick='UI.HawkInfoAdd({layerId:["+idx+"],roteId:1,bool:this.checked});' id='depth"+idx+"'/><label for='depth"+idx+"'>City Node rutacd</label></li>";
				
	    		$("#spot ul").empty();
				$("#spot ul").append("<div class='deth_tit'>Hawk-Eye Info</div>");
				$("#spot ul").append(html);
				
		    }, HawkInfoAdd: function(o){

		    	o.layerId.forEach( function(element, i, a){
			    	layer = UI.layer_hawk.get( element );
			    	
			    	if ( o.bool ){
			    		UI.idset_hawk.put( element );
						map.addLayer( layer, 1 );
			    	}else{
			    		UI.idset_hawk.remove( element );
						map.removeLayer( layer );
			    		map.infoWindow.hide();
			    	}
		    	});
	    	
		    	
		    	
		    	
		    	
		    	
		    	
		    	
				
		    	
		    }, getData: function( func, procedure ){
		    	UI.obj_incident = new Array();
		    	UI.obj_cctv = new Array();

				$.ajax({
					type: 'POST',
					url: '/ajax-'+ func,
					data: {
						'empty' : ''
					},
					dataType:"json",
					success: function(req) {
						$(req).each(function(id){
							if( func=='incident' ){
								UI.obj_incident.push( this );
							}else{
								UI.obj_cctv.push( this );
							}
						});
						procedure();
					}
				});
				
		    }, getStationByRote: function( layerId, procedure ){
		    	
		    	var BUS_ROTE_ID;
		    	if( layerId==2 ){
		    		BUS_ROTE_ID = 3;
		    		
		    	}else if( layerId==3 ){
		    		BUS_ROTE_ID = 4;
		    	
		    	}else if( layerId==4 ){
		    		BUS_ROTE_ID = 1;
		    	
		    	}else if( layerId==5 ){
		    		BUS_ROTE_ID = 2;
		    	}
		    	
		    	UI.obj_traffic = new Array();
				$.ajax({
					type: 'POST',
					url: '/ajax-rote',
					data: {
						'empty' : '',
						'BUS_ROTE_ID' : BUS_ROTE_ID
					},
					dataType:"json",
					success: function(req) {
						$(req).each(function(id){
							UI.obj_traffic.push( this );
						});
						procedure();
					}
				});
		    }
		}; var UI = new MainUiControl();
	
	




		var PopupTemplateSet = function () {};
		PopupTemplateSet.prototype = {
			sigi_1 : function () {
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{OBJECTID}]",
	    			fieldInfos: [
						{fieldName:"OBJECTID", visible:true, label:"OBJECTID"},
						{fieldName:"OBJECTID_1", visible:true, label:"OBJECTID_1"},
						{fieldName:"NAMA", visible:true, label:"NAMA"},
						{fieldName:"PANJANG", visible:true, label:"PANJANG"},
						{fieldName:"PENGELOLA", visible:true, label:"PENGELOLA"},
						{fieldName:"STATUS", visible:true, label:"STATUS"},
						{fieldName:"ID_TARIF", visible:true, label:"ID_TARIF"},
						{fieldName:"KABUPATEN", visible:true, label:"KABUPATEN"},
						{fieldName:"PROPINSI", visible:true, label:"PROPINSI"},
						{fieldName:"Shape_Leng", visible:true, label:"Shape_Leng"},
						{fieldName:"Shape_Le_1", visible:true, label:"Shape_Le_1"},
						{fieldName:"SHAPE", visible:true, label:"SHAPE"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, sigi_2 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{OBJECTID}]",
	    			fieldInfos: [
						{fieldName:"OBJECTID", visible:true, label:"OBJECTID"},
						{fieldName:"PANJANG", visible:true, label:"PANJANG"},
						{fieldName:"RUAS", visible:true, label:"RUAS"},
						{fieldName:"STATUS", visible:true, label:"STATUS"},
						{fieldName:"FUNCT", visible:true, label:"FUNCT"},
						{fieldName:"LENGTH", visible:true, label:"LENGTH"},
						{fieldName:"MST10", visible:true, label:"MST10"},
						{fieldName:"RCSYR", visible:true, label:"RCSYR"},
						{fieldName:"LINKNAME", visible:true, label:"LINKNAME"},
						{fieldName:"MST", visible:true, label:"MST"},
						{fieldName:"PROVINSI", visible:true, label:"PROVINSI"},
						{fieldName:"Shape", visible:true, label:"Shape"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, sigi_3 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{OBJECTID}]",
	    			fieldInfos: [
						{fieldName:"OBJECTID_12", visible:true, label:"OBJECTID_12"},
						{fieldName:"OBJECTID_1", visible:true, label:"OBJECTID_1"},
						{fieldName:"OBJECTID", visible:true, label:"OBJECTID"},
						{fieldName:"KEYIRMS", visible:true, label:"KEYIRMS"},
						{fieldName:"NOMOR", visible:true, label:"NOMOR"},
						{fieldName:"FUNGSI", visible:true, label:"FUNGSI"},
						{fieldName:"STATUS", visible:true, label:"STATUS"},
						{fieldName:"RUAS", visible:true, label:"RUAS"},
						{fieldName:"PANJANG", visible:true, label:"PANJANG"},
						{fieldName:"KODEPROV", visible:true, label:"KODEPROV"},
						{fieldName:"PROVINSI", visible:true, label:"PROVINSI"},
						{fieldName:"LIN_PU_SUM", visible:true, label:"LIN_PU_SUM"},
						{fieldName:"LINTAS_3", visible:true, label:"LINTAS_3"},
						{fieldName:"X_COORD", visible:true, label:"X_COORD"},
						{fieldName:"Y_COORD", visible:true, label:"Y_COORD"},
						{fieldName:"NAMA_SK", visible:true, label:"NAMA_SK"},
						{fieldName:"PJG_SK", visible:true, label:"PJG_SK"},
						{fieldName:"STAT09", visible:true, label:"STAT09"},
						{fieldName:"KONDISI", visible:true, label:"KONDISI"},
						{fieldName:"SHAPE_LENG", visible:true, label:"SHAPE_LENG"},
						{fieldName:"VIDEO", visible:true, label:"VIDEO"},
						{fieldName:"Shape", visible:true, label:"Shape"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, sigi_4 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{OBJECTID}]",
	    			fieldInfos: [
						{fieldName:"OBJECTID", visible:true, label:"OBJECTID"},
						{fieldName:"ID", visible:true, label:"ID"},
						{fieldName:"BALAI", visible:true, label:"BALAI"},
						{fieldName:"SATKER", visible:true, label:"SATKER"},
						{fieldName:"PROVINSI", visible:true, label:"PROVINSI"},
						{fieldName:"JENIS_ALAT", visible:true, label:"JENIS_ALAT"},
						{fieldName:"JUMLAH", visible:true, label:"JUMLAH"},
						{fieldName:"LOKASI", visible:true, label:"LOKASI"},
						{fieldName:"LINTANG", visible:true, label:"LINTANG"},
						{fieldName:"BUJUR", visible:true, label:"BUJUR"},
						{fieldName:"Shape", visible:true, label:"Shape"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, iri_0 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{FID}]",
	    			fieldInfos: [
						{fieldName:"FID", visible:true, label:"FID"},
						{fieldName:"Shape", visible:true, label:"Shape"},
						{fieldName:"ID", visible:true, label:"ID"},
						{fieldName:"Section", visible:true, label:"Section"},
						{fieldName:"Chainage__", visible:true, label:"Chainage__"},
						{fieldName:"Sub_Chaina", visible:true, label:"Sub_Chaina"},
						{fieldName:"IRI_Right", visible:true, label:"IRI_Right"},
						{fieldName:"IRI_Left", visible:true, label:"IRI_Left"},
						{fieldName:"IRI_Avg", visible:true, label:"IRI_Avg"},
						{fieldName:"IRI_Lane", visible:true, label:"IRI_Lane"},
						{fieldName:"IRI_Centre", visible:true, label:"IRI_Centre"},
						{fieldName:"HATI_Right", visible:true, label:"HATI_Right"},
						{fieldName:"HATI_Left", visible:true, label:"HATI_Left"},
						{fieldName:"HATI_Avg", visible:true, label:"HATI_Avg"},
						{fieldName:"RN_Right", visible:true, label:"RN_Right"},
						{fieldName:"RN_Left", visible:true, label:"RN_Left"},
						{fieldName:"RN_Avg", visible:true, label:"RN_Avg"},
						{fieldName:"NAASRA", visible:true, label:"NAASRA"},
						{fieldName:"Bump_Int", visible:true, label:"Bump_Int"},
						{fieldName:"IRI_Righ_1", visible:true, label:"IRI_Righ_1"},
						{fieldName:"IRI_Righ_2", visible:true, label:"IRI_Righ_2"},
						{fieldName:"IRI_Left_A", visible:true, label:"IRI_Left_A"},
						{fieldName:"IRI_Left_S", visible:true, label:"IRI_Left_S"},
						{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
						{fieldName:"Latitude__", visible:true, label:"Latitude__"},
						{fieldName:"Longitude", visible:true, label:"Longitude"},
						{fieldName:"Altitude__", visible:true, label:"Altitude__"},
						{fieldName:"GPS_positi", visible:true, label:"GPS_positi"},
						{fieldName:"Events", visible:true, label:"Events"},
						{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
						{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
						{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
						{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
						{fieldName:"Operator_N", visible:true, label:"Operator_N"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, iri_1 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "Title [{FID}]",
	    			fieldInfos: [
						{fieldName:"FID", visible:true, label:"FID"},
						{fieldName:"Shape", visible:true, label:"Shape"},
						{fieldName:"Start_X", visible:true, label:"Start_X"},
						{fieldName:"Start_Y", visible:true, label:"Start_Y"},
						{fieldName:"End_X", visible:true, label:"End_X"},
						{fieldName:"End_Y", visible:true, label:"End_Y"},
						{fieldName:"ID", visible:true, label:"ID"},
						{fieldName:"Start_Node", visible:true, label:"Start_Node"},
						{fieldName:"End_Node", visible:true, label:"End_Node"}
	    			],
	    			showAttachments: true,
	    			'':''});
			}, pata_0 : function(){
				return new esri.dijit.PopupTemplate({
	    			"info": "Title [{FID}]",
	    			fieldInfos: [
						{fieldName:"FID", visible:true, label:"FID"},
						{fieldName:"KODE_KAB", visible:true, label:"KODE_KAB"},
						{fieldName:"NAMA_KAB", visible:true, label:"NAMA_KAB"},
						{fieldName:"KODE_PROP", visible:true, label:"KODE_PROP"},
						{fieldName:"NAMA_PROP", visible:true, label:"NAMA_PROP"},
						{fieldName:"TEST_PCT", visible:false, label:"TEST_PCT"}
	    			],
	    			'':''});
			}, city_7 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
						{fieldName:"FID", visible:true, label:"FID"},
						{fieldName:"Shape", visible:true, label:"Shape"},
						{fieldName:"SNODE_LON", visible:true, label:"SNODE_LON"},
						{fieldName:"SNODE_LAT", visible:true, label:"SNODE_LAT"},
						{fieldName:"ENODE_LON", visible:true, label:"ENODE_LON"},
						{fieldName:"ENODE_LAT", visible:true, label:"ENODE_LAT"},
						{fieldName:"LINK_ID", visible:true, label:"LINK_ID"},
						{fieldName:"LINK_TYPE", visible:true, label:"LINK_TYPE"},
						{fieldName:"SNODE_ID", visible:true, label:"SNODE_ID"},
						{fieldName:"ENODE_ID", visible:true, label:"ENODE_ID"}
					], showAttachments: true, '':''});
			}, city_0 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
						{fieldName:"FID", visible:true, label:"FID"},
						{fieldName:"Shape", visible:true, label:"Shape"},
						{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
						{fieldName:"NODE_TYPE", visible:true, label:"NODE_TYPE"},
						{fieldName:"Section", visible:true, label:"Section"},
						{fieldName:"Chainage__", visible:true, label:"Chainage__"},
						{fieldName:"Sub_Chaina", visible:true, label:"Sub_Chaina"},
						{fieldName:"Latitude__", visible:true, label:"Latitude__"},
						{fieldName:"Longitude", visible:true, label:"Longitude"},
						{fieldName:"Altitude__", visible:true, label:"Altitude__"}
					], showAttachments: true, '':''});
			}, city_1 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
	    			    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "Cracking_R", visible: true, label: "Cracking_R"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_2 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "Grade____", visible: true, label: "Grade____"},
						{fieldName: "Cross_Slop", visible: true, label: "Cross_Slop"},
						{fieldName: "Horizontal", visible: true, label: "Horizontal"},
						{fieldName: "Vertical_C", visible: true, label: "Vertical_C"},
						{fieldName: "XPos__km_", visible: true, label: "XPos__km_"},
						{fieldName: "YPos__km_", visible: true, label: "YPos__km_"},
						{fieldName: "ZPos__km_", visible: true, label: "ZPos__km_"},
						{fieldName: "RF__m_km_", visible: true, label: "RF__m_km_"},
						{fieldName: "NUM_RFS__1", visible: true, label: "NUM_RFS__1"},
						{fieldName: "CURVATURE", visible: true, label: "CURVATURE"},
						{fieldName: "Cross_Sl_1", visible: true, label: "Cross_Sl_1"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_3 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "IRI_Right", visible: true, label: "IRI_Right"},
						{fieldName: "IRI_Left", visible: true, label: "IRI_Left"},
						{fieldName: "IRI_Avg", visible: true, label: "IRI_Avg"},
						{fieldName: "IRI_Lane", visible: true, label: "IRI_Lane"},
						{fieldName: "IRI_Righ_1", visible: true, label: "IRI_Righ_1"},
						{fieldName: "IRI_Righ_2", visible: true, label: "IRI_Righ_2"},
						{fieldName: "IRI_Left_A", visible: true, label: "IRI_Left_A"},
						{fieldName: "IRI_Left_S", visible: true, label: "IRI_Left_S"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_4 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "Number_Pot", visible: true, label: "Number_Pot"},
						{fieldName: "Average_Ma", visible: true, label: "Average_Ma"},
						{fieldName: "Severity", visible: true, label: "Severity"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_5 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "Ravelling", visible: true, label: "Ravelling"},
						{fieldName: "Road_Poros", visible: true, label: "Road_Poros"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_6 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName: "FID", visible: true, label: "FID"},
						{fieldName: "Shape", visible: true, label: "Shape"},
						{fieldName: "NODE_ID", visible: true, label: "NODE_ID"},
						{fieldName: "Latitude__", visible: true, label: "Latitude__"},
						{fieldName: "Longitude", visible: true, label: "Longitude"},
						{fieldName: "Rut_Right", visible: true, label: "Rut_Right"},
						{fieldName: "Rut_Left__", visible: true, label: "Rut_Left__"},
						{fieldName: "Width_Righ", visible: true, label: "Width_Righ"},
						{fieldName: "Width_Left", visible: true, label: "Width_Left"},
						{fieldName: "Cross_Sect", visible: true, label: "Cross_Sect"},
						{fieldName: "Cross_Se_1", visible: true, label: "Cross_Se_1"},
						{fieldName: "Rut_Lane__", visible: true, label: "Rut_Lane__"},
						{fieldName: "Predominan", visible: true, label: "Predominan"},
						{fieldName: "Predomin_1", visible: true, label: "Predomin_1"},
						{fieldName: "Rut_Righ_1", visible: true, label: "Rut_Righ_1"},
						{fieldName: "Rut_Righ_2", visible: true, label: "Rut_Righ_2"},
						{fieldName: "Rut_Left_A", visible: true, label: "Rut_Left_A"},
						{fieldName: "Rut_Left_S", visible: true, label: "Rut_Left_S"},
						{fieldName: "Rut_Lane_A", visible: true, label: "Rut_Lane_A"},
						{fieldName: "Rut_Lane_S", visible: true, label: "Rut_Lane_S"},
						{fieldName: "Speed__km_", visible: true, label: "Speed__km_"},
						{fieldName: "Events", visible: true, label: "Events"},
						{fieldName: "Survey_Day", visible: true, label: "Survey_Day"},
						{fieldName: "Survey_Tim", visible: true, label: "Survey_Tim"},
						{fieldName: "Survey_Nam", visible: true, label: "Survey_Nam"},
						{fieldName: "Vehicle_Na", visible: true, label: "Vehicle_Na"},
						{fieldName: "Operator_N", visible: true, label: "Operator_N"}
					], showAttachments: true, '':''});
			}, city_7 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					    {fieldName:"FID" , visible: true, label: "FID" },
						{fieldName:"Shape" , visible: true, label: "Shape" },
						{fieldName:"SNODE_LON" , visible: true, label: "SNODE_LON" },
						{fieldName:"SNODE_LAT" , visible: true, label: "SNODE_LAT" },
						{fieldName:"ENODE_LON" , visible: true, label: "ENODE_LON" },
						{fieldName:"ENODE_LAT" , visible: true, label: "ENODE_LAT" },
						{fieldName:"LINK_ID" , visible: true, label: "LINK_ID" },
						{fieldName:"LINK_TYPE" , visible: true, label: "LINK_TYPE" },
						{fieldName:"SNODE_ID" , visible: true, label: "SNODE_ID" },
						{fieldName:"ENODE_ID" , visible: true, label: "ENODE_ID" }
					], showAttachments: true, '':''});
			}, national_0 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
    				{fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"NODE_TYPE", visible:true, label:"NODE_TYPE"},
					{fieldName:"Section", visible:true, label:"Section"},
					{fieldName:"Chainage__", visible:true, label:"Chainage__"},
					{fieldName:"Sub_Chaina", visible:true, label:"Sub_Chaina"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude ", visible:true, label:"Longitude "},
					{fieldName:"Altitude__", visible:true, label:"Altitude__"}
    			], showAttachments: true, '':''});
			}, national_1 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude ", visible:true, label:"Longitude "},
					{fieldName:"Cracking_R", visible:true, label:"Cracking_R"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, national_2 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName: "FID", visible: true, label: "FID"},
					{fieldName:"YPos__km_", visible:true, label:"YPos__km_"},
					{fieldName:"ZPos__km_", visible:true, label:"ZPos__km_"},
					{fieldName:"RF__m_km_", visible:true, label:"RF__m_km_"},
					{fieldName:"NUM_RFS__1", visible:true, label:"NUM_RFS__1"},
					{fieldName:"CURVATURE", visible:true, label:"CURVATURE"},
					{fieldName:"Cross_Sl_1", visible:true, label:"Cross_Sl_1"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, national_3 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"IRI_Avg", visible:true, label:"IRI_Avg"},
					{fieldName:"IRI_Lane", visible:true, label:"IRI_Lane"},
					{fieldName:"IRI_Righ_1", visible:true, label:"IRI_Righ_1"},
					{fieldName:"IRI_Righ_2", visible:true, label:"IRI_Righ_2"},
					{fieldName:"IRI_Left_A", visible:true, label:"IRI_Left_A"},
					{fieldName:"IRI_Left_S", visible:true, label:"IRI_Left_S"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, national_4 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Number_Pot", visible:true, label:"Number_Pot"},
					{fieldName:"Average_Ma", visible:true, label:"Average_Ma"},
					{fieldName:"Severity", visible:true, label:"Severity"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, national_5 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Ravelling", visible:true, label:"Ravelling"},
					{fieldName:"Road_Poros", visible:true, label:"Road_Poros"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, national_6 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
					{fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Rut_Right", visible:true, label:"Rut_Right"},
					{fieldName:"Rut_Left__", visible:true, label:"Rut_Left__"},
					{fieldName:"Width_Righ", visible:true, label:"Width_Righ"},
					{fieldName:"Width_Left", visible:true, label:"Width_Left"},
					{fieldName:"Cross_Sect", visible:true, label:"Cross_Sect"},
					{fieldName:"Cross_Se_1", visible:true, label:"Cross_Se_1"},
					{fieldName:"Rut_Lane__", visible:true, label:"Rut_Lane__"},
					{fieldName:"Predominan", visible:true, label:"Predominan"},
					{fieldName:"Predomin_1", visible:true, label:"Predomin_1"},
					{fieldName:"Rut_Righ_1", visible:true, label:"Rut_Righ_1"},
					{fieldName:"Rut_Righ_2", visible:true, label:"Rut_Righ_2"},
					{fieldName:"Rut_Left_A", visible:true, label:"Rut_Left_A"},
					{fieldName:"Rut_Left_S", visible:true, label:"Rut_Left_S"},
					{fieldName:"Rut_Lane_A", visible:true, label:"Rut_Lane_A"},
					{fieldName:"Rut_Lane_S", visible:true, label:"Rut_Lane_S"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
    			], showAttachments: true, '':''});
			}, province_6 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"SNODE_LON", visible:true, label:"SNODE_LON"},
					{fieldName:"SNODE_LAT", visible:true, label:"SNODE_LAT"},
					{fieldName:"ENODE_LON", visible:true, label:"ENODE_LON"},
					{fieldName:"ENODE_LAT", visible:true, label:"ENODE_LAT"},
					{fieldName:"LINK_ID", visible:true, label:"LINK_ID"},
					{fieldName:"LINK_TYPE", visible:true, label:"LINK_TYPE"},
					{fieldName:"SNODE_ID", visible:true, label:"SNODE_ID"},
					{fieldName:"ENODE_ID", visible:true, label:"ENODE_ID"}
				], showAttachments: true, '':''});
			}, province_0 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"NODE_TYPE", visible:true, label:"NODE_TYPE"},
					{fieldName:"Section", visible:true, label:"Section"},
					{fieldName:"Chainage__", visible:true, label:"Chainage__"},
					{fieldName:"Sub_Chaina", visible:true, label:"Sub_Chaina"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Altitude__", visible:true, label:"Altitude__"}
				], showAttachments: true, '':''});
			}, province_1 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Cracking_R", visible:true, label:"Cracking_R"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, province_2 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"IRI_Right", visible:true, label:"IRI_Right"},
					{fieldName:"IRI_Left", visible:true, label:"IRI_Left"},
					{fieldName:"IRI_Avg", visible:true, label:"IRI_Avg"},
					{fieldName:"IRI_Lane", visible:true, label:"IRI_Lane"},
					{fieldName:"IRI_Righ_1", visible:true, label:"IRI_Righ_1"},
					{fieldName:"IRI_Righ_2", visible:true, label:"IRI_Righ_2"},
					{fieldName:"IRI_Left_A", visible:true, label:"IRI_Left_A"},
					{fieldName:"IRI_Left_S", visible:true, label:"IRI_Left_S"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, province_3 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Number_Pot", visible:true, label:"Number_Pot"},
					{fieldName:"Average_Ma", visible:true, label:"Average_Ma"},
					{fieldName:"Severity", visible:true, label:"Severity"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, province_4 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Ravelling", visible:true, label:"Ravelling"},
					{fieldName:"Road_Poros", visible:true, label:"Road_Poros"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}, province_5 : function(){
				return new esri.dijit.PopupTemplate({
	    			"title": "FID [{FID}]", fieldInfos: [
				    {fieldName:"FID", visible:true, label:"FID"},
					{fieldName:"Shape", visible:true, label:"Shape"},
					{fieldName:"NODE_ID", visible:true, label:"NODE_ID"},
					{fieldName:"Latitude__", visible:true, label:"Latitude__"},
					{fieldName:"Longitude", visible:true, label:"Longitude"},
					{fieldName:"Rut_Right", visible:true, label:"Rut_Right"},
					{fieldName:"Rut_Left__", visible:true, label:"Rut_Left__"},
					{fieldName:"Width_Righ", visible:true, label:"Width_Righ"},
					{fieldName:"Width_Left", visible:true, label:"Width_Left"},
					{fieldName:"Cross_Sect", visible:true, label:"Cross_Sect"},
					{fieldName:"Cross_Se_1", visible:true, label:"Cross_Se_1"},
					{fieldName:"Rut_Lane__", visible:true, label:"Rut_Lane__"},
					{fieldName:"Predominan", visible:true, label:"Predominan"},
					{fieldName:"Predomin_1", visible:true, label:"Predomin_1"},
					{fieldName:"Rut_Righ_1", visible:true, label:"Rut_Righ_1"},
					{fieldName:"Rut_Righ_2", visible:true, label:"Rut_Righ_2"},
					{fieldName:"Rut_Left_A", visible:true, label:"Rut_Left_A"},
					{fieldName:"Rut_Lane_A", visible:true, label:"Rut_Lane_A"},
					{fieldName:"Rut_Left_S", visible:true, label:"Rut_Left_S"},
					{fieldName:"Rut_Lane_S", visible:true, label:"Rut_Lane_S"},
					{fieldName:"Speed__km_", visible:true, label:"Speed__km_"},
					{fieldName:"Events", visible:true, label:"Events"},
					{fieldName:"Survey_Day", visible:true, label:"Survey_Day"},
					{fieldName:"Survey_Tim", visible:true, label:"Survey_Tim"},
					{fieldName:"Survey_Nam", visible:true, label:"Survey_Nam"},
					{fieldName:"Vehicle_Na", visible:true, label:"Vehicle_Na"},
					{fieldName:"Operator_N", visible:true, label:"Operator_N"}
				], showAttachments: true, '':''});
			}
		};var PT = new PopupTemplateSet();
		