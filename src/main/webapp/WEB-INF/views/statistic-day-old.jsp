<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<!--The viewport meta tag is used to improve the presentation and behavior of the samples
		on iOS devices-->
		<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
		<title>IRODCO</title>

		<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.js"></script>
		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.min.css">
		<script src="/js/morris/morris.min.js"></script>
		<link rel="stylesheet" href="/js/morris/morris.css">

		<!-- Web Framework CSS - Bootstrap (getbootstrap.com) and Bootstrap-map-js (github.com/esri/bootstrap-map-js) -->
		<link rel="stylesheet" href="//esri.github.io/bootstrap-map-js/src/css/bootstrapmap.css">
		<link rel="stylesheet" href="/js/dist/css/bootstrap.min.css">
		
		<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
		<!--[if lt IE 9]><script src="assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
		<script src="/js/assets/js/ie-emulation-modes-warning.js"></script>

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.0/js/dojo/dijit/themes/claro/claro.css">
        <link rel="stylesheet" type="text/css" href="/js/src/main.css">
        <script type="text/javascript">
			if (location.pathname.indexOf('.') < 0) {
			    //location.replace('index.html');
			}
			var gis_path = '/js/src';
			var djConfig = {
			    parseOnLoad: true,
			    packages: [
// 				{
// 			        "name": "agsjs",
// 			        "location": gis_path +'/agsjs'
// 			    },
// 			    {
// 			        "name": "esriES",
// 			        "location": gis_path +'/esriES'
// 			    },
			    {
			        "name": "gmaps",
			        "location": gis_path +'/gmaps'
			    },
			    {
                    name: 'jquery',
                    location: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1',
                    main: 'jquery'
                }]
			};
        </script>
		<script src="https://js.arcgis.com/3.16/"></script>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
		
    </head>
    <body class="claro">

    <div class="navbar navbar-inverse navbar-fixed-top" role="">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <spring:message code="menu.name.root"/>
        </div>
        <div class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li><spring:message code="menu.name.gis"/></li>
					<li><spring:message code="menu.name.notice"/></li>
					<c:if test="${ auth eq 'ADMIN' }">
					<li class="dropdown active"><a href="javascript:;"
						class="dropdown-toggle" data-toggle="dropdown" role="button"
						aria-expanded="false"><spring:message code="menu.name.admin"/><span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><spring:message code="menu.name.admin.statics.day"/></li>
							<li class="divider"></li>
							<li><spring:message code="menu.name.admin.facilities"/></li>
							<li><spring:message code="menu.name.admin.fcltstatus"/></li>
						</ul></li>
					</c:if>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><div class="lang-${ lang eq 'en' ? 'active': 'disable' }"><a href="?lang=en_US">Eng</a></div></li>
					<li class="active"><div class="lang-${ lang eq 'ko' ? 'active': 'disable' }"><a href="?lang=ko_KR">Kor</a></div></li>
					<c:choose>
					<c:when test="${ auth eq 'ADMIN' }">
						<li class=""><a href="/logout">SignOut <span class="sr-only">(current)</span></a></li>
					</c:when>
					<c:otherwise>
						<li class=""><a href="/login">Signin <span class="sr-only">(current)</span></a></li>
					</c:otherwise>
					</c:choose>
				</ul>
        </div>
      </div>
    </div>

	<div id="content" dojotype="dijit.layout.BorderContainer" design="headline" gutters="true" style="width: 100%;">
		<div id="header" dojotype="dijit.layout.ContentPane" region="top"
			style='height: 45px;'></div>
           <div id="static-main" class='bodycenter' dojotype="dijit.layout.ContentPane" region="center" style='z-index:0;'>
				<div style=''>
					<div class="page-header">
					  <h1>Statistic <small> </small></h1>
					</div>
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
										<button type="submit" class="btn btn-default">Submit</button>
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
				  <tbody>
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

			</div>

      <!-- FOOTER -->
      <footer class='bodycenter' style='height:50px;'>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2016 IRODCO &middot; <a href="#">Privacy</a> </p>
      </footer>

    </div><!-- /.container -->

		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="/js/dist/js/bootstrap.min.js"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="/js/assets/js/ie10-viewport-bug-workaround.js"></script>
		<script src="//code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
        <script type="text/javascript">
            $(window).ready(function () {
            	$("#datetimepicker1").datepicker({dateFormat:'yy-mm-dd'});
            	$("#datetimepicker2").datepicker({dateFormat:'yy-mm-dd'});

            	var graph_map = [];
            	var graph_notice = [];
            	var graph_qrcode = [];
            	var graph_cctv = [];
            	var graph_total = [];
            	$('.table-responsive tbody tr').each(function(id){
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
    </body>
</html>
