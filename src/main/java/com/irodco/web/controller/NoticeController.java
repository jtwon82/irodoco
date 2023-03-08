package com.irodco.web.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.irodco.util.WebUtils;
import com.irodco.web.models.Notice;
import com.irodco.web.services.CommonsService;
import com.irodco.web.services.NoticeService;

@Controller
public class NoticeController {

	private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

	@Autowired
	CommonsService commonsService;

	@Autowired
	NoticeService noticeService;


	public NoticeController() {
		// TODO Auto-generated constructor stub
	}

	@RequestMapping("/notice")
	public String notice(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			int list_size = 10;
			int page_size = 10;
			int i = 0;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));
			param.put("auth", WebUtils.getAuth(principal));

			logger.debug(String.format("66 %s", param));
			ArrayList list = (ArrayList) noticeService.getNoticeList(param);
			int tot_size = 0;
			if (list.size() > 0) {
				tot_size = Integer.parseInt(((Notice) list.get(0)).getTotal_cnt());

				Iterator it = list.iterator();
				while (it.hasNext()) {
					Notice item = (Notice) it.next();
					int num = (Integer.parseInt(page) - 1) * list_size + i++;
					num = tot_size - num;
					item.setNum(num);
				}
			}

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			param.put("sval", sval);
			model.addAttribute("map", param);
			model.addAttribute("list", list);
			model.addAttribute("paging",
					WebUtils.getPaging("?page=", Integer.parseInt(page), tot_size, list_size, page_size));
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random() );

		} catch (NullPointerException e) {
			logger.error(String.format("62 err %s", e));
		}

		return "notice";
	}

	@RequestMapping("/notice-view")
	public String noticeview(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("page", page);

			Notice item = (Notice) noticeService.getNotice(param);
			item.setContent(item.getContent().replace("\n", "<br>"));

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("77 err %s", e));
		}

		return "notice-view";
	}

	@RequestMapping("/notice-write")
	public String noticewrite(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String mode = params.get("mode") == null ? "insert" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("mode", mode);
			param.put("page", page);

			Notice item = new Notice();
			if (mode.equals("update") && !bid.equals("")) {
				item = (Notice) noticeService.getNotice(param);
			} else {
				item.setUser_id(principal.getName());
			}

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("map", param);
			model.addAttribute("item", item);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("mode", mode);

		} catch (NullPointerException e) {
			logger.error(String.format("123 err %s", e));
		}

		return "notice-write";
	}

	@RequestMapping("/notice-proc")
	public String noticeproc(Model model, HttpServletRequest request, Principal principal, @RequestParam Map<String, String> params,
			@RequestParam(value="file",required=false) MultipartFile[] files) {
		try {
			String mode = params.get("mode") == null ? "" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");
			String title = params.get("title") == null ? "" : params.get("title");
			String NOTICE_TYPE = params.get("NOTICE_TYPE") == null ? "" : params.get("NOTICE_TYPE");
			String content = params.get("content") == null ? "" : params.get("content");
			String user_id = params.get("user_id") == null ? "" : params.get("user_id");
			String IS_DEL = params.get("IS_DEL") == null ? "" : params.get("IS_DEL");

			String gourl = "";
			String FileTEMP = request.getSession().getServletContext().getRealPath("/");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("ref_type", "notice");
			param.put("file_path", "");
			if (mode.equals("update")) {

				if (files != null && files.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, files, principal);
					for (Map<String, Object> item : list) {
						param.put("file_path", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_savenm")));
					}
				}
				param.put("bid", bid);
				param.put("title", title);
				param.put("NOTICE_TYPE", NOTICE_TYPE);
				param.put("content", content);
				param.put("IS_DEL", IS_DEL);
				
				logger.debug("188 {}", param);
				
				noticeService.updateNotice(param);
				return "redirect:/notice-view?page=" + page + "&bid=" + bid;

			} else if (mode.equals("delete")) {

				param.put("bid", bid);
				param.put("IS_DEL", "Y");

				noticeService.updateNotice(param);
				return "redirect:/notice?page=" + page;

			} else if (mode.equals("insert")) {

				if (files != null && files.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, files, principal);
					for (Map<String, Object> item : list) {
						param.put("file_path", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_savenm")));
					}
				}

				int maxid = noticeService.selectNoticeMaxId();
				param.put("notice_id", maxid);
				param.put("title", title);
				param.put("NOTICE_TYPE", NOTICE_TYPE);
				param.put("content", content);
				param.put("USER_ID", user_id);

				logger.debug(String.format("212 %s", param));
				noticeService.insertNotice(param);

				return "redirect:/notice?page=" + page;
			} else {
				return "notice";
			}

		} catch (NullPointerException e) {
			logger.error(String.format("77 err %s", e));
		}
		return "redirect:/notice";
	}

}
