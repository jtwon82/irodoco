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

			<script type="text/javascript" src="/js/jquery.min.js"></script>
		
			<!-----768px-menu----->
			<link type="text/css" rel="stylesheet" href="/css/jquery.mmenu.all.css" />
			<script type="text/javascript" src="/js/jquery.mmenu.js"></script>
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
		
		<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
		<!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
		<script src="/js/assets/js/ie-emulation-modes-warning.js"></script>
			
			<link href="/css/style.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<link href="/css/type.css" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="/js/src/common.js"></script>
			<script src="/js/morris/morris.min.js"></script>
			<link rel="stylesheet" href="/js/morris/morris.css">
		</head>

		<body>

			<!-- header -->
			<div class="header_bg">
			<div class="wrap">
				<div class="header">
					<div class="logo"><h1><a href="../index.html"><img src="../images/logo.png" alt=""/></a></h1></div>
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
										<li><a href="/page/1">COMPANY</a></li>
										<li><a href="/main">MAPCONTROL</a></li>
										<li><a href="/notice">BOARD</a></li>
										<c:if test="${ auth eq 'ADMIN' }">
										<li><a href="/statistic-day">Statistic</a></li>
										<li><a href="/admin-facility">CCTV</a></li>
										<li><a href="/admin-facility-history">Facility</a></li>
										</c:if>
									</ul>
								</nav>
						</div>
					<!------start-768px-menu---->

						<div class="header_sub">
							<div class="h_menu">
								<ul>
									<li class="active"><a href="/">HOME</a></li>
									<li><a href="/page/1">COMPANY</a></li>
									<li><a href="/main">MAPCONTROL</a></li>
									<li><a href="/notice">BOARD</a></li>
									<c:if test="${ auth eq 'ADMIN' }">
									<li><a href="/statistic-day">Statistic</a></li>
									<li><a href="/admin-facility">CCTV</a></li>
									<li><a href="/admin-facility-history">Facility</a></li>
									</c:if>
								</ul>
							</div>
							<div class="t_menu">
									<a href=""><img src="/images/arrow_btnh.png">English Here</a><a href=""><img src="/images/arrow_btnh.png">Login Here </a>
							</div>
							<div class="clear"> </div>
						</div>
				</div>
			</div>
			<!-- //nav -->

			<!-- sub visual -->
			<div class="sub_bg">
				<div><img src="/images/sub_img.png"></div>
			</div>
			<!-- // sub visual -->

			<!-- sub subcontents -->
			<div class="subcontents bg-white" >
				<div class="wrap">
					<div class="sub-board">
						
						<div class="sub-board-tit">
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>NOTICE</p>
						</div>
						
						
					</div>
					ssss
				</div>
			</div>
			<!-- //sub subcontents -->

			<div class="copy">
				<p>Copyright �� IRoDCO 2016 All right reserved.</p>
			</div>
		<script type="text/javascript">trace(location.pathname);</script>
		</body>
</html>