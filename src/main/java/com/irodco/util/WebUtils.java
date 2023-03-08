package com.irodco.util;

import java.security.Principal;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.irodco.web.security.CustomUserDetails;

public class WebUtils {
	private static final Logger logger = LoggerFactory.getLogger(WebUtils.class);

	public static String getDateAdd(Date date1, int intv, String strtype) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date1);
		cal.add(Calendar.DATE, intv); // add 10 days

		java.text.DateFormat df = new java.text.SimpleDateFormat(strtype);
		return df.format(cal.getTime()).toString();
	}

	public static String getPaging(String url, int page, int tot_size, int list_size, int page_size) {
		int total_page = (tot_size / list_size) + (tot_size % list_size > 0 ? 1 : 0);

		int start_page = (((page - 1) / page_size) * page_size) + 1;
		int tmp_pnum = page_size - 1;
		int end_page = start_page + tmp_pnum;

		logger.debug(String.format("214 %s %s %s", total_page, start_page, end_page));

		StringBuffer html = new StringBuffer();

		if (end_page >= total_page)
			end_page = total_page;
		if (page > 1) {
			html.append(
					"<li><a href='" + url + (1) + "' aria-label='Previous'><span aria-hidden='true'>&lt;</span></a></li>");
		}

		if (start_page > 1) {
			html.append("<li><a href='" + url + (start_page - 1)
					+ "' aria-label='Previous'><span aria-hidden='true'>&lt;</span></a></li>");
		}

		if (total_page > 1) {
			for (int i = start_page; i <= end_page; i++) {
				if (page != i) {
					html.append("<li><a href='" + url + i + "'>" + i + "</a></li>");
				} else {
					html.append("<li><a href='javascript:;'><span style='color:red;'>" + i + "</span></a></li>");
				}
			}
		} else {
			html.append("<li><a href='javascript:;'><span style='color:red;'>1</span></a></li>");
		}

		if (total_page > end_page) {
			html.append("<li><a href='" + url + (end_page + 1)
					+ "' aria-label='Next'><span aria-hidden='true'>&gt;</span></a></li>");
		}

		if (page < total_page) {
			html.append("<li><a href='" + url + (total_page)
					+ "' aria-label='Next'><span aria-hidden='true'>&gt;</span></a></li>");
		}

		return html.toString();
	}

	public static String getAuth(Principal principal) {
		try {
			UsernamePasswordAuthenticationToken c = (UsernamePasswordAuthenticationToken)principal;
			CustomUserDetails d = (CustomUserDetails)c.getDetails();
			
			if ( d.getAuth().equals("ROLE_ADMIN") || d.getAuth().equals("1") ) {
				return "ADMIN";
			} else {
				return "NONE";
			}
		} catch (NullPointerException e) {
			logger.error("84 err {}", e);
		}
		return "NONE";
	}
}
