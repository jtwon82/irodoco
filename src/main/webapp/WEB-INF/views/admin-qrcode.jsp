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
			
			<c:set var="menu" value="qrcode" scope="request"/>
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>QRCODE</p>
						</div>
						
					<!-- content -->
				<br>
				<div class="panel panel-default">
				  <!-- Default panel contents -->
				  <div class="panel-heading">&nbsp; <p class='pull-right'>V:View, B:Build qrcode</p></div>
				  <!-- Table -->
					<table class="table box-inner">
						<col width='15%'/>
						<col width='15%'/>
						<col width='*'/>
						<col width='15%'/>
						<thead class="box-header">
						  <tr>
							<th>Equipment ID</th>
							<th>Equipment Type</th>
							<th>Equipment Name</th>
							<th>QR CODE</th>
							<th>Etc</th>
						  </tr>
						</thead>
						<tbody>
						<c:forEach var="row" items="${list}">
						  <tr>
							<th scope="row">${ row.EQIP_ID }</th>
							<td>${ row.EQIP_TYPE }</td>
							<td><a href="/admin-qrcode-view?bid=${ row.EQIP_ID }&page=${ map.page }">${ row.EQIP_NAME }</a></td>
							<td><c:if test="${ row.IMG_PATH ne null }">Y</c:if></td>
							<td>
								<a href="/admin-qrcode-view?bid=${ row.EQIP_ID }&page=${ map.page }" class="btn btn-v btn-sm">V</a>
								<a href="/admin-rebuildqrcode?mode=rebuildqrcode&EQIP_ID=${ row.EQIP_ID }" class="btn btn-r btn-sm" target="_blank">B</a> </td>
						  </tr>
						</c:forEach>
						<c:if test="${ list.size() eq 0 }"><tr><td colspan="7">Nothing Search result.</td></tr></c:if>
						</tbody>
					  </table>
				</div>
				<div style='text-align:center;'>
					<ul class="pagination pagination-lg">${ paging }</ul>
				</div>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
<!-- 					  <a href="admin-facility-write" class="btn btn-default" role="button">Add</a> -->
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