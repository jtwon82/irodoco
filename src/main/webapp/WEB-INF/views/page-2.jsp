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
							<li class="tabon"><a href="/page/2">Goals of Master Plan</a></li>
							<li class=""><a href="/page/3">Pilot system</a></li>
						</ul>
					</div>
					<div class="sub-board">
						<p class="t1">Goals of Master Plan</p>
						<p>The three strategic goals of integrated DB construction are 'Achievement of Connectivity and Integration,' 'Implementation of One-stop Service System,' and 'Enhancement of Productivity and Utilization,' and detailed strategies for achieving each goal are as follows</p>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Achieving Advanced Connectivity and Integration in National Road and Traffic DB</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Collect/store high-quality primary information</li>
									<li>Achieve the construction of a standard and enhanced road and traffic DB</li>
									<li>Build link infrastructures for information provision using state-of-the-art technologies</li>
									<li>Construct an integrated and linked information system for static and dynamic information about national roads; and</li>
									<li>Provide road DB integrated link services of relevant agencies</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Enhancing Productivity and Utilization of National Road and Traffic DB</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Build an integrated road DB to support the establishment of sustainable national road policies</li>
									<li>Support various research and analysis activities for the establishment of national road policies</li>
									<li>Expand road DB as high value-added secondary information</li>
									<li>Make a customer-oriented DB survey and innovate distribution systems; and</li>
									<li>Develop innovative survey/analysis models</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Implementing Road and Traffic DB One-stop Service System</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Construct a hub & spoke system for national road DB</li>
									<li>Raise global competitiveness by securing expertise/efficiency in DB center operation</li>
									<li>Expand service target customers for universal use</li>
									<li>Develop it into a system available for right-time information usage; and</li>
									<li>Provide a flawless road traffic DB</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Visions and Strategies Strategic Map of Master Plan</p>
						<p class="t3">The master plan for national road and traffic integrated DB is a '365 plan' based on the following five basic principles added to the three strategic goals and six strategies for the implementation of standard, enhanced and advanced flawless road and traffic integrated DB service HUB, as set out above</p>
						<p class="sub_pic"><img src="/images/tab02_02_img.png"></p>
						<p class="sub_pic_m"><img src="/images/tab02_02_m_img.png"></p>
					</div>
				</div>
			</div>
			<div class="subcontents bg-white in hide" >
				<div class="wrap">
					<div class="subtap">
						<ul>
							<li><a href="/page/1">Konsep dan Karakteristik</a></li>
							<li class="tabon"><a href="/page/2">Tujuan dari master plan</a></li>
							<li><a href="/page/3">Sistem Percontohan</a></li>
						</ul>
					</div>

					<div class="sub-board">
						<p class="t1">Tujuan dari master plan</p>
						<p>Tiga tujuan strategic dari integrasi konstruksi DB adalah 'Pencapaian konektifitas dan integrasi,' 'implementasi sistem one-stop service,' dan 'peningkatan produktifitas dan pemanfaatan,' dan strategi mendetail mengenai cara  untuk mencapai tujuan seperti dibawah ini.</p>
						
						<p class="t2"><span><img src="/images/t2_bul.png"></span>Mencapai konektifitas dan integrasi terdepan pada DB jalan dan lalulintas nasional</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Mengumpulkan/menyimpan informasi primer dengan kualitas tinggi</li>
									<li>Mencapai standar konstruksi dan meningkatkan DB jalan dan lalulintas</li>
									<li>Membangun link infrastruktur untuk ketentuan informasi dengan teknologi 'state-of-the-art'</li>
									<li>Membangun sistem informasi terhubung dan terintegrasi untuk informasi statis dan dinamis mengenai jalan nasional; dan</li>
									<li>Memberikan link service untuk integrasi DB jalan bagi lembaga terkait</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Meningkatkan produktifitas dan penggunaan DB jalan dan lalulintas nasional</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Membangun sebuah DB jalan terintegrasi untuk mendukung pembuatan kebijakan jalan nasional yang berkelanjutan</li>
									<li>Mendukung berbagai penelitian dan kegiatan analisis untuk pembuatan kebijakan jalan nasional</li>
									<li>Memperluas DB jalan dengan menambahkan informasi sekunder yang bernilai tinggi</li>
									<li>Membuat sebuah survey DB berorientasikan customes dan sistem distribusi yang inovatif; dans</li>
									<li>Mengembangkan survey inovatif/model-model analisis</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Implementasi one-stop service sistem pada DB jalan dan lalulintas</p>
						<div class="r_box">
								<ul class="r_box_list">
									<li>Membuat sebuah pusat dan sistem spoke untuk DB jalan nasional</li>
									<li>Meningkatkan kompetitas global dengan mengamankan keahlian/efisiensi pada operasional DB center.</li>
									<li>Memperluas target service pelanggan untuk penggunaan yang universal</li>
									<li>Mengembangkan sistem ini untuk penggunanan informasi righ0time; dan</li>
									<li>Menyediakan DB jalan dan lalulintas yang sempurna</li>
								</ul>
						</div>

						<p class="t2"><span><img src="/images/t2_bul.png"></span>Visi dan strategi peta strategis master plan</p>
						<p class="t3">Master plan untuk integrasi database jalan dan lalulintas merupakan 'rencana 365' menurut lima prinsip dasar yang dimasukan kedalam tiga tujuan strategis dan enam strategi untuk implementasi standar, meningkatkan dan mengedepankan kesempurnaan HUB integrasi DB jalan dan lalulintas, seperti yang dituliskan dibawah ini.</p>
						<p class="sub_pic"><img src="/images/tab02_02_img_bahasa.png"></p>
						<p class="sub_pic_m"><img src="/images/tab02_02_m_img_bahasa.png"></p>
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