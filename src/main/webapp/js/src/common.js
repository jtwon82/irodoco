

	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var mobile = false;
	var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			mobile=true;
			break;
		}
	}
	$(document).ready(function(){
		if ( mobile ){
			$(".t_menu").hide();
			$('nav#menu-left').mmenu();
		}
	});
	
	var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			mobile = mobileKeyWords[word];
			break;
		}
	}
	function trace(trace_type){
		$("body").append( "<iframe style='display:none;' src='/ajax-statics?STATICS_TYPE="+trace_type+"&PLATFORM="+ (mobile?'MOBILE':'WEB') +"'></iframe>" );
	}
	
	function dump( v ) {
	    howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
	    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;


	    var vType = typeof v;
	    var out = vType;

	    switch (vType) {
	        case "number":
	        case "boolean":
	            out += ": " + v;
	            break;
	        case "string":
	            out += "(" + v.length + '): "' + v + '"';
	            break;
	        case "object":
	            if (v === null) {
	                out = "null";

	            }
	            else if (Object.prototype.toString.call(v) === '[object Array]') {  
	                out = 'array(' + v.length + '): {\n';
	                for (var i = 0; i < v.length; i++) {
	                    out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " + 
	                        dump(v[i], "none", recursionLevel + 1) + "\n";
	                }
	                out += repeatString('   ', recursionLevel) + "}";
	            }
	            else { //if object    
	                sContents = "{\n";
	                cnt = 0;
	                for (var member in v) {
	                    sContents += repeatString('   ', recursionLevel) + "   " + member +
	                        ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
	                    cnt++;
	                }
	                sContents += repeatString('   ', recursionLevel) + "}";
	                out += "(" + cnt + "): " + sContents;
	            }
	            break;
	    }

	    if ( isChrome ) {
	        console.log(v);
	    }else{
	        var pre = document.createElement('pre');
	        pre.innerHTML = out;
	        document.body.appendChild(pre)
	    }

	    return out;
	}
	function repeatString(str, num) {
	    out = '';
	    for (var i = 0; i < num; i++) {
	        out += str; 
	    }
	    return out;
	}

	 function showmap() { 
	  if(document.all.spot.style.visibility=="hidden") {
	    document.all.spot.style.visibility="visible";
	    return false;
	  }
	  if(document.all.spot.style.visibility=="visible") {
	   document.all.spot.style.visibility="hidden";
	   return false;
	  }
	 }
	 
	 var esriExtentToLatLngBounds = function(a) {
		 a = esri.geometry.webMercatorToGeographic(a);
		 return a;
//	        return new google.maps.LatLngBounds(new google.maps.LatLng(a.ymin, a.xmin, true), new google.maps.LatLng(a.ymax, a.xmax, true))
	 }
	 
	 if (!Array.prototype.forEach) {

		  Array.prototype.forEach = function(callback, thisArg) {

		    var T, k;

		    if (this === null) {
		      throw new TypeError(' this is null or not defined');
		    }

		    // 1. O를 인수로서 |this| 값을 전달한
		    // toObject() 호출의 결과이게 함.
		    var O = Object(this);

		    // 2. lenValue를 "length" 인수가 있는 O의 Get()
		    // 내부 메소드 호출의 결과이게 함.
		    // 3. len을 toUint32(lenValue)이게 함.
		    var len = O.length >>> 0;

		    // 4. isCallable(callback)이 false인 경우, TypeError 예외 발생.
		    // 참조: http://es5.github.com/#x9.11
		    if (typeof callback !== "function") {
		      throw new TypeError(callback + ' is not a function');
		    }

		    // 5. thisArg가 공급됐다면, T를 thisArg이게 함;
		    // 아니면 T를 undefined이게 함.
		    if (arguments.length > 1) {
		      T = thisArg;
		    }

		    // 6. k를 0이게 함
		    k = 0;

		    // 7. 반복, k < len일 동안
		    while (k < len) {

		      var kValue;

		      // a. Pk를 ToString(k)이게 함.
		      //    이는 in 연산자의 좌변(LHS) 피연산자에 대한 묵시(implicit)임
		      // b. kPresent를 Pk 인수가 있는 O의 HasProperty
		      //    내부 메소드 호출의 결과이게 함.
		      //    이 과정은 c와 결합될 수 있음
		      // c. kPresent가 true인 경우, 그러면
		      if (k in O) {

		        // i. kValue를 인수 Pk가 있는 O의 Get 내부
		        // 메소드 호출의 결과이게 함.
		        kValue = O[k];

		        // ii. this 값으로 T 그리고 kValue, k 및 O을 포함하는
		        // 인수 목록과 함께 callback의 call 내부 메소드 호출.
		        callback.call(T, kValue, k, O);
		      }
		      // d. k를 1씩 증가.
		      k++;
		    }
		    // 8. undefined 반환
		  };
		}
	 
	 var Map = function () {
		    this.map = new Object();
		};
		Map.prototype = {
		    put: function (key, value) {
		        this.map[key] = value;
		    },
		    get: function (key) {
		        return this.map[key];
		    },
		    containsKey: function (key) {
		        return key in this.map;
		    },
		    containsValue: function (value) {
		        for (var prop in this.map) {
		            if (this.map[prop] == value) return true;
		        }
		        return false;
		    },
		    isEmpty: function (key) {
		        return (this.size() == 0);
		    },
		    clear: function () {
		        for (var prop in this.map) {
		            delete this.map[prop];
		        }
		    },
		    remove: function (key) {
		        delete this.map[key];
		    },
		    keys: function () {
		        var keys = new Array();
		        for (var prop in this.map) {
		            keys.push(prop);
		        }
		        return keys;
		    },
		    values: function () {
		        var values = new Array();
		        for (var prop in this.map) {
		            values.push(this.map[prop]);
		        }
		        return values;
		    },
		    size: function () {
		        var count = 0;
		        for (var prop in this.map) {
		            count++;
		        }
		        return count;
		    }
		};
		var map = new Map();
		var map_incident = new Map();
		var map_cctv = new Map();

		

		