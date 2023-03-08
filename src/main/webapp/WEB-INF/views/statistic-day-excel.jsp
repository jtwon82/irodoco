<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="application/vnd.ms-excel;charset=euc-kr">
    </head>
    <body class="claro">
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
    </body>
</html>
