<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML>
	<html>
		<head>
			<title></title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900' rel='stylesheet' type='text/css'>
			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		

			
        <script type="text/javascript">
			// 구글맵 라이브러리, jquery 라이브러리 로드
			var gis_path = '/js/src';
			var djConfig = {
			    parseOnLoad: true,
			    packages: [
				{
			        "name": "agsjs",
			        "location": gis_path +'/agsjs'
			    },
			    {
			        "name": "esriES",
			        "location": gis_path +'/esriES'
			    },
			    {
			        "name": "gmaps",
			        "location": gis_path +'/gmaps'
                }
                ]
			};

			var arcgisurl_rute_bus = '${arcgisurl_rute_bus}';
			var arcgisurl_iri = '${arcgisurl_iri}';
			var arcgisurl_sigi = '${arcgisurl_sigi}';
			var arcgisurl_city = '${arcgisurl_city}';
			var arcgisurl_province = '${arcgisurl_province}';
			var arcgisurl_national = '${arcgisurl_national}';
			var arcgisurl_pata = '${arcgisurl_pata}';
			
        </script>
		<link rel="stylesheet" href="//js.arcgis.com/3.18/dijit/themes/claro/claro.css" />
		<link rel="stylesheet" href="//js.arcgis.com/3.18/esri/css/esri.css" />
		<link rel="stylesheet" href="//js.arcgis.com/3.18/esri/themes/calcite/dijit/calcite.css">
		<link rel="stylesheet" href="//js.arcgis.com/3.18/esri/themes/calcite/esri/esri.css">
		<script src="//js.arcgis.com/3.18/"></script>
        
        <script type="text/javascript" src='/js/src/main-arcgis.js?st=${ random }'></script>
        <script type="text/javascript" src='/js/src/main-ui-control.js?st=${ random }'></script>
		<script type="text/javascript" src="/js/src/common.js?st=${ random }"></script>
        <script type="text/javascript" src="/js/player/jwplayer.js"></script>
		<script type="text/javascript">jwplayer.key="mkMbCfvoyQF92pS9SCse47lYfk+8L7RlFGgaEe6o5r8=";</script>
		
        <link href="/js/src/main.css?st=${ random }" type="text/css" rel="stylesheet"/>
		<link href="/css/style.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
		<link href="/css/type.css" rel="stylesheet" type="text/css" media="all" />
		
		</head>

		<body class="irodco claro">
			
			<c:set var="menu" value="main" scope="request"/>
			<jsp:include page="inc_header.jsp" flush="true" ></jsp:include>
			
			<!-- sub subcontents -->
			<div class="subcontents">
				<div class="lt-area"  style="position:relative" >
					<ul class="lt-icon"><!-- lt-icon lt-icon-active -->
						<li class="googleTraffic" onclick="UI.menuClick(this,'googleTraffic');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon1.png"></p>
									<p class="lt-icon-txt"><spring:message code="menu.name.map.trffic"/></p>
							</a>
						</li>
						<li class="incident" onclick="UI.menuClick(this,'incident');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon2.png"></p>
									<p class="lt-icon-txt"><spring:message code="menu.name.map.incident"/></p>
							</a>
						</li>
						<li class="cctv" onclick="UI.menuClick(this,'cctv');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon3.png"></p>
									<p class="lt-icon-txt">CCTV</p>
							</a>
						</li>
						<li class="publicTraffic" onclick="UI.menuClick(this,'publicTraffic');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon4.png"></p>
									<p class="lt-icon-txt"><spring:message code="menu.name.map.transport"/></p>
							</a>
						</li>
						<li class="roadInfo" onclick="UI.menuClick(this,'roadInfo');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon5.png"></p>
									<p class="lt-icon-txt"><spring:message code="menu.name.map.road"/></p>
							</a>
						</li>
						<li class="hawkInfo" onclick="UI.menuClick(this,'hawkInfo');">
							<a href="javascript:;">
									<p class="lt-icon-img"><img src="/images/left_icon6.png"></p>
									<p class="lt-icon-txt"><spring:message code="menu.name.map.hawk"/></p>
							</a>
						</li>
					</ul>
				</div>
				<div class="rt-area" >
					<div id="content" dojotype="dijit.layout.BorderContainer" design="headline" gutters="true" style="width:100%;height:100%;">

						<div id="map" dojotype="dijit.layout.ContentPane" region="center">
							<div style="position: absolute; right: 20px; top: 10px; z-Index: 999;">
								<div id="titlePane" data-dojo-type="dijit/TitlePane"
									style='width: 200px;'
									data-dojo-props="title:'Measurement', closable: false, open: false">
									<div id="measurementDiv"></div>
								</div>
							</div>
							
							<div id="popup1" class="popup" style="display:none;">
								<ul><li>title</li><li><a href="javascript:;" onclick="closePopup();">X</a></li></ul>
							</div>
							<div id="mappop" class="mappop" style="display:none;" >
								<div class="mappop_tit"><p></p></div>
								<div class="mappop_con"></div>
								<div style="position:absolute;top:3px; right:10px"><img src="../images/mappop_close.png"></div>
							</div>
							<div id="legend">
								<div id="header" style="color:black;">
									<select name="STTS_DT" onchange="UI.RoteOther2();">
									<option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option>
									</select>
									<select name="LNGT" onchange="UI.RoteOther2();">
									<option value="TOT">Total</option><option value="NATL">NATIONAL</option><option value="PRVN">PROVINCE</option><option value="RGNY">REGENCY</option>
									</select> Road Length</div>
							<hr>
							</div>
						</div>
					</div>
				</div>
			<!-- //sub subcontents -->
			<div id="spot" style="visibility:hidden; z-index:9999" >
				<ul>
				</ul>
			</div>

			<div id='dataGrid' style="height: 300px; overflow: auto; visibility: hidden;" title="Hasil Pencarian">
			</div>

			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>
			
			<script type="text/javascript">trace(location.pathname);</script>
			<!-----768px-menu----->
			<link type="text/css" rel="stylesheet" href="/css/jquery.mmenu.all.css" />
			<script type="text/javascript" src="/js/jquery.mmenu.js"></script>
			<script type="text/javascript">
					//	The menu on the left
					$(function() {
						$('nav#menu-left').mmenu();
						UI.is_ready = true;
					});
					var sub_type = '${map.sub_type}';
			</script>
			<!-----//768px-menu----->
		</body>
</html>