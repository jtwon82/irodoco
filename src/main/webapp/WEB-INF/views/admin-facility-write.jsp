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

	<div id="content" dojotype="dijit.layout.BorderContainer" design="headline" gutters="true" style="width: 100%; ">
		<div id="header" dojotype="dijit.layout.ContentPane" region="top" style='height: 45px;'></div>
           <div id="admin-index" class='bodycenter' dojotype="dijit.layout.ContentPane" region="center" style='z-index:0;'>
				<div style=''>
					<div class="page-header">
					  <h1>Facility Modify & Add <small> </small></h1>
					</div>
				</div>
				<br>
				
<form name="form1" action="/admin-facility-proc" method="post" enctype="multipart/form-data">
	<input type="hidden" name="mode" value="${ map.mode }">
	<input type="hidden" name="page" value="${ map.page }">
	<input type="hidden" name="bid" value="${ map.bid }">
				<br>
<!-- 				<div class="input-group"> -->
<!-- 				  <span class="input-group-addon" id="basic-addon2">장비종류</span> -->
<!-- 					  <select name="FCLT_TYPE" data-subname="종류" class="form-control" aria-describedby="basic-addon2" > -->
<!-- 					  <option value="">-- Select --</option> -->
<!-- 					  <option value="1">1</option> -->
<!-- 					  <option value="2">2</option> -->
<!-- 					  <option value="3">3</option> -->
<!-- 					  </select> -->
<!-- 				</div> -->
<!-- 				<br> -->
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Number</span>
				  <input type="text" name="CCTV_ID" data-subname="Number" class="form-control" aria-describedby="basic-addon2" value="${ item.CCTV_ID }" readOnly>
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Name</span>
				  <input type="text" name="CCTV_NM" data-subname="Name" class="form-control" aria-describedby="basic-addon2" value="${ item.CCTV_NM }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Controller Type</span>
				  <input type="text" name="CTLR_TYPE_CD" data-subname="Controller Type" class="form-control" aria-describedby="basic-addon2" value="${ item.CTLR_TYPE_CD }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Location</span>
				  <input type="text" name="FAC_LCTN" data-subname="Location" class="form-control" aria-describedby="basic-addon2" value="${ item.FAC_LCTN }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">IP</span>
				  <input type="text" name="IP" data-subname="IP" class="form-control" aria-describedby="basic-addon2" value="${ item.IP }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">PORT</span>
				  <input type="text" name="PORT" data-subname="PORT" class="form-control" aria-describedby="basic-addon2" value="${ item.PORT }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">LON</span>
				  <input type="text" name="LON" data-subname="LON" class="form-control" aria-describedby="basic-addon2" value="${ item.LON }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">LAT</span>
				  <input type="text" name="LAT" data-subname="LAT" class="form-control" aria-describedby="basic-addon2" value="${ item.LAT }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Controller Version</span>
				  <input type="text" name="CTLR_VER" data-subname="Controller Version" class="form-control" aria-describedby="basic-addon2" value="${ item.CTLR_VER }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">분배서버 URL</span>
				  <input type="text" name="STRM_URL" data-subname="URL" class="form-control" aria-describedby="basic-addon2" value="${ item.STRM_URL }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">WEB URL</span>
				  <input type="text" name="WEB_URL" data-subname="WEB URL" class="form-control" aria-describedby="basic-addon2" value="${ item.WEB_URL }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Android URL</span>
				  <input type="text" name="ANDR_URL" data-subname="Android URL" class="form-control" aria-describedby="basic-addon2" value="${ item.ANDR_URL }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">ISO URL</span>
				  <input type="text" name="IOS_URL" data-subname="ISO URL" class="form-control" aria-describedby="basic-addon2" value="${ item.IOS_URL }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">USE</span>
				  <input type="text" name="USE_YN" data-subname="USE" class="form-control" aria-describedby="basic-addon2" value="${ item.USE_YN }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Login ID</span>
				  <input type="text" name="LGN_ID" data-subname="Login ID" class="form-control" aria-describedby="basic-addon2" value="${ item.LGN_ID }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Login Password</span>
				  <input type="text" name="LGN_PASSWD" data-subname="Login Password" class="form-control" aria-describedby="basic-addon2" value="${ item.LGN_PASSWD }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">Preset NO</span>
				  <input type="text" name="FIX_PSET_NO" data-subname="Preset NO" class="form-control" aria-describedby="basic-addon2" value="${ item.FIX_PSET_NO }">
				</div>
				<br>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon2">교차로 감지여부</span>
				  <input type="text" name="DETECT_YN" data-subname="교차로 감지여부" class="form-control" aria-describedby="basic-addon2" value="${ item.DETECT_YN }">
				</div>
				<br>
				<br>
				<div style="text-align:right;">
					<div class="btn-group" role="group" aria-label="...">
					  <a href="javascript: document.form1.submit();" onclick="return submitChk()" class="btn btn-default" role="button">Save</a>
					  <a href="javascript:history.go(-1);" class="btn btn-default" role="button">Cancel</a>
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
// 			if ( f.FCLT_STATUS.value=='' ){
// 				alert( $(f.FCLT_STATUS).data('subname') +'을 입력해주세요');
// 				return false;
// 			}
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
