/**************************************************************
	1. 버          전 : ver 1.0
	2. 파    일    명	: common.js
	3. 업무 시스템 명	: 공통모듈
	4. 원  도  우  명	: 공통인클루드 파일
	5. 프로그램  개요	: 공통 js
	6. 작    성    자	: 길기용(2011.01.03)
	7. 수    정    자	: 
 **************************************************************/

/*********************************************************
내    용: jQuery 기반의 selectbox 동적 생성
파라미터: url		    - 오픈할 윈도우 url
		    width	    - 가로넓이
		    height      - 세로높이

리 턴 값: 없음
참고사항: 
*********************************************************/
function gf_makeSelectBox(id, codeValue)
{
	
	$("#" + id).empty();
	var valueList = codeValue.split("@@");
	
	for(var i=0; i<valueList.length; i++){
		var dataList = valueList[i].split("##");
		
		$("#" + id).append("<option value='" + dataList[0] + "'>" + dataList[1] + "</option>");
	}
	
	if($("#" + id + " option").size() > 0){
		$("#" + id + " option:first").attr("selected", "selected");
	}
}

/*********************************************************
내    용: View 페이지 처리
파라미터: 없음
리 턴 값: 없음
참고사항: 
 *********************************************************/
function gf_readonly()
{
	
	// text readonly 처리
	$("input:text").each(function(){
		$(this).attr("readonly", true);
	});
	
	// select disable 처리
	$("select").each(function(){
		$(this).attr("disabled", true);
	});
	
	// checkbox disable 처리
	$("input:checkbox").each(function(){
		$(this).attr("disabled", true);
	});
	
	// checkbox disable 처리
	$("textarea").each(function(){
		$(this).attr("readonly", true);
	});
}

/*********************************************************
내    용: 지정한 사이즈의 팝업 오픈
파라미터: url		    - 오픈할 윈도우 url
		    width	    - 가로넓이
		    height      - 세로높이

리 턴 값: 없음
참고사항: 
*********************************************************/
function gf_openWindow(url, ls_width, ls_height)
{
	
	var posx      = (screen.availWidth - ls_width) / 2 - 1;
	var posy      = (screen.availHeight - ls_height) / 2 - 1;
	var position  = "";
	var winset    = "";
	
	// = 'width=' + ls_width + ',height=' + ls_height + ',top=' + posy + ',left=' + posx;
	position = 'width=' + ls_width + ',height=' + ls_height + ',top=' + posy + ',left=' + posx;
	winset = ',resizable=yes,center=yes,menubar=no,scrollbars=no,status=yes,titlebar=no,toolbar=no,' + position;	    
	window.open(url, '_blank', winset);
}

/*********************************************************
내    용: 지정한 사이즈의 팝업 오픈
파라미터: url		    - 오픈할 윈도우 url
		    width	    - 가로넓이
		    height      - 세로높이

리 턴 값: 없음
참고사항: 
 *********************************************************/
function gf_openWindowForName(url, ls_width, ls_height, winName)
{
	var posx      = screen.availWidth - ls_width - 30;
	var position  = "";
	var winset    = "";
	
	// = 'width=' + ls_width + ',height=' + ls_height + ',top=' + posy + ',left=' + posx;
	position = 'width=' + ls_width + ',height=' + ls_height + ',top=0,left=' + posx;
	winset = ',resizable=yes,center=yes,menubar=no,scrollbars=no,status=yes,titlebar=no,toolbar=no,' + position;	    
	return window.open(url, winName, winset);
}

/*********************************************************
내    용: 지정한 사이즈의 팝업 오픈
파라미터: url		    - 오픈할 윈도우 url
		    width	    - 가로넓이
		    height      - 세로높이

리 턴 값: 없음
참고사항: 
 *********************************************************/
function gf_openWindowScroll(url, ls_width, ls_height)
{
	
	var posx      = (screen.availWidth - ls_width) / 2 - 1;
	var posy      = (screen.availHeight - ls_height) / 2 - 1;
	var position  = "";
	var winset    = "";
	
	// = 'width=' + ls_width + ',height=' + ls_height + ',top=' + posy + ',left=' + posx;
	position = 'width=' + ls_width + ',height=' + ls_height + ',top=' + posy + ',left=' + posx;
	winset = ',resizable=yes,center=yes,menubar=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no,' + position;	    
	window.open(url, '_blank', winset);
}

/*********************************************************
  내    용: 전체 화면 팝업윈도우 오픈
  파라미터: url		    - 오픈할 윈도우 url
		    width	    - 가로넓이
		    height      - 세로높이

  리 턴 값: 없음
  참고사항: 
 *********************************************************/
function gf_openWindow_full(url)
{
	
	var pWidth = screen.width - 20;
	var pHeight = screen.height - 100;
	
	var winset = 'resizable=yes,center=yes,menubar=no,left=0,top=0,scrollbars=no,status=yes,titlebar=no,toolbar=no,height=' + pHeight + ',width=' + pWidth;	    
	window.open(url, '', winset);
}

/*********************************************************
내    용: 모달 팝업윈도우 오픈
파라미터: url		- 오픈할 윈도우 url
		  width	    - 가로넓이
		  height    - 세로높이
		  ls_param  - 모달창에 전달할 파라미터

리 턴 값: 없음
참고사항: 
*********************************************************/
function gf_openWindow_modal(url, ls_width, ls_height, ls_param)
{
	var position  = "";
	var winset    = "";
	var ls_rtnVal = "";
	
	position = 'dialogWidth:' + ls_width + 'px;' + 'dialogHeight:' + ls_height + 'px;';
    winset = 'resizable:yes;center:yes;help:no;status:yes;scroll:no;' + position;
    ls_rtnVal = window.showModalDialog(url,ls_param,winset);

	if(ls_rtnVal == null || ls_rtnVal.length == 0)  return "";
    return ls_rtnVal;	
	
}

/*********************************************************
내    용: 모달 팝업윈도우 오픈
파라미터: url		- 오픈할 윈도우 url
		  width	    - 가로넓이
		  height    - 세로높이
		  ls_param  - 모달창에 전달할 파라미터

리 턴 값: 없음
참고사항: 
*********************************************************/
function gf_openWindow_modal_full(url, ls_param)
{
	
	var pWidth = screen.width - 20;
	var pHeight = screen.height - 100;
	
	var position  = "";
	var winset    = "";
	var ls_rtnVal = "";
	
	position = 'dialogWidth:' + pWidth + 'px;' + 'dialogHeight:' + pHeight + 'px;';
    winset = 'resizable:yes;center:yes;help:no;status:yes;scroll:no;' + position;
    ls_rtnVal = window.showModalDialog(url,ls_param,winset);

	if(ls_rtnVal == null || ls_rtnVal.length == 0)  return "";
    return ls_rtnVal;	
	
}


/**************************************************************
  내    용: 쿠키로부터 값을 읽어오는 함수
  파라미터: keyname - 쿠키로부터 얻어내고 싶은 값의 키이름
  리 턴 값: 문자열의 반환값
  참고사항: 
 **************************************************************/
function getCookie(keyname)
{
	tmp=document.cookie + ";";
	index1=tmp.indexOf(keyname, 0);
	if(index1 !=-1)
	{
		tmp=tmp.substring(index1,tmp.length);
		index2=tmp.indexOf("=",0) + 1;
		index3=tmp.indexOf(";",index2);
		return(unescape(tmp.substring(index2,index3)));
	}
	return("");
	
}

/**************************************************************
  내    용: 쿠키의 값을 입력하는 함수
  파라미터: keyname, val - 쿠키로부터 얻어내고 싶은 값의 키이름, 매개변수
  리 턴 값: 문자열의 반환값
  참고사항: 
 **************************************************************/
function setCookie(keyname, val)
{
	tmp=keyname + "=" + escape(val) + ";";
	document.cookie = tmp;
	
}

/*********************************************************
  내    용: 문자열길이 리턴
  파라미터: obj       - 문자열 길이를 체크할 객체
            maxLen    - 최대 문자열 길이
  리 턴 값: true(길이초과), false(정상)
  참고사항: 없음
 *********************************************************/
function gf_korEngLenCheck(obj, maxLen)
{
  var cnt, len;
  
  len = 0;
  
  for(cnt=0 ; cnt<obj.value.length; cnt++ ) {
    if( obj.value.charCodeAt(cnt) > 255 ) len += 2;  
    else len++;  
  }
  if( len > maxLen ) {
    if(!obj.disabled) {
      obj.focus();
      obj.select();
    }
    return true;
  }
  return false;
}
/*
' ------------------------------------------------------------------
' Function    : fc_chk_byte(aro_name)
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      : 
' ------------------------------------------------------------------
*/
function uf_ValidationCheck(aro_name,ari_max)
{

   var ls_str     = aro_name.value; // 이벤트가 일어난 컨트롤의 value 값
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var li_max      = ari_max; // 제한할 글자수 크기
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var li_len      = 0;  // substring하기 위해서 사용
   var ls_one_char = ""; // 한글자씩 검사한다
   var ls_str2     = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

   for(i=0; i< li_str_len; i++)
   {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4)
      {
         li_byte += 2;
      }
      // 그밗의 경우는 1을 더한다.
      else
      {
         li_byte++;
      }

      // 전체 크기가 li_max를 넘지않으면
      if(li_byte <= li_max)
      {
         li_len = i + 1;
      }
   }
   
   // 전체길이를 초과하면
   if(li_byte > li_max)
   {
      alert( " 영문 "+ li_max + "글자, 한글 "+ li_max/2+"글자를 \n 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
      ls_str2 = ls_str.substr(0, li_len);
      aro_name.value = ls_str2;
      
   }
   aro_name.focus();

}


/*********************************************************
  내    용: 문자열길이 리턴
  파라미터: obj       - 문자열 길이를 체크할 객체
            maxLen    - 최대 문자열 길이
  리 턴 값: true(길이초과), false(정상)
  참고사항: 없음
 *********************************************************/
function gf_SpecialTextCheck(obj)
{
	var checkText = obj.value;
	
	/** 특수문자가 있는지를 알기위해 **/
	var char1 = checkText.indexOf('+', 0);		
	var char2 = checkText.indexOf('#', 0);		
	var char3 = checkText.indexOf('%', 0);		
	var char4 = checkText.indexOf('&', 0);
	var char5 = checkText.indexOf('~', 0);
	var char6 = checkText.indexOf('`', 0);
	var char7 = checkText.indexOf('!', 0);
	var char8 = checkText.indexOf('@', 0);
	var char9 = checkText.indexOf('#', 0);
	var char10 = checkText.indexOf('$', 0);
	var char11 = checkText.indexOf('^', 0);		
	var char12 = checkText.indexOf('*', 0);		
	var char13 = checkText.indexOf('(', 0);		
	var char14 = checkText.indexOf(')', 0);
//	var char15 = checkText.indexOf('-', 0);
	var char16 = checkText.indexOf('_', 0);
	var char17 = checkText.indexOf('=', 0);
	var char18 = checkText.indexOf('{', 0);
	var char19 = checkText.indexOf('}', 0);
	var char20 = checkText.indexOf('[', 0);
	var char21 = checkText.indexOf(']', 0);		
	
	var char23 = checkText.indexOf('|', 0);		
	var char24 = checkText.indexOf("'", 0);
	var char25 = checkText.indexOf('"', 0);
	var char26 = checkText.indexOf(':', 0);
	var char27 = checkText.indexOf(';', 0);
	var char28 = checkText.indexOf('?', 0);
	var char29 = checkText.indexOf('/', 0);
	var char30 = checkText.indexOf('.', 0);
	var char31 = checkText.indexOf('>', 0);		
	var char32 = checkText.indexOf('<', 0);		
	var char33 = checkText.indexOf(',', 0);		

	if(char1 != -1 || char2 != -1 || char3 != -1 || char4 != -1 || char5 != -1 ||
		char6 != -1 || char7 != -1 || char8 != -1 || char9 != -1 || char10 != -1 ||
		char11 != -1 || char12 != -1 || char13 != -1 || char14 != -1 || 
		char16 != -1 || char17 != -1 || char18 != -1 || char19 != -1 || char20 != -1 ||
		char21 != -1 || char23 != -1 || char24 != -1 || char25 != -1 ||
		char26 != -1 || char27 != -1 || char28 != -1 || char29 != -1 || char30 != -1 ||
		char31 != -1 || char32 != -1 || char33 != -1)
	{
		alert("특수문자는 등록할 수 없습니다. 다시 입력해 주십시오.");
		obj.focus();
		obj.select();
		
		return;
	}
}

/*********************************************************
  내    용: 3개월전 날짜를 가져옴
  파라미터: 
  리 턴 값: true(길이초과), false(정상)
  참고사항: 없음
 *********************************************************/
function gf_common_3MonthPostDate()
{
	today = new Date();

	var Y = today.getFullYear();
	var M = today.getMonth() - 2;
	var D = today.getDate();

	if(M < 10)
	{
		switch(M)
		{
		  case -2:
				M = "10";
				Y = Y-1;
				break;
			case -1:
				M = "11";
				Y = Y-1;
				break;
			case 0:
				M = "12";
				Y = Y-1;
				break;
			case 1:
				M = "01";
				break;
			case 2:
				M = "02";
				break;
			case 3:
				M = "03";
				break;
			case 4:
				M = "04";
				break;
			case 5:
				M = "05";
				break;
			case 6:
				M = "06";
				break;
			case 7:
				M = "07";
				break;
			case 8:
				M = "08";
				break;
			case 9:
				M = "09";
				break;
		}
	}
	if(D < 10)
	{
		switch(D)
		{
			case 1:
				D = "01";
				break;
			case 2:
				D = "02";
				break;
			case 3:
				D = "03";
				break;
			case 4:
				D = "04";
				break;
			case 5:
				D = "05";
				break;
			case 6:
				D = "06";
				break;
			case 7:
				D = "07";
				break;
			case 8:
				D = "08";
				break;
			case 9:
				D = "09";
				break;
		}
	}	

	var rtDate = Y + "" + M + "" + D;
	
	return rtDate;
}

/*********************************************************
  내    용: 2개월전 날짜를 가져옴
  파라미터: 
  리 턴 값: true(길이초과), false(정상)
  참고사항: 없음
 *********************************************************/
function gf_common_2MonthPostDate()
{
	today = new Date();

	var Y = today.getFullYear();
	var M = today.getMonth() - 1;
	var D = today.getDate();


	if(M < 10)
	{
		switch(M)
		{
			case -1:
				M = "11";
				Y = Y-1;
				break;
			case 0:
				M = "12";
				Y = Y-1;
				break;
			case 1:
				M = "01";
				break;
			case 2:
				M = "02";
				break;
			case 3:
				M = "03";
				break;
			case 4:
				M = "04";
				break;
			case 5:
				M = "05";
				break;
			case 6:
				M = "06";
				break;
			case 7:
				M = "07";
				break;
			case 8:
				M = "08";
				break;
			case 9:
				M = "09";
				break;
		}
	}
	if(D < 10)
	{
		switch(D)
		{
			case 1:
				D = "01";
				break;
			case 2:
				D = "02";
				break;
			case 3:
				D = "03";
				break;
			case 4:
				D = "04";
				break;
			case 5:
				D = "05";
				break;
			case 6:
				D = "06";
				break;
			case 7:
				D = "07";
				break;
			case 8:
				D = "08";
				break;
			case 9:
				D = "09";
				break;
		}
	}	

	var rtDate = Y + "" + M + "" + D;
	return rtDate;
}
/*********************************************************
  내    용: 오늘날짜를 가져옴
  파라미터: 
  리 턴 값: true(길이초과), false(정상)
  참고사항: 없음
 *********************************************************/
function gf_TodayDate()
{
	today = new Date();

	var Y = today.getFullYear();
	var M = today.getMonth() + 1;
	var D = today.getDate();

	if(M < 10)
	{
		switch(M)
		{
			case 1:
				M = "01";
				break;
			case 2:
				M = "02";
				break;
			case 3:
				M = "03";
				break;
			case 4:
				M = "04";
				break;
			case 5:
				M = "05";
				break;
			case 6:
				M = "06";
				break;
			case 7:
				M = "07";
				break;
			case 8:
				M = "08";
				break;
			case 9:
				M = "09";
				break;
		}
	}
	if(D < 10)
	{
		switch(D)
		{
			case 1:
				D = "01";
				break;
			case 2:
				D = "02";
				break;
			case 3:
				D = "03";
				break;
			case 4:
				D = "04";
				break;
			case 5:
				D = "05";
				break;
			case 6:
				D = "06";
				break;
			case 7:
				D = "07";
				break;
			case 8:
				D = "08";
				break;
			case 9:
				D = "09";
				break;
		}
	}	

	var rtDate = Y + "" + M + "" + D;
	
	return rtDate;
}

/*********************************************************
  내    용: 파일명에 들어 갈 수 없는 특수문자 제거
  파라미터: ls_fileName
  리 턴 값: 특수문자를 제거한 String에 "_일자"를 추가하여 리턴
  참고사항: 파일명으로 사용할 수 없는 특수문자는 다음과 같다
            \ / : * ? " <> |
 *********************************************************/
function gf_delSpecialChar(ls_fileName)
{
  /* 오늘 날짜를 구한다 */
  var ls_date  = new Date();
  var ls_year  = ls_date.getYear();
  var ls_month = (ls_date.getMonth())+1;
  var ls_day   = ls_date.getDate();  
  
  /* 구한 날짜의 달과 일이 1자리수 이면 2자리로 만든다 */
  if(ls_month < 10) ls_month = "0"+ls_month;
  if(ls_day < 10)   ls_day   = "0"+ls_day;
  
  var ls_char   = ""; //한문자를 임시로 담을 변수
  var ls_rtnStr = ""; //특수문자를 제거한 문자열을 담을 변수
  
  for(var i=0; i<ls_fileName.length; i++) {
    ls_char = ls_fileName.charAt(i);
    if(ls_char == '/' ||
       ls_char == ':' ||
       ls_char == '*' ||
       ls_char == '?' ||
       ls_char == '"' ||
       ls_char == '<' ||
       ls_char == '>' ||
       ls_char == '|') continue;
     
     ls_rtnStr += ls_char;
  }
  return (ls_rtnStr + "_" + ls_year+ls_month+ls_day);
  
}

/*********************************************************
내    용: ie6 이미지 투명처리를 위한 Function
파라미터: obj
리 턴 값: 
참고사항: 
*********************************************************/
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image')";
	obj.src='';
	return '';
}

/*********************************************************
내      용: 숫자에 , 처리
파라미터: 
리  턴 값: 컴마를 처리한 숫자
참고사항: 
*********************************************************/
function addComma(n) {
	var numchk = /[0-9]/;
	if(numchk.test(n) == true){
		var reg = /(^[+-]?\d+)(\d{3})/;
		n += '';
		
		while (reg.test(n)) {
			n = n.replace(reg, '$1' + ',' + '$2');
		}	
	}
	
	return n;
}