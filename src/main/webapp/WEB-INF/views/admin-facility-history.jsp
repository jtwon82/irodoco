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
		</head>

		<body class="irodco">
			
			<c:set var="menu" value="history" scope="request"/>
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>CCTV Disability Status</p>
						</div>
						
					<!-- content -->
           <div>
           		<br>
				<div class="panel panel-default process">
				  <!-- Default panel contents -->
				  <div class="panel-heading">Process Info</div>
				  <!-- Table -->
				  <table class="table box-inner" style="text-align:center;"">
						<thead class="box-header">
						  <tr>
							<th>Information Processing</th>
							<th>Information Link</th>
							<th>CCTV Control</th>
							<th>Detect Accident</th>
							<th>Packet Process</th>
							<th>WEB</th>
							<th>Mobile</th>
						  </tr>
						</thead>
						<tbody>
						<c:forEach var="item" items="${list1}">
						<tr><td>${ item.C1 }</td>
							<td>${ item.C2 }</td>
							<td>${ item.C3 }</td>
							<td>${ item.C4 }</td>
							<td>${ item.C5 }</td>
							<td>${ item.C6 }</td>
							<td>${ item.C7 }</td></tr>
						</c:forEach>
						</tbody>
				  </table>
				</div>
				
				<div style="clear:both; float:left; padding:10px;"></div>
				
				<div class="panel panel-default facility">
				  <!-- Default panel contents -->
				  <div class="panel-heading">Facility Info</div>
				  <!-- Table -->
					<table class="table box-inner">
						<thead class="box-header">
						  <tr>
							<th>CCTV ID</th>
							<th>Communication</th>
							<th>Power</th>
							<th>Pen</th>
							<th>Heater</th>
							<th>Camera</th>
						  </tr>
						</thead>
					<c:forEach var="item" items="${list2}">
						<tr><td>${ item.CCTV_ID }</td>
							<td>${ item.COMM_STAT_STR }</td>
							<td>${ item.POWR_STAT_STR }</td>
							<td>${ item.FAN_STAT_STR }</td>
							<td>${ item.HEAT_STAT_STR }</td
							><td>${ item.CAM_STAT_STR }</td></tr>
					</c:forEach>
				  </table>
				</div>
				

				<div class="panel panel-default " style="display:none;">
				  <!-- Default panel contents -->

				  <div class="panel-heading">&nbsp; <p class='pull-right'>V:View, D:Delete</p></div>
				  <!-- Table -->
					<table class="table box-inner">
						<col width='15%'/>
						<col width='15%'/>
						<col width='15%'/>
						<col width='15%'/>
						<col width='15%'/>
						<col width='*'/>
						<thead class="box-header">
						  <tr>
							<th>Date</th>
							<th>ID</th>
							<th>Maintenance Type</th>
							<th>Check Type</th>
							<th>Etc</th>
						  </tr>
						</thead>
						<tbody>
						<c:forEach var="item" items="${list}">
						  <tr>
							<th scope="row">${ item.REGDATES }</th>
							<th>${ item.HIST_ID }</th>
							<td>${ item.HIST_TYPE_STR }</td>
							<td>${ item.HIST_STATUS }</td>
							<td>
								<a href="admin-facility-history-view?bid=${ item.HIST_ID }&CCTV_ID=${ map.CCTV_ID }" class="btn btn-v btn-sm" role="button">V</a>
								<a href="javascript:proc('delete', ${ map.page }, '${ item.HIST_ID }', '${ map.CCTV_ID }');" class="btn btn-d btn-sm" role="button">D</a>
<%-- 								<a href="admin-facility-history-write?mode=update&page=${ map.page }&bid=${ item.HIST_ID }&CCTV_ID=${ map.CCTV_ID }" class="btn btn-m btn-sm" role="button">M</a> --%>
							</td>
						  </tr>
						</c:forEach>
						<c:if test="${ list.size() eq 0 }"><tr><td colspan="7">Nothing Search result.</td></tr></c:if>
						</tbody>
					  </table>
				</div>
				<div style='text-align:center; display:none'>
					<ul class="pagination pagination-lg">${ paging }</ul>
				</div>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
<%-- 					  <a href="admin-facility?page=${ map.page }" class="btn btn-default" role="button">Facility List</a> --%>
<%-- 					  <a href="admin-facility-history-write?CCTV_ID=${ map.CCTV_ID }" class="btn btn-default" role="button">Maintenance Add</a> --%>
					</div>
				</div>
<script type="text/javascript">
function proc(mode, page, bid, CCTV_ID){
	var f = document.form1;
	f.mode.value=mode;
	f.page.value=page;
	f.bid.value=bid;
	f.CCTV_ID.value=CCTV_ID;
	f.submit();
}
$(document).ready(function(){
	if ( mobile ){
		$(".btn-group").hide();
	}
});

var time = setInterval(function(){
				$.ajax({
					type: 'POST',
					url: '/admin-facility-history-ajax',
					data: {
						'empty' : '',
					},
					dataType:"json",
					success: function(req) {
// 						$(".subcontents .process tbody").empty();
						$(".subcontents .facility tbody").empty();
// 						$(".subcontents .process tbody").append("<tr><td colspan='8'><img src='/images/icon/progrss.jpg'/></td></tr>");
						$(".subcontents .facility tbody").append("<tr><td colspan='8'><img src='/images/icon/progrss.jpg'/></td></tr>");
						
						setTimeout(function(){
// 							$(".subcontents .process tbody").empty();
							$(".subcontents .facility tbody").empty();
// 							$(req.list1).each(function( id ){
// 								$(".subcontents .process tbody").append("<tr><td>"+this.C1+"</td><td>"+this.C2
// 									+"</td><td>"+this.C3+"</td><td>"+this.C4+"</td><td>"+this.C5+"</td><td>"+this.C6+"</td><td>"+this.C7+"</td></tr>");
// 							});
							
							$(req.list2).each(function( id ){
								$(".subcontents .facility tbody").append("<tr><td>"+this.CCTV_ID+"</td><td>"+this.COMM_STAT_STR
									+"</td><td>"+this.POWR_STAT_STR+"</td><td>"+this.FAN_STAT_STR+"</td><td>"+this.HEAT_STAT_STR+"</td><td>"+this.CAM_STAT_STR+"</td></tr>");
							});
						}, 1000);
					}
				});
}, 30000);

</script>
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