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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>CCTV Direction Image</p>
						</div>
						
					<!-- content -->
<form name="form1" action="/admin-facility-proc" method="post" enctype="multipart/form-data">
	<input type="hidden" name="mode" value="${ map.mode }">
	<input type="hidden" name="page" value="${ map.page }">
	<input type="hidden" name="bid" value="${ map.bid }">
	<input type="hidden" name="DIRECTION" value=""/>
				<div class="page-header">
				  <h1>CCTV ID <small>${ map.bid }</small></h1>
				</div>
				<br>
				
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">File1</span>
				  <span class="form-control" aria-describedby="basic-addon2" >
				  		<table><tr>
				  		<td><input type="file" name="DIR1" value=""/></td>
				  		<td><span style="${ fn:length(item.DIR1)>0?'':'display:none;' }">[<a href="${ item.DIR1 }" target="_blank">View</a>]</span></td>
				  		<td><span style="${ fn:length(item.DIR1)>0?'':'display:none;' }">[<a href="javascript:proc('direction-delete','${ map.page }','${ map.bid }','DIR1');" target="_blank">Delete</a>]</span></td>
				  		</tr></table>
				  </span>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">File2</span>
				  <span class="form-control" aria-describedby="basic-addon2" >
				  		<table><tr>
				  		<td><input type="file" name="DIR2" value=""/></td>
				  		<td><span style="${ fn:length(item.DIR2)>0?'':'display:none;' }">[<a href="${ item.DIR2 }" target="_blank">View</a>]</span></td>
				  		<td><span style="${ fn:length(item.DIR2)>0?'':'display:none;' }">[<a href="javascript:proc('direction-delete','${ map.page }','${ map.bid }','DIR2');" target="_blank">Delete</a>]</span></td>
				  		</tr></table>
				  </span>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">File3</span>
				  <span class="form-control" aria-describedby="basic-addon2" >
				  		<table><tr>
				  		<td><input type="file" name="DIR3" value=""/></td>
				  		<td><span style="${ fn:length(item.DIR3)>0?'':'display:none;' }">[<a href="${ item.DIR3 }" target="_blank">View</a>]</span></td>
				  		<td><span style="${ fn:length(item.DIR3)>0?'':'display:none;' }">[<a href="javascript:proc('direction-delete','${ map.page }','${ map.bid }','DIR3');" >Delete</a>]</span></td>
				  		</tr></table>
				  </span>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">File4</span>
				  <span class="form-control" aria-describedby="basic-addon2" >
				  		<table><tr>
				  		<td><input type="file" name="DIR4" value=""/></td>
				  		<td><span style="${ fn:length(item.DIR4)>0?'':'display:none;' }">[<a href="${ item.DIR4 }" target="_blank">View</a>]</span></td>
				  		<td><span style="${ fn:length(item.DIR4)>0?'':'display:none;' }">[<a href="javascript: proc('direction-delete','${ map.page }','${ map.bid }','DIR4');">Delete</a>]</span></td>
				  		</tr></table>
				  </span>
				</div>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
					  <a href="javascript: document.form1.submit();" class="btn btn-default" role="button">Save</a>
					  <a href="admin-facility?page=${ map.page }" class="btn btn-default" role="button">List</a>
					</div>
				</div>
</form>
<script type="text/javascript">
function proc(mode, page, bid, DIRECTION){
	var f = document.form1;
	f.mode.value=mode;
	f.page.value=page;
	f.bid.value=bid;
	f.DIRECTION.value=DIRECTION;
	f.submit();
}
</script>
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