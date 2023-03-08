<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>로그인페이지</title>  
</head>
  
<body>
<h2>로그인 </h2>
<form name="form" method="post" action="/loginProcess">
<table>
    <tr height="40px">
        <td>사용자아이디</td>
        <td><input type="text" name="id" value="irodco"></td>
    </tr>
    <tr height="40px">
        <td>패스워드</td>
        <td><input type="password" name="pw" value="password"></td>
    </tr>
</table>
<table>
    <tr>
        <td align="center"><input type="submit" value="로그인"></td>
        <td align="center"><input type="reset" value="리셋"></td>
    </tr>
</table>
</form>
</body>
</html>