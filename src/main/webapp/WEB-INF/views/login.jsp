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
			<script type="text/javascript" src="/js/jquery.placeholder.min.js"></script>
			<script type="text/javascript" src="/js/jquery.cookie.js"></script>
		
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

		<body class="irodco">
			
			<c:set var="menu" value="index" scope="request"/>
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>Sigin in</p>
						</div>
						
						<!-- content -->
						<form class="form-signin" action="/loginProcess" method="POST">
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							<h2 class="form-signin-heading">Signin</h2>
							<label for="inputEmail" class="sr-only">Email address</label> <input
								type="text" id="inputEmail" class="form-control"
								placeholder="User-ID" name="id" value="" required
								autofocus> <label for="inputPassword" class="sr-only">ID</label>
							<input type="password" id="inputPassword" class="form-control"
								placeholder="Password" name="pw" value="" required>
							<div class="checkbox">
								<label> <input type="checkbox" name="remember" value="remember-me" onclick="rememberID(this)">Password Remember</label>
							</div>
							<button class="btn btn-lg btn-primary btn-block" type="submit">Signin</button>
						</form>
					</div>
				</div>
			</div>
			<!-- //sub subcontents -->
			
			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>
		<script type="text/javascript">trace(location.pathname);</script>
		<script type="text/javascript">
			$(document).ready(function(){
    			$('input').placeholder();
    			
    			var id = $.cookie("id");
    			var pw = $.cookie("pw");
    			if ( id || pw ){
    				$("input[name=id]").val( id );
    				$("input[name=pw]").val( pw );
    				
    				$("input[name=remember]").attr("checked", true);
    			}
			});
			function rememberID( obj ){
				if( obj.checked ){
					$.cookie("id", $("input[name=id]").val() );
					$.cookie("pw", $("input[name=pw]").val() );
				}else{
					$.cookie("id", "");
					$.cookie("pw", "");
				}
			}
		</script>
		</body>
</html>