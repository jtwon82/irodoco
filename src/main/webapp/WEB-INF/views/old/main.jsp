<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.*,com.irodco.mybatis.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>main</title>
</head
>
<body>
<form  method="post" action="/controller/insert">
	<table border="1">
		<tr>
			<td>이름</td>
			<td>이메일</td>
			<td>전화번호</td>
			<td></td>
		</tr>
		<tr>
			<td><input type="text" name="name" id="name"></td>
			<td><input type="text" name="email" id="email"></td>
			<td><input type="text" name="phone" id="phone"></td>
			<td colspan="2" align="center">
			<input type="submit" value="추가">
			</td>

		</tr>
		<c:forEach items="${result}" var="member">
			<tr>
				<td>${member.toString()}</td>
				<td><input type="button" value="수정" onclick=""> <input
					type="button" value="삭제"></td>
			</tr>
		</c:forEach>
	</table>

</form>
</body>
</html>