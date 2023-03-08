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
        <link rel="stylesheet" type="text/css" href="/js/src/main.css?st=${ Math.random() }">
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
					<li class="dropdown"><a href="javascript:;"
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
           <div id="admin-index" class='bodycenter' dojotype="dijit.layout.ContentPane" region="center" style='z-index:0;'>
				<div style=''>
					<div class="page-header">
					  <h1>Facility Maintenance View<small> </small></h1>
					</div>
				</div>
				<br>
<form name="form1" action="/admin-facility-history-proc" method="post" enctype="multipart/form-data">
	<input type="hidden" name="mode" value="${ map.mode }">
	<input type="hidden" name="page" value="${ map.page }">
	<input type="hidden" name="bid" value="${ map.bid }">
	<input type="hidden" name="CCTV_ID" value="${ map.CCTV_ID }">
				<div class="page-header">
				  <h1>FACILITY ID <small>${ map.CCTV_ID }</small></h1>
				</div>

				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">ID</span>
					<p type="text" class="form-control">${ item.HIST_ID }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Maintenance Type</span>
					<p type="text" class="form-control">${ item.HIST_TYPE_STR }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Check Type</span>
					<p type="text" class="form-control">${ item.HIST_STATUS }</p>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Comment</span>
					<p type="text" class="form-control">${ item.HIST_COMMENT }</p>
				</div>
				<br>
				<br>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
					  <a href="admin-facility-history-write?mode=update&page=${ map.page }&bid=${ map.bid }&CCTV_ID=${ map.CCTV_ID }" class="btn btn-default" role="button">Modify</a>
					  <a href="admin-facility-history?page=${ map.page }&CCTV_ID=${ map.CCTV_ID }" class="btn btn-default" role="button">List</a>
					</div>
				</div>
</form>
            </div>

      <!-- FOOTER -->
      <footer class='bodycenter' style='height:50px;'>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2016 IRODCO &middot; <a href="#">Privacy</a> </p>
      </footer>

    </div><!-- /.container -->
	<script type="text/javascript">
		function submitChk(){
			var f = document.form1;
			if ( f.HIST_TYPE.value=='' ){
				alert( $(f.HIST_TYPE).data('subname') +'을 입력해주세요.');
				return false;
			}
			if ( f.HIST_STATUS.value=='' ){
				alert( $(f.HIST_STATUS).data('subname') +'을 입력해주세요.');
				return false;
			}
			if ( f.HIST_COMMENT.value=='' ){
				alert( $(f.HIST_COMMENT).data('subname') +'을 입력해주세요');
				return false;
			}
			return true;
		}
	</script>

		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="/js/dist/js/bootstrap.min.js"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="/js/assets/js/ie10-viewport-bug-workaround.js"></script>
    </body>
</html>
