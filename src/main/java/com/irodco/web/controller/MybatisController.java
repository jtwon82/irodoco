package com.irodco.web.controller;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.irodco.mybatis.MemberDAOService;
import com.irodco.web.models.Tb_User;

//@Controller
public class MybatisController {

	private static final Logger logger = LoggerFactory.getLogger(MybatisController.class);

	@Autowired
	private MemberDAOService memberDAOService;

	// ���� ����ȭ��.
	@RequestMapping("/main")
	public ModelAndView main(Locale locale, Model model) {
		logger.info("Welcome main.", locale);

		// view ȭ���� main.jsp�� DB�κ��� �о�� �����͸� �����ش�.
		ModelAndView result = new ModelAndView();
		// addObject view�� �Ѿ�� ������
		List<Tb_User> memberList = memberDAOService.getMembers();
		result.addObject("result", memberList);
		result.setViewName("main");
		return result;
	}

	// insert ��ư Ŭ���� ���� �����ͼ� result.jsp�� ȭ����ȯ ���ش�.
	// @RequestMapping(value = "/insert", method = RequestMethod.POST)
	// public ModelAndView insert(HttpServletRequest request) {
	//
	// // HttpServletRequest�� �̿��Ͽ� main.jsp�κ���
	// Member member = new Member();
	// member.setUser_nm((String) request.getParameter("name"));
	// member.setEmail((String) request.getParameter("email"));
	// member.setPhnb((String) request.getParameter("phone"));
	//
	// memberDAOService.insertMember(member);
	// System.out.println("insert complet");
	//
	// // �Ʒ��κ��� select���� result.jsp���Ͽ� �����ֱ� ���� �ǻ��.
	// ModelAndView result = new ModelAndView();
	// List<Member> memberList = memberDAOService.getMembers();
	// result.addObject("result", memberList);
	// result.setViewName("result");
	// return result;
	// }
}
