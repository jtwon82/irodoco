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
			
		<!-- Web Framework CSS - Bootstrap (getbootstrap.com) and Bootstrap-map-js (github.com/esri/bootstrap-map-js) -->
		<link rel="stylesheet" href="//esri.github.io/bootstrap-map-js/src/css/bootstrapmap.css">
		<link rel="stylesheet" href="/js/dist/css/bootstrap.min.css">
		
		
			<link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900' rel='stylesheet' type='text/css'>
			<link href="/css/style.css" rel="stylesheet" type="text/css" media="all" />
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
		</head>

		<body>

			<!-- header -->
			<div class="header_bg">
			<div class="wrap">
				<div class="header">
					<div class="logo"><h1><a href="/index.html"><img src="/images/logo.png" alt=""/></a></h1></div>
				</div>
			</div>
			</div>
			<!-- //header -->

			<!-- nav -->
			<div class="nav_bg">
				<div class="wrap">
					<!------start-768px-menu---->
						<div id="page">
								<div id="header">
									<a class="navicon" href="#menu-left"> </a>
								</div>
								<nav id="menu-left">
									<ul>
										<li><a href="/index.html">HOME</a></li>
										<li><a href="">COMPANY</a></li>
										<li><a href="">MAPCONTROL</a></li>
										<li><a href="">BOARD</a></li>
										<li><a href="">ADMIN</a></li>
									</ul>
								</nav>
						</div>
					<!------start-768px-menu---->

						<div class="header_sub">
							<div class="h_menu">
								<ul>
									<li class="active"><a href="/index.html">HOME</a></li>
									<li><a href="">COMPANY</a></li>
									<li><a href="">MAPCONTROL</a></li>
									<li><a href="">BOARD</a></li>
									<li><a href="">ADMIN</a></li>
								</ul>
							</div>
							<div class="t_menu">
									<a href=""><img src="/images/arrow_btnh.png">English Here</a><a href=""><img src="/images/arrow_btnh.png">Login Here </a>
							</div>
							<div class="clear"> </div>
						</div>
				</div>
			</div>
			<!-- //nav -->

			<!-- sub visual -->
			<div class="sub_bg">
				<div><img src="/images/sub_img.png"></div>
			</div>
			<!-- // sub visual -->

			<!-- sub subcontents -->
			<div class="subcontents bg-white" >
				<div class="wrap">
					<div class="sub-board">

		<div id="notice-body" class='bodycenter'
			dojotype="dijit.layout.ContentPane" region="center"
			style='z-index: 0;'>
			<div style=''>
				<div class="page-header">
					<h1>
						Notice <small> </small>
					</h1>
				</div>
			</div>
			<br>
				<div class="breadcrumb">
								<form class="navbar-form " role="search" method="post">
									<div class="form-group">
										<input type="hidden" name="page" value="${ map.page }"/>
										<select name="skey">
										<option value="">-- Selected --</option>
										<option value="title" <c:if test="${ map.skey eq 'title' }">selected</c:if>>Title</option>
										</select>
										<input type="text" name="sval" value="${ map.sval }" class="form-control" placeholder="Search">
									</div>
									<button type="submit" class="btn btn-default">Submit</button>
								</form>
				</div>
			<br>
			<div class="panel panel-default">
				<!-- Default panel contents -->
				<div class="panel-heading ">
					&nbsp;
					<p class='pull-right'>V:View<c:if test="${ auth eq 'ADMIN' }">, D:Delete, M:Modify</c:if></p>
				</div>
				<!-- Table -->
				<table class="table box-inner">
					<col width='10%' />
					<col width='10%' />
					<col width='10%' />
					<col width='*' />
					<col width='15%' />
					<col width='10%' />
					<thead class="box-header">
						<tr>
							<th>Number</th>
							<th>Type</th>
							<th>Writer</th>
							<th>Title</th>
							<th>Date</th>
							<c:if test="${ auth eq 'ADMIN' }"><th>Is Del</th></c:if>
							<th>Etc</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="listValue" items="${list}">
							<tr>
								<th scope="row" class='text-center'>${ listValue.num }</th>
								<td>${listValue.CODE_KRNM }</td>
								<td>${listValue.user_id}</td>
								<td style="text-align: left;"><a
									href="/notice-view?page=${ map.page }&bid=${listValue.notice_id}" role="button">${listValue.title}</a></td>
								<td>${fn:substring(listValue.regdate, 0, 19)}</td>
								<c:if test="${ auth eq 'ADMIN' }"><th>${ listValue.IS_DEL }</th></c:if>
								<td><a href="/notice-view?page=${ map.page }&bid=${listValue.notice_id}"
									class="btn btn-v btn-sm" role="button">V</a>
									<c:if test="${ auth eq 'ADMIN' }">
									<a href="javascript: proc('delete','${ map.page }','${listValue.notice_id}');" onclick="return confirm('Are you sure?');"
									class="btn btn-d btn-sm" role="button">D</a>
									<a href="/notice-write?mode=update&page=${ map.page }&bid=${listValue.notice_id}"
									class="btn btn-m btn-sm" role="button">M</a>
									</c:if>
								</td>
							</tr>
						</c:forEach>
						<c:if test="${ list.size() eq 0 }"><tr><td colspan="6">Nothing Search result.</td></tr></c:if>
					</tbody>
				</table>
			</div>
			<div style='text-align: center;'>
				<ul class="pagination pagination-lg">${paging}</ul>
			</div>
			<div style="text-align: right;">
				<div class="btn-group" role="group" aria-label="...">
					<c:if test="${ auth eq 'ADMIN' }">
					<a href="/notice-write?mode=insert&page=${ map.page }" class="btn btn-default" role="button">Write</a>
					</c:if>
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

		</body>
</html>