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

		<body class="irodco">
			
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
							<li class="tabon"><a href="/page/1">Concept and Characteristics</a></li>
							<li class=""><a href="/page/2">Goals of Master Plan</a></li>
							<li class=""><a href="/page/3">Pilot system</a></li>
						</ul>
					</div>
					<div class="sub-board">
						<p class="t1">Concept and Characteristics of Indonesia integrated data</p>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Concept</p>
						<p class="t3">The national road and traffic integrated data center is a Indonesia national medium- and long-term plan for the establishment of a national road integrated DB center for the integrated management and operation of road information</p>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Purpose</p>
						<div class="r_box_top"><p>Objectives of Project</p></div>

						<div class="r_box_bot"><p class="t3" style="color:#935da3">Providing a road operation model for national road management in Indonesia by establishing the master plan at the national level and the demonstration model for the establishment of systematic integrated linkage and cooperation system between relevant authorities including the government offices and local governments and a systematic data collection and management</p></div>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Significance</p>

						<ul class="r_box_list">
								<li> The master plan for national road and traffic integrated DB is the first  comprehensive and systematic plan at national level regarding measures of collection, processing, handling and provision of national road traffic-related data as well as establishment, operation, management of database and expansion and linkage of database to local governments</li>
								<li>The master plan for national road and traffic integrated DB is a comprehensive plan, including the direction of policies for the creation, management and operation of road and traffic infrastructure information and action strategies for the implementation of the policies, and links to responsible divisions</li>
								<li>This plan for 20 years in future consists of a total of 3 stages including Stage 1 from 2016 to 2020 (5 years) as the mid-term plan, Stage 2 from 2021 to 2025 (5 years) and Stage 3 from 2026 to 2035 (10 years) as the long-term plans</li>
								<li>This is the top-level plan for national road and traffic database which becomes the foundation for such database and it is the future-oriented and practical mid- and long-term master plan for national road traffic database</li>
							</ul>

					</div>
				</div>
			</div>
			
			<div class="subcontents bg-white in hide" >
				<div class="wrap">
					<div class="subtap">
						<ul>
							<li class="tabon"><a href="/page/1">Konsep dan Karakteristik</a></li>
							<li><a href="/page/2">Tujuan dari master plan</a></li>
							<li><a href="/page/3">Sistem Percontohan</a></li>
						</ul>
					</div>
					<div class="sub-board">
						<p class="t1">Konsep dan Karakteristik</p>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Konsep</p>
						<p class="t3">Integrasi data senter jalan dan lalulintas nasional merupakan rencana nasional Indonesia berjangka menengah dan panjang untuk pembentukan integrasi DB center jalan nasional beserta integrasi manajemen dan operasional informasi jalan.</p>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Tujuan</p>
						<div class="r_box_top"><p>Objektif Projek</p></div>

						<div class="r_box_bot"><p class="t3" style="color:#935da3">Menyediakan model operasi jalan untuk manajemen jalan nasional di Indonesia dengan membuat master plan dengan level nasional dan model demonstrasi untuk pembetukan sistematik integrasi linkage dan sistem kooperasi diantara otoritas terkait termasuk kantor pemerintahan dan pemerintah lokal dan juga sistematik pengumpulan data dan manajemen.</p></div>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Signifikansi</p>

						<ul class="r_box_list">
								<li>Master plan untuk DB jalan dan lalulintas nasional merupakan perencanaan pertama yang luas dan sistematik pada level nasional terkait langkah-langkah  pengumpulan, proses, penanganan dan data terkait mengenai ketentuan jalan dan lalulintas nasional seperti pembangunan, operasional, database manajemen  dan ekspansi dan linkage database kepada pemerintah lokal.</li>
								<li>Master plan untuk DB jalan dan lalulintas nasional merupakan perencanaan yang luas, termasuk kebijakan pengarahan untuk pembuatan, manajemen dan informasi operasional infrastruktur jalan dan lalulintas dan  tindakan strategis untuk mengimplementasikan kebijakan dan menghubungkannya ke divisi yang bertanggung jawab.</li>
								<li>Rencana ini terdiri dari 3 tahap untuk 20 tahun kedepan. Tahap 1 dari tahun 2016 hingga 2020 (5 tahun) sebagai rencana jangka medium, kemudian tahap 2 mulai dari tahun 2021 hingga 2025 (5 tahun) dan tahap 3 dari 2026 hingga 2035 (10 tahun) rencana jangka panjang.</li>
								<li>Ini merupakan rencana dengan level tertinggi untuk database jalan dan lalulintas nasional yang mana akan menjadi pondasi bagi database terkait dan berorientasi masa depan juga merupakan master plan berjangka panjang dan menengah secara praktikal untuk database jalan dan lalulintas nasional.</li>
							</ul>

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