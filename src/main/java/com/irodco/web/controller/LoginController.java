package com.irodco.web.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.irodco.web.security.CustomUserDetails;

@Controller
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public void login(HttpSession session) {
		logger.info("24 {}", session.getId());
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpSession session) {
		Object obj = session.getAttribute("userLoginInfo");
		if (obj instanceof CustomUserDetails) {
			CustomUserDetails userDetails = (CustomUserDetails) obj;

			logger.info("33 {}, {}", session.getId(), userDetails.getUsername());

			session.invalidate();
		}
	}

	@RequestMapping(value = "/login_success", method = RequestMethod.GET)
	public void login_success(HttpSession session) {
		Object obj = SecurityContextHolder.getContext().getAuthentication().getDetails();
		if (obj instanceof CustomUserDetails) {
			CustomUserDetails userDetails = (CustomUserDetails) obj;

			logger.info(String.format("45 ssn=%s, id=%s, pw=%s", session.getId(),
					userDetails.getUsername(), userDetails.getPassword().toString()));

			session.setAttribute("userLoginInfo", userDetails);
		}
	}

	@RequestMapping(value = "/login_duplicate", method = RequestMethod.GET)
	public void login_duplicate() {
		logger.info("54 login_duplicate!");
	}

}