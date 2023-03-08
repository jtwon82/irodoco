package com.irodco.web.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.irodco.web.mapper.CommonsMapper;
import com.irodco.web.security.CustomUserDetails;

/**
 * Handles requests for the application home page.
 */
//@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpSession session) {
		logger.info("Welcome home! The client locale is {}", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);
		
		CommonsMapper mapper = sqlSession.getMapper(CommonsMapper.class);
		
//		logger.debug("49 {}", mapper.getCodeList(null));


		try {
			Object obj = SecurityContextHolder.getContext().getAuthentication().getDetails();
			if (obj instanceof CustomUserDetails) {
				CustomUserDetails userDetails = (CustomUserDetails) obj;
				model.addAttribute("auth", userDetails);
			}
		} catch (NullPointerException e) {
			logger.error("48 err {}", e);
		}

		return "index";
	}
}
