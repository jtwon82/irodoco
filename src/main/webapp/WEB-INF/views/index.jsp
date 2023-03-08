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
			<link href="/css/type.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
		</head>

		<body class="irodco">
			
			<c:set var="menu" value="index" scope="request"/>
			<jsp:include page="inc_header.jsp" flush="true" ></jsp:include>

			<!-- main map -->
			<div class="map">
					<!-- 임의로 붙여넣으거에요 해당지도표출 해주세요 -->
					<!-- <iframe width="100%" height="440" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.in/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=India&amp;aq=0&amp;oq=indi&amp;sll=44.746733,-108.533936&amp;sspn=5.859437,13.392334&amp;ie=UTF8&amp;hq=&amp;hnear=India&amp;ll=20.593684,78.96288&amp;spn=3.787665,6.696167&amp;t=m&amp;z=8&amp;output=embed"> </iframe> -->
					<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31686.264303385695!2d107.62155000000001!3d-6.916523!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7bd0194f67607a47!2sBandung+Moment+Jaya!5e0!3m2!1sko!2skr!4v1477455668596" width="100%" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
			</div>
			<!-- //main map -->



			<!-- start last_posts -->
			<div class="bn_area">
				<div class="wrap">
					<div class="l-grids"><!-- l-grids -->
						<div class="l-grid-1"><!-- banner1 -->
							<div class="bn_content">
								<h3><spring:message code="menu.name.map.trffic"/></h3>
								<p class="bn_icon"><a href="/main?sub_type=googleTraffic"><img src="/images/bn_icon1.png"></a></p>
								<p class="bn_txt"><!-- 도로 교통정보를<br>실시간으로 확인하실 수 있습니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>

						<div class="l-grid-1"><!-- banner2 -->
							<div class="bn_content">
								<h3><spring:message code="menu.name.map.incident"/></h3>
								<p class="bn_icon"><a href="/main?sub_type=incident"><img src="/images/bn_icon2.png"></a></p>
								<p class="bn_txt"><!-- 도로공사 및 점검내용을<br> 빠르게 알려드립니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>

						<div class="l-grid-1"><!-- banner3 -->
							<div class="bn_content">
								<h3>CCTV</h3>
								<p class="bn_icon"><a href="/main?sub_type=cctv"><img src="/images/bn_icon3.png"></a></p>
								<p class="bn_txt"><!-- CCTV위치 정보를 <br>확인하실 수 있습니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>

						<div class="l-grid-1" ><!-- banner4 -->
							<div class="bn_content" >
								<h3><spring:message code="menu.name.map.transport"/></h3>
								<p class="bn_icon"><a href="/main?sub_type=publicTraffic"><img src="/images/bn_icon4.png"></a></p>
								<p class="bn_txt"><!-- 대중교통 정보를<br> 확인하실 수 있습니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>

						<div class="l-grid-1" ><!-- banner5 -->
							<div class="bn_content" >
								<h3><spring:message code="menu.name.map.road"/></h3>
								<p class="bn_icon"><a href="/main?sub_type=roadInfo"><img src="images/bn_icon5.png"></a></p>
								<p class="bn_txt"><!-- 도로 교통정보를<br> 확인하실 수 있습니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>
							
						<div class="l-grid-1" ><!-- banner5 -->
							<div class="bn_content" >
								<h3><spring:message code="menu.name.map.hawk"/></h3>
								<p class="bn_icon"><a href="/main?sub_type=hawkInfo"><img src="images/bn_icon6.png"></a></p>
								<p class="bn_txt"><!-- 도로 교통정보를<br> 확인하실 수 있습니다. --></p>
							</div>
							<div class="clear"> </div>
						</div>

						<div class="clear"> </div>
					</div><!-- //l-grids -->
				</div>
			</div>

			<!-- start last_posts --> 
			<!-- 게시글 표출해주세요 -->
			<div class="latest_posts">
				<div class="wrap">
					<h5 class="notice_tit">LATEST NEWS</h5>
					<div class="l-grids"><!-- l-grids -->
						<c:forEach var="row" items="${notice}">
						<div class="l-grid-2"><!-- banner1 -->
							<div class="notice_content">
								<h3>${ row.title }</h3>
								<p>${fn:substring(row.content, 0, 19)}</p>
								<span>${fn:substring(row.regdate, 0, 19)}</span>
							</div>
							<div class="clear"> </div>
						</div>
						</c:forEach>
						<div class="clear"> </div>
					</div><!-- //l-grids -->
				</div>
			</div>

			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>

		</body>
</html>