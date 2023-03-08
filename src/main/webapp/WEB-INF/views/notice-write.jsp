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
			<link href="/js/src/main.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="/js/src/common.js"></script>
		</head>

		<body>
			
			<c:set var="menu" value="notice" scope="request"/>
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>NOTICE</p>
						</div>
						
<form name="form1" action="/notice-proc" method="post" enctype="multipart/form-data">
	<input type="hidden" name="mode" value="${ map.mode }">
	<input type="hidden" name="page" value="${ map.page }">
	<input type="hidden" name="bid" value="${ map.bid }">
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Title</span>
				  <input type="text" name="title" class="form-control" aria-describedby="basic-addon2" value="${ item.title }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Writer</span>
				  <input type="text" name="user_id" class="form-control" aria-describedby="basic-addon2" value="${ item.user_id }" readOnly>
				</div>
				<c:if test="${ mode eq 'update' }">
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Delete</span>
				  <select name="IS_DEL" class="form-control">
				  <option value="N">N</option>
				  <option value="Y">Y</option>
				  </select>
				  <script type="text/javascript">document.form1.IS_DEL.value='${ item.IS_DEL }';</script>
				</div>
				</c:if>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Type</span>
				  <select class="form-control" name="NOTICE_TYPE">
				  <option value="">-- Please Select --</option>
				  <option value="1">Notice</option>
				  <option value="2">Integrated Management</option>
				  <option value="3">Traffic Safety</option>
				  <option value="4">Promotional information</option>
				  <option value="5">Municipal administration information</option>
				  </select>
				  <script type="text/javascript">
				  document.form1.NOTICE_TYPE.value='${item.NOTICE_TYPE}';
				  </script>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">File</span>
				  <input type="file" name="file" class="form-control" aria-describedby="basic-addon2" value="${ item.NOTICE_TYPE }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Content</span>
				  <textarea class="form-control" name="content" style="height:250px;" aria-describedby="basic-addon2">${ item.content }</textarea>
				</div>
				<br>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
					  <a href="javascript: document.form1.submit();" onclick="return submitChk()" class="btn btn-default" role="button">Save</a>
					  <a href="javascript:history.go(-1);" class="btn btn-default" role="button">Cancel</a>
					</div>
				</div>
</form>
	<script type="text/javascript">
		function submitChk(){
			var f = document.form1;
			if ( f.title.value=='' ){
				alert('Please input the title.');
				return false;
			}
			if ( f.NOTICE_TYPE.value=='' ){
				alert('Please input the type.');
				return false;
			}
			if ( f.content.value=='' ){
				alert('Please input the content.');
				return false;
			}
			return true;
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