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
			<link href="/css/type.css" rel="stylesheet" type="text/css" media="all" />
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>CCTV VIEW</p>
						</div>
						
					<!-- content -->
           <div>
				<div class="page-header">
				  <h1>CCTV ID <small>${ item.CCTV_ID }</small></h1>
				</div>

<!-- 				<div class="input-group"> -->
<!-- 				  <span class="input-group-addon" id="basic-addon2">QRCODE</span> -->
<!-- 					<p type="text" class="form-control" style="height:190px;"> -->
<%-- 						<img alt="" src="${ item.QRCD_PATH }" width='150'> --%>
<!-- 				</div> -->
<!-- 				<br> -->
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">CCTV ID</span>
					<p type="text" class="form-control">${ item.CCTV_ID }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Name</span>
					<p type="text" class="form-control">${ item.CCTV_NM }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Controller Type</span>
					<p type="text" class="form-control">${ item.CTLR_TYPE_CD }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Location</span>
					<p type="text" class="form-control">${ item.FAC_LCTN }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">IP</span>
					<p type="text" class="form-control">${ item.IP }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">PORT</span>
					<p type="text" class="form-control">${ item.PORT }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">LON</span>
					<p type="text" class="form-control">${ item.LON }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">LAT</span>
					<p type="text" class="form-control">${ item.LAT }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Controller Version</span>
					<p type="text" class="form-control">${ item.CTLR_VER }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Distribution URL</span>
					<p type="text" class="form-control">${ item.STRM_URL }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">WEB URL</span>
					<p type="text" class="form-control">${ item.WEB_URL }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Android URL</span>
					<p type="text" class="form-control">${ item.ANDR_URL }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">ISO URL</span>
					<p type="text" class="form-control">${ item.IOS_URL }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">USE</span>
					<p type="text" class="form-control">${ item.USE_YN }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Login ID</span>
					<p type="text" class="form-control">${ item.LGN_ID }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Login Password</span>
					<p type="text" class="form-control">${ item.LGN_PASSWD }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Preset NO</span>
					<p type="text" class="form-control">${ item.FIX_PSET_NO }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Sensing Crossway</span>
					<p type="text" class="form-control">${ item.DETECT_YN }</p>
				</div>
				<br>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
<%-- 					  <a href="admin-facility-write?mode=update&page=${ map.page }&bid=${ map.bid }" class="btn btn-default" role="button">Modify</a> --%>
					  <a href="admin-facility?page=${ map.page }" class="btn btn-default" role="button">List</a>
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