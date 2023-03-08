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

		<body class="irodco">
			
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
						
						<div class="sub-board-fbox">
						
							<div class="select-style" style="display:inline-block; margin-right:10px">
								<select id="" name="" onchange="document.form0.skey.value=this.value;">
									<option value="">-- Selected --</option>
									<option value="title" <c:if test="${ map.skey eq 'title' }">selected</c:if>>Title</option>
								</select>
							</div>
						
							<div class="searchbox-style" style="display:inline-block; ">
								<form class="searchform cf" method="post" name="form0">
								<input type="hidden" name="skey" value="${ map.skey }" />
								<input type="text" name="sval" value="${ map.sval }" />
								<button type="submit"><spring:message code="form.btn.submit"/></button>
								</form>
							</div>
						
						</div>

<!-- 						content -->
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
						<c:if test="${ list.size() eq 0 }"><tr><td colspan="7">Nothing search result.</td></tr></c:if>
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
<!-- 						content -->
					</div>
				</div>
			</div>
			<!-- //sub subcontents -->

			<div class="copy">
				<p>Copyright © IRoDCO 2016 All right reserved.</p>
			</div>
	<form name="form1" action="/notice-proc" method="post" enctype="multipart/form-data">
	<input type="hidden" name="mode"/>
	<input type="hidden" name="page"/>
	<input type="hidden" name="bid"/>
	</form>
<script type="text/javascript">
function proc(mode, page, bid){
	var f = document.form1;
	f.mode.value=mode;
	f.page.value=page;
	f.bid.value=bid;
	f.submit();
}
</script>
		<script type="text/javascript">trace(location.pathname);</script>
		</body>
</html>