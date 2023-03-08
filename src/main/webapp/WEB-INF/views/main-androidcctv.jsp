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
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script type="text/javascript" src="/js/player/jwplayer.js"></script>
		<script type="text/javascript">jwplayer.key="mkMbCfvoyQF92pS9SCse47lYfk+8L7RlFGgaEe6o5r8=";</script>

		<script type="text/javascript">
		$(document).ready(function(){
			var player = jwplayer("gallery");
			player.setup({
// 				html5player: "/js/player/jwplayer.html5.js",
// 				flashplayer: "/js/player/jwplayer.flash.swf",
				provider: 'rtmp',
				streamer: '${ map.strimurl }',
					width: 410,
				  	allowfullscreen: false,
			        autostart: true,
			        controls: true,
			        androidhls: true,
			        events:{
			        	onComplete: function(){ console.log('complate'); },
			  	    	onPause: function(){ console.log('pause'); },
			  	    	onError: function(){ console.log('err'); }
			    	},
			    	empty:''
			});
		});
		</script>
  </head>
  <body>
	<div id="gallery"></div>
	<audio controls autoplay="autoplay">
		<source src="${ map.strimurl }" ></audio>
  </body>
</html>