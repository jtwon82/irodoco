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
			<link type="text/css" rel="stylesheet" href="/css/jquery.mmenu.all.css" />
		
		<script src="/js/morris/morris.min.js"></script>
		<link rel="stylesheet" href="/js/morris/morris.css">
		
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
			<link href="/css/type.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<link href="/js/src/main.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="/js/src/common.js"></script>
		</head>

		<body class="irodco">
			
			<c:set var="menu" value="cctv" scope="request"/>
			<jsp:include page="inc_header.jsp" flush="true" ></jsp:include>

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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>Equipment VIEW</p>
						</div>
						
					<!-- content -->
           <div>
				<div class="page-header">
				  <h1>Equipment ID <small>${ item.EQIP_ID }</small></h1>
				</div>


          
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">QR CODE</span>
					<p type="text" class="form-control" style="height:170px;"><img src="${ item.IMG_PATH }"/></p>
				</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Equipment ID</h3></div>
	            <div class="panel-body">${ item.EQIP_ID }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Equipment Type</h3></div>
	            <div class="panel-body">${ item.EQIP_TYPE }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Equipment Name</h3></div>
	            <div class="panel-body">${ item.EQIP_NAME }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Location of Installation</h3></div>
	            <div class="panel-body">${ item.INST_LCTN }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Manufacture company</h3></div>
	            <div class="panel-body">${ item.MAKR_NAME }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Installation Company</h3></div>
	            <div class="panel-body">${ item.INST_CMPN_NAME }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Year of Installation</h3></div>
	            <div class="panel-body">${ item.INST_YY }</div>
			</div>
			<br>
			<div class="panel panel-default">
	            <div class="panel-heading"><h3 class="panel-title">Equipment Sepecifications</h3></div>
	            <div class="panel-body">${ item.EQIP_SPEC }</div>
			</div>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
<%-- 					  <a href="admin-facility-write?mode=update&page=${ map.page }&bid=${ map.bid }" class="btn btn-default" role="button">Modify</a> --%>
<%-- 					  <a href="admin-qrcode?page=${ map.page }" class="btn btn-default" role="button">List</a> --%>
					</div>
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
