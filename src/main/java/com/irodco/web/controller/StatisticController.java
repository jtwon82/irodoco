package com.irodco.web.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.irodco.util.MyExcelView;
import com.irodco.util.WebUtils;
import com.irodco.web.services.CommonsService;
import com.irodco.web.services.StatisticService;

@Controller
public class StatisticController {

	private static final Logger LOGGER = LoggerFactory.getLogger(StatisticController.class);
	
	@Autowired
	CommonsService commonsService; 
	
	@Autowired
	StatisticService statisticService;

	
	
	public StatisticController() {
		// TODO Auto-generated constructor stub
	}

	@RequestMapping("/statistic-day")
	public String statisticDay(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		String sdate = params.get("sdate")==null ? WebUtils.getDateAdd(new Date(), -5, "yyyy-MM-dd"): params.get("sdate") ;
		String edate = params.get("edate")==null ? WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd"): params.get("edate") ;
		String skey = params.get("skey")==null ? "": params.get("skey") ;
		String sval = params.get("sval")==null ? "": params.get("sval") ;
		String CHKDAY = params.get("CHKDAY")==null ? "day": params.get("CHKDAY") ;
		try{
			Map<String, String> param = new HashMap();
			param.put("sdate", sdate);
			param.put("edate", edate);
			param.put("sval", sval);
			param.put("CHKDAY", CHKDAY);

			if ( principal!=null ){
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			if(CHKDAY.equals("day")){
				model.addAttribute("list", statisticService.getStatisticDayList(param));
			}else{
				model.addAttribute("list", statisticService.getStatisticHourList(param));
			}
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			
		}catch(NullPointerException e){
			LOGGER.error(String.format("55 err %s", e));
		}
		return "statistic-day";
	}

	@RequestMapping(value="/statistic-day-excel" )
	public ModelAndView statisticDayExcel( @RequestParam Map<String, String> params, HttpServletResponse response) {
		String sdate = params.get("sdate")==null ? WebUtils.getDateAdd(new Date(), -5, "yyyy-MM-dd"): params.get("sdate") ;
		String edate = params.get("edate")==null ? WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd"): params.get("edate") ;
		String skey = params.get("skey")==null ? "": params.get("skey") ;
		String sval = params.get("sval")==null ? "": params.get("sval") ;
		String CHKDAY = params.get("CHKDAY")==null ? "day": params.get("CHKDAY") ;

		List<Map <String,String>> list = null;
		Map<String, Object> model1 = new HashMap<String, Object>();
		
		try{
			Map<String, String> param = new HashMap();
			param.put("sdate", sdate);
			param.put("edate", edate);
			param.put("sval", sval);
			param.put("CHKDAY", CHKDAY);

		    //Sheet Name
		    model1.put("sheetname", "TestSheetName");

		    //Headers List
		    List<String> headers1 = new ArrayList<String>();
		    headers1.add("DATE");
		    headers1.add("MAP-WEB");
		    headers1.add("MAP-MOB");
		    headers1.add("NOTICE-WEB");
		    headers1.add("NOTICE-MOB");
		    headers1.add("QRCODE-WEB");
		    headers1.add("QRCODE-MOB");
		    headers1.add("CCTV-WEB");
		    headers1.add("CCTV-MOB");
		    headers1.add("TOTAL");
		    model1.put("headers", headers1);
		    
		    //List
		    if(CHKDAY.equals("day")){
				list = statisticService.getStatisticDayList(param);
			}else{
				list = statisticService.getStatisticHourList(param);
			}
		    model1.put("list",list);
		    
		    response.setContentType( "application/ms-excel" );
	        response.setHeader( "Content-disposition", "attachment; filename=Statics-"+ new Random().nextInt() +".xls" );

		}catch(NullPointerException e){
			LOGGER.error(String.format("55 err %s", e));
		}
		return new ModelAndView(new MyExcelView(), model1);
	}

	@RequestMapping("/statistic-cctv")
	public String statisticCCTV(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		try{
			String sdate = params.get("sdate")==null ? WebUtils.getDateAdd(new Date(), -5, "yyyy-MM-dd"): params.get("sdate") ;
			String edate = params.get("edate")==null ? WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd"): params.get("edate") ;
			String skey = params.get("skey")==null ? "": params.get("skey") ;
			String sval = params.get("sval")==null ? "": params.get("sval") ;
			
			Map<String, String> param = new HashMap();
			param.put("sdate", sdate);
			param.put("edate", edate);
			param.put("sval", sval);

			if ( principal!=null ){
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("list", statisticService.getCCTVStatisticList(param));
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());

		}catch(NullPointerException e){
			LOGGER.error(String.format("55 err %s", e));
		}
		
		return "statistic-cctv";
	}
	
	
}
