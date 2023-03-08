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
			
			<link href="/css/style.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<link href="/css/type.css" rel="stylesheet" type="text/css" media="all" />
			<link href="/js/src/main.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="/js/src/common.js"></script>
		</head>

		<body>

			<c:set var="menu" value="company" scope="request"/>			
			<jsp:include page="inc_header.jsp" flush="true" ></jsp:include>

			<!-- sub visual -->
			<div class="sub_bg">
				<div><img src="/images/sub_img.png"></div>
			</div>
			<!-- // sub visual -->

			<!-- sub subcontents -->
			<div class="subcontents bg-white en hide" >
				<div class="wrap">
					<div class="subtap">
						<ul>
							<li class=""><a href="/page/1">Concept and Characteristics</a></li>
							<li class=""><a href="/page/2">Goals of Master Plan</a></li>
							<li class="tabon"><a href="/page/3">Pilot system</a></li>
						</ul>
					</div>

					<div class="sub-board">
						<p class="t1">Pilot system</p>
						<p>The master plan for road data targeting the entire Indonesia is established and the target area for the establishment of pilot system is Bandung city</p>
						<p class="sub_pic"><img src="/images/tab03_01_img.png"></p>
						<p class="sub_pic_m"><img src="/images/tab03_01_m_img.png"></p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Supporting of the introduction of H/W and development of S/W for data collection, integration and operation</li>
									<li>Development of applications such as integrated platform and user interface (UI)</li>
									<li>Supporting of CCTV installations and development of operation applications</li>
									<li>Establishment of the pilot system for developing IIRMS</li>
									<li>Unit and integrated tests of established pilot system and operation of the systems</li>
									<li>Inspection of hardware, commercial software and equipment of pilot system</li>
								</ul>
						</div>

					</div>
				</div>
			</div>
			<div class="subcontents bg-white in hide" >
				<div class="wrap">
					<div class="subtap">
						<ul>
							<li><a href="/page/1">Konsep dan Karakteristik</a></li>
							<li><a href="/page/2">Tujuan dari master plan</a></li>
							<li class="tabon"><a href="/page/3">Sistem Percontohan</a></li>
						</ul>
					</div>

					<div class="sub-board">
						<p class="t1">Sistem Percontohan</p>
						<p>Master plan untuk data jalan menargetkan keseluruhan Indonesia dan target untuk sistem percontohan (pilot system) yaitu Kota Bandung.</p>
						<p class="sub_pic"><img src="/images/tab03_01_img.png"></p>
						<p class="sub_pic_m"><img src="/images/tab03_01_m_img.png"></p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Mendukung pengenalan H/W dan mengembangkan S/W untuk pengumpulan data, integrasi dan operasi</li>
									<li>Mengembangkan aplikasi seperti platform terintegrasi dan user interface (UI)</li>
									<li>Mendukung instalasi CCTV dan mengembangkan operasional aplikasi</li>
									<li>Membuat sebuah sistem percontohan untuk pengembangan IIRMS</li>
									<li>Unit dan tes integrasi dari pembuatan sistem percontohan dan sistem operasi</li>
									<li>Menginspeksi perangkat keras, perangkat lunak komersil dan perlengkapan untuk sistem percontohan</li>
								</ul>
						</div>

					</div>
				</div>
			</div>
			<!-- //sub subcontents -->

			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>

			<script type="text/javascript">$(".<spring:message code='lang'/>").show()</script>
		</body>
</html>