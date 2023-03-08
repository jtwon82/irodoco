<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
  <head>
    <title>Simple click event</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>

  </head>
  <body>
    <div id="map"></div>
    <script>
		function initMap() {
		  var myLatlng = {lat: ${map.lat}, lng: ${map.lng} };
		
		  var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: ${ map.zoom },
		    center: myLatlng
		  });
		  
		  var trafficLayer = new google.maps.TrafficLayer();
		  trafficLayer.setMap(map);
		
		//   var marker = new google.maps.Marker({
		//     position: myLatlng,
		//     map: map,
		//     title: 'Click to zoom'
		//   });
		
		  map.addListener('center_changed', function() {
// 			  console.log( map.getCenter().lat(), map.getCenter().lng() );
			  
// 		    window.setTimeout(function() {
// 		      map.panTo( myLatlng );
// 		    }, 2000);
		  });
		
		//   marker.addListener('click', function() {
		//     map.setZoom(5);
		//     map.setCenter(marker.getPosition());
		//   });
		}

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8nfeOtilBjtTer2yl8F57iXXWlxZcpLY&signed_in=true&callback=initMap" async defer>
    </script>
  </body>
</html>