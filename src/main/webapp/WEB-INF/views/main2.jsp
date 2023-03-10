<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
    <title>Class Breaks Renderer</title>

    <link rel="stylesheet" href="https://js.arcgis.com/3.18/esri/css/esri.css">
    <style>
      html, body, #map{
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script src="https://js.arcgis.com/3.18/"></script>
    <script>
      var map;
      require([
        "esri/map", "esri/layers/FeatureLayer",
        "esri/InfoTemplate", "esri/symbols/SimpleFillSymbol", 
        "esri/renderers/ClassBreaksRenderer",
        "esri/Color", "dojo/dom-style", "dojo/domReady!"
      ], function(
        Map, FeatureLayer,
        InfoTemplate, SimpleFillSymbol, 
        ClassBreaksRenderer,
        Color, domStyle
      ) {
        map = new Map("map", {
          basemap: "streets",
          center: [-98.215, 38.382],
          zoom: 7,
          slider: false
        });

        var symbol = new SimpleFillSymbol();
        symbol.setColor(new Color([150, 150, 150, 0.5]));

        // Add five breaks to the renderer.
        // If you have ESRI's ArcMap available, this can be a good way to determine break values.
        // You can also copy the RGB values from the color schemes ArcMap applies, or use colors
        // from a site like www.colorbrewer.org
        //
        // alternatively, ArcGIS Server's generate renderer task could be used
        var renderer = new ClassBreaksRenderer(symbol, "POP07_SQMI");
        renderer.addBreak(0, 25, new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
        renderer.addBreak(25, 75, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
        renderer.addBreak(75, 175, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
        renderer.addBreak(175, 400, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
        renderer.addBreak(400, Infinity, new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

        var featureLayer = new FeatureLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/3", {
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["*"]
        });
        
        featureLayer.setDefinitionExpression("STATE_NAME = 'Kansas'");
        featureLayer.setRenderer(renderer);
        map.addLayer(featureLayer);
      });
    </script>
  </head>
  
  <body>
    <div id="map"></div>
  </body>

</html>