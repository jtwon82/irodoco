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

			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		
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
			
			<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
			<script src="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.js"></script>
			<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.css">
			
			<link href="/css/style.css?st=${ random }" rel="stylesheet" type="text/css" media="all" />
			<link href="/css/type.css" rel="stylesheet" type="text/css" media="all" />
			<script type="text/javascript" src="/js/src/common.js"></script>
			<script src="/js/morris/morris.min.js"></script>
			<link rel="stylesheet" href="/js/morris/morris.css">
			
			<link rel="stylesheet" href="//code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
			<script src="//code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
		</head>

		<body class="irodco">
			
			<c:set var="menu" value="statistic" scope="request"/>
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
							<p class="sub-board-tit-bul"><span><img src="/images/tit_bul.png" style=""></span>Statistic</p>
						</div>
						
				<br>
				<div class="breadcrumb">
					<form name='form1' class="navbar-form " role="search" method="post">
						<input type="hidden" name='EXCEL' value=''/>
						<div class="form-group">
							<div class="container">
							    <div class="row">
							        <div class='col-sm-2'>
							            <div class="form-group">
							                <div class='input-group date'>
							                    <input type='text' name="sdate" id='datetimepicker1' class="form-control" value="${ map.sdate }"/>
							                    <span class="input-group-addon">
							                        <span class="glyphicon glyphicon-calendar" onclick="$('#datetimepicker1').focus();"></span>
							                    </span>
							                </div>
							            </div>
							        </div>
							        <div class='col-sm-2'>
							            <div class="form-group">
							                <div class='input-group date'>
							                    <input type='text' name="edate" id='datetimepicker2' class="form-control" value="${ map.edate }"/>
							                    <span class="input-group-addon">
							                        <span class="glyphicon glyphicon-calendar" onclick="$('#datetimepicker2').focus();"></span>
							                    </span>
							                </div>
							            </div>
							        </div>
							        <div class='col-sm-2'>
							            <div class="form-group">
							                <div class='input-group date'>
												<table width='100%'>
												<tr>
													<td>Day : </td>
													<td><input type='radio' name="CHKDAY" value="day" ${ map.CHKDAY eq 'day'?'checked':'' }/></td>
													<td>Hour : </td>
													<td><input type='radio' name="CHKDAY" value="hour" ${ map.CHKDAY eq 'hour'?'checked':'' }/></td>
												</tr>
												</table>
							                </div>
							            </div>
							        </div>
								    <div class="">
										<input type="hidden" name="page" value="${ page }"/>
<%-- 										<input type="text" name="sval" value="${ map.sval }" class="form-control" placeholder="Search"/> --%>
										<button type="submit" class="btn btn-default"><spring:message code="form.btn.submit"/></button>
										<button type="button" onclick="excelDown();" class="btn btn-default">Excel</button>
								    </div>
							    </div>
							</div>
						</div>
					</form>
				</div>
				<br>
				<div>
					<div id="graph_map"></div>
					<div id="graph_notice"></div>
					<div id="graph_qrcode"></div>
					<div id="graph_cctv"></div>
					<div id="graph_total"></div>
				</div>
				
			  <div class="table-responsive">
				<table class="table box-inner">
				  <thead class="box-header">
				    <tr>
				        <td rowspan="2" style='vertical-align: middle;'><p align="center">DATE</td>
				        <td colspan="2"><p align="center">MAP</td>
				        <td colspan="2"><p align="center">NOTICE</td>
				        <td colspan="2"><p align="center">QRCODE</td>
				        <td colspan="2"><p align="center">CCTV VIEW</td>
				        <td rowspan="2" style='vertical-align: middle;'><p align="center">TOTAL</td>
				    </tr>
				    <tr>
				        <td><p align="center">WEB</td>
				        <td><p align="center">MOBILE</td>
				        <td><p align="center">WEB</td>
				        <td><p align="center">MOBILE</td>
				        <td><p align="center">WEB</td>
				        <td><p align="center">MOBILE</td>
				        <td><p align="center">WEB</td>
				        <td><p align="center">MOBILE</td>
				    </tr>
				  </thead>
				  <tbody class="tbody">
					<c:forEach var="listValue" items="${list}">
					<tr>
					  <td class='date'>${ listValue.REGDATES }</td>
					  <td class='web1'>${ listValue.MAIN_WEB }</td>
					  <td class='mobile1'>${ listValue.MAIN_MOB }</td>
					  <td class='web2'>${ listValue.NOTICE_WEB }</td>
					  <td class='mobile2'>${ listValue.NOTICE_MOB }</td>
					  <td class='web3'>${ listValue.QRCODE_WEB }</td>
					  <td class='mobile3'>${ listValue.QRCODE_MOB }</td>
					  <td class='web4'>${ listValue.CCTV_WEB }</td>
					  <td class='mobile4'>${ listValue.CCTV_MOB }</td>
					  <td class='total'>${ listValue.TOTAL }</td>
					</tr>
					</c:forEach>
					<c:if test="${ fn:length(list) == 0 }">
					<tr>
					  <td colspan="5">검색된내역이 없습니다.</td>
					</tr>
					</c:if>
				  </tbody>
				</table>
			  </div>
			  
			  
        <script type="text/javascript">
            $(document).ready(function () {
            	$("#datetimepicker1").datepicker({dateFormat:'yy-mm-dd'});
            	$("#datetimepicker2").datepicker({dateFormat:'yy-mm-dd'});

            	var graph_map = [];
            	var graph_notice = [];
            	var graph_qrcode = [];
            	var graph_cctv = [];
            	var graph_total = [];
            	$('.table-responsive .tbody tr').each(function(id){
            		if( !map.containsKey(id) ){
            			map.put(id, id);
            			
	            		var date = $(this).find('.date').html();
	            		var total = $(this).find('.total').html();
	            		var web1 = parseInt($(this).find('.web1').html());
	            		var mobile1 = parseInt($(this).find('.mobile1').html());
	            		var web2 = parseInt($(this).find('.web2').html());
	            		var mobile2 = parseInt($(this).find('.mobile2').html());
	            		var web3 = parseInt($(this).find('.web3').html());
	            		var mobile3 = parseInt($(this).find('.mobile3').html());
	            		var web4 = parseInt($(this).find('.web4').html());
	            		var mobile4 = parseInt($(this).find('.mobile4').html());

	            		graph_map.push({x:date, y:web1, z:mobile1 });
	            		graph_notice.push({x:date, y:web2, z:mobile2 });
	            		graph_qrcode.push({x:date, y:web3, z:mobile3 });
	            		graph_cctv.push({x:date, y:web4, z:mobile4 });
	            		graph_total.push({x:date, c1:web1+mobile1, c2:web2+mobile2, c3:web3+mobile3, c4:web4+mobile4 });
            		}
            	});
            	graph_map.pop();
            	graph_notice.pop();
            	graph_qrcode.pop();
            	graph_cctv.pop();
            	graph_total.pop();

            	Morris.Bar({
            	  element: 'graph_total',
            	  data: graph_total,
            	  xkey: 'x',
            	  ykeys: ['c1', 'c2', 'c3', 'c4'],
            	  labels: ['Map', 'Notice', 'QRcode', 'CCTV']
            	});

            	prettyPrint();
            });
            function excelDown(){
            	var f = document.form1;
            	f.action='/statistic-day-excel';
            	f.submit();
            	f.action='/statistic-day';
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