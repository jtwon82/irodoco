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
			<link href="../css/style.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="../js/jquery.min.js"></script>
			<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

			<!-----768px-menu----->
			<link type="text/css" rel="stylesheet" href="../css/jquery.mmenu.all.css" />
			<script type="text/javascript" src="../js/jquery.mmenu.js"></script>
				<script type="text/javascript">
					//	The menu on the left
					$(function() {
						$('nav#menu-left').mmenu();
					});
			</script>
			<!-----//768px-menu----->
			
			
		<!-- Web Framework CSS - Bootstrap (getbootstrap.com) and Bootstrap-map-js (github.com/esri/bootstrap-map-js) -->
		<link rel="stylesheet" href="//esri.github.io/bootstrap-map-js/src/css/bootstrapmap.css">
		<link rel="stylesheet" href="/js/dist/css/bootstrap.min.css">
		
		<link rel="stylesheet" href="//js.arcgis.com/3.17/dijit/themes/claro/claro.css" />
		<link rel="stylesheet" href="//js.arcgis.com/3.17/esri/css/esri.css" />
		<link rel="stylesheet" href="//js.arcgis.com/3.17/esri/themes/calcite/dijit/calcite.css">
		<link rel="stylesheet" href="//js.arcgis.com/3.17/esri/themes/calcite/esri/esri.css">

        <link rel="stylesheet" type="text/css" href="/js/src/main.css?st=${ random }">
        <script type="text/javascript">
			if (location.pathname.indexOf('.') < 0) {
			    //location.replace('index.html');
			}
			
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

			var arcgisurl_rute_bus0 = '${arcgisurl_rute_bus0}';
			var arcgisurl_rute_bus1 = '${arcgisurl_rute_bus1}';
			var arcgisurl_rute_bus2 = '${arcgisurl_rute_bus2}';
			var arcgisurl_rute_bus3 = '${arcgisurl_rute_bus3}';
			var arcgisurl_rute_bus4 = '${arcgisurl_rute_bus4}';
			var arcgisurl_rute_bus5 = '${arcgisurl_rute_bus5}';
			
				var mobile = false;
				var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
				for (var word in mobileKeyWords){
					if (navigator.userAgent.match(mobileKeyWords[word]) != null){
						mobile=true;
						break;
					}
				}
        </script>
		<script src="https://js.arcgis.com/3.17/"></script>
		<script type="text/javascript" src="/js/src/common.js"></script>
        <script type="text/javascript" src='/js/src/main-arcgisgoogle.js?st=${ random }'></script>
        <script type="text/javascript" src='/js/src/main-ui-control.js?st=${ random }'></script>
        <script type="text/javascript" src="/js/player/jwplayer.js"></script>
		<script type="text/javascript">jwplayer.key="mkMbCfvoyQF92pS9SCse47lYfk+8L7RlFGgaEe6o5r8=";</script>
		</head>

    <body class="claro">

			<!-- header -->
			<div class="header_bg">
			<div class="wrap">
				<div class="header">
					<div class="logo"><h1><a href="/"><img src="../images/logo.png" alt=""/></a></h1></div>
				</div>
			</div>
			</div>
			<!-- //header -->

			<!-- nav -->
			<div class="nav_bg">
				<div class="wrap">
					<!------start-768px-menu---->
						<div id="page">
								<div id="header">
									<a class="navicon" href="#menu-left"> </a>
								</div>
								<nav id="menu-left">
									<ul>
										<li><a href="/">HOME</a></li>
										<li><a href="">COMPANY</a></li>
										<li><a href="">MAPCONTROL</a></li>
										<li><a href="">BOARD</a></li>
										<li><a href="">ADMIN</a></li>
									</ul>
								</nav>
						</div>
					<!------start-768px-menu---->

						<div class="header_sub">
							<div class="h_menu">
								<ul>
									<li class="active"><a href="/">HOME</a></li>
									<li><a href="">COMPANY</a></li>
									<li><a href="">MAPCONTROL</a></li>
									<li><a href="">BOARD</a></li>
									<li><a href="">ADMIN</a></li>
								</ul>
							</div>
							<div class="t_menu">
									<a href=""><img src="../images/arrow_btnh.png">English Here</a><a href=""><img src="../images/arrow_btnh.png">Login Here </a>
							</div>
							<div class="clear"> </div>
						</div>
				</div>
			</div>
			<!-- //nav -->

			<!-- sub subcontents -->
			<div class="subcontents" >
				<div class="lt-area" >
					<ul class="lt-icon">
<!-- 						<li class="lt-icon-active"> -->
<!-- 							<a href="javascript:;" onclick="openPopup('popup1');"> -->
<!-- 									<p class="lt-icon-img"><img src="../images/left_icon1_on.png"></p> -->
<!-- 									<p class="lt-icon-txt">Traffic Info</p> -->
<!-- 							</a> -->
<!-- 						</li> -->
						<li class="lt-icon-active">
							<a href="javascript:;" onclick="toggle('Traffic', true);">
									<p class="lt-icon-img"><img src="../images/left_icon1_on.png"></p>
									<p class="lt-icon-txt">Traffic Info</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" onclick="toggle('Incident', true);">
									<p class="lt-icon-img"><img src="../images/left_icon2.png"></p>
									<p class="lt-icon-txt">Incident Info</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" onclick="toggle('cctv', true);">
									<p class="lt-icon-img"><img src="../images/left_icon3.png"></p>
									<p class="lt-icon-txt">CCTV MOV</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" onclick="toggle('publictrafficDialog', true);">
									<p class="lt-icon-img"><img src="../images/left_icon4.png"></p>
									<p class="lt-icon-txt">Public Transport</p>
							</a>
						</li>
					</ul>
				</div>
				<div class="rt-area">
					<div id="content" dojotype="dijit.layout.BorderContainer" design="headline" gutters="true" style="width:100%;height:100%;">
						<div id="map" dojotype="dijit.layout.ContentPane" region="center" style='z-index:1;'>
							<div id="dialog" data-dojo-type="dijit.Dialog" title="Daftar Layer"></div>
							<div style="position: absolute; right: 20px; top: 10px; z-Index: 999;">
								<div id="titlePane" data-dojo-type="dijit/TitlePane" style='width:200px;' data-dojo-props="title:'Measurement', closable: false, open: false">
									<div id="measurementDiv"></div>
								</div>
							</div>
							
							<div id="popup1" class="popup">
								<ul><li>title</li><li><a href="javascript:;" onclick="closePopup();">X</a></li></ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- //sub subcontents -->

		
			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>

		<script type="text/javascript">trace(location.pathname);</script>
		</body>
</html>