<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

			<!-- header -->
			<div class="header_bg">
			<div class="wrap">
				<div class="header">
					<div class="logo"><h1><a href="/"><img src="/images/logo.png" alt=""/></a></h1></div>
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
										<li><a href="/"><spring:message code="menu.name.index"/></a></li>
										<li><a href="/page/1"><spring:message code="menu.name.page"/></a></li>
										<li><a href="/main">MAPCONTROL</a></li>
										<li><a href="/notice"><spring:message code="menu.name.board"/></a></li>
										<c:if test="${ auth eq 'ADMIN' }">
										<li><a href="/statistic-day">Statistic</a></li>
										<li><a href="/admin-facility">CCTV</a></li>
										<li><a href="/admin-facility-history">Facility</a></li>
										</c:if>
									</ul>
								</nav>
						</div>
					<!------start-768px-menu---->

						<div class="header_sub">
							<div class="h_menu">
								<ul>
									<li class="${ menu=='index'? 'active':'' }"><a href="/"><spring:message code="menu.name.index"/></a></li>
									<li class="${ menu=='company'? 'active':'' }"><a href="/page/1"><spring:message code="menu.name.page"/></a></li>
									<li class="${ menu=='main'? 'active':'' }"><a href="/main">MAPCONTROL</a></li>
									<li class="${ menu=='notice'? 'active':'' }"><a href="/notice"><spring:message code="menu.name.board"/></a></li>
									<c:if test="${ auth eq 'ADMIN' }">
									<li class="${ menu=='statistic'? 'active':'' }"><a href="/statistic-day">Statistic</a></li>
									<li class="${ menu=='cctv'? 'active':'' }"><a href="/admin-facility">CCTV</a></li>
									<li class="${ menu=='qrcode'? 'active':'' }"><a href="/admin-qrcode">QRCODE</a></li>
									<li class="${ menu=='history'? 'active':'' }"><a href="/admin-facility-history">Facility</a></li>
									</c:if>
								</ul>
							</div>
							<div class="t_menu">
									<spring:message code="menu.name.lang"/>
									<c:choose>
									<c:when test="${ auth eq 'ADMIN' }">
										<a href="/logout"><img src="/images/arrow_btnh.png">Logout</a>
									</c:when>
									<c:otherwise>
										<a href="/login"><img src="/images/arrow_btnh.png">Login</a>
									</c:otherwise>
									</c:choose>
							</div>
							<div class="clear"> </div>
						</div>
				</div>
			</div>
			<!-- //nav -->
