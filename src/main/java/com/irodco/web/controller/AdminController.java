package com.irodco.web.controller;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.irodco.util.FileUtil;
import com.irodco.util.WebUtils;
import com.irodco.web.services.CommonsService;
import com.irodco.web.services.FacilityService;

@Controller
public class AdminController {

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	CommonsService commonsService;

	@Autowired
	FacilityService facilityService;

	@Value("#{config['weburl.qrcode']}")
	private String weburl_qrcodeview;
	
	public AdminController(){
	}

	@RequestMapping("/admin-facility")
	public String adminFacility(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			int list_size = 10;
			int page_size = 10;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));

			ArrayList list = (ArrayList) facilityService.getFacilityList(param);
			logger.debug(String.format("49 %s %s", param, list));
			int tot_size = 0;
			if (list.size() > 0) {
				tot_size = Integer.parseInt((String) String.valueOf(((Map<String, Object>) list.get(0)).get("TOTAL_CNT")));
			}

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("list", list);
			model.addAttribute("paging",
					WebUtils.getPaging("?page=", Integer.parseInt(page), tot_size, list_size, page_size));
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("77 err %s", e));
		}

		return "admin-facility";
	}
	
	@RequestMapping("/admin-facility-view")
	public String adminFacilityView(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getFacility(param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("103 err %s", e));
		}

		return "admin-facility-view";
	}

	@RequestMapping("/admin-facility-write")
	public String adminFacilityWrite(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String mode = params.get("mode") == null ? "insert" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("mode", mode);
			param.put("page", page);

			logger.debug(String.format("149 %s", param));

			Map<String, Object> item = new HashMap<String, Object>();
			if (mode.equals("update") && !bid.equals("")) {
				item = facilityService.getFacility(param);
			} else {
				item.put("USER_ID", principal.getName());
				item.put("CCTV_ID", this.facilityService.selectFacilityMaxId());
			}
			logger.debug(String.format("157 %s", item));

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("map", param);
			model.addAttribute("item", item);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("138 err %s", e));
		}

		return "admin-facility-write";
	}
	
	
	
	


	@RequestMapping("/admin-qrcode")
	public String adminQrcode(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			int list_size = 10;
			int page_size = 10;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));

			ArrayList list = (ArrayList) facilityService.getEQIPList(param);
			logger.debug(String.format("133 %s %s", param, list));
			int tot_size = 0;
			if (list.size() > 0) {
				tot_size = Integer
						.parseInt((String) String.valueOf(((Map<String, Object>) list.get(0)).get("TOTAL_CNT")));
			}

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("list", list);
			model.addAttribute("paging",
					WebUtils.getPaging("?page=", Integer.parseInt(page), tot_size, list_size, page_size));
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("150 err %s", e));
		}

		return "admin-qrcode";
	}

	@RequestMapping("/admin-qrcode-view")
	public String adminQrcodeView(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getEQIP(param);
			logger.debug("215 {}", item);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("126 err %s", e));
		}

		return "admin-qrcode-view";
	}
	@RequestMapping("/admin-qrcode-view2")
	public String adminQrcodeView2(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getEQIP(param);
			logger.debug("215 {}", item);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());
			model.addAttribute("random", Math.random());

		} catch (NullPointerException e) {
			logger.error(String.format("126 err %s", e));
		}

		return "admin-qrcode-view2";
	}

	@RequestMapping("/admin-rebuildqrcode")
	public void facilityRebuildqrcode(HttpServletResponse response, HttpServletRequest request, @RequestParam Map<String, String> params) {
		// http://addio3305.tistory.com/84
		
		String page = params.get("page") == null ? "1" : params.get("page");
		String bid = params.get("bid") == null ? "" : params.get("bid");
		String EQIP_ID = params.get("EQIP_ID") == null ? "" : params.get("EQIP_ID");

		String FileTEMP = request.getSession().getServletContext().getRealPath("/");
		
		Map<String, Object> param = new HashMap<String, Object>();
		String QRCODE_PATH = commonsService.fnGenerateQRcode(FileTEMP, EQIP_ID);
		Calendar now = Calendar.getInstance();
		String today = String.format("%4d%02d%02d", now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1,
				now.get(Calendar.DAY_OF_MONTH));
		//param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));
		param.put("IMG_PATH",
				String.format("/temp/%s/%s/%s", "qrcode", today, FileUtil.getNewName(QRCODE_PATH)));
		param.put("bid", EQIP_ID);
		facilityService.updateEQIP(param);
		
		File file = new File(FileTEMP + "/" + param.get("IMG_PATH"));
		logger.debug("288 {} {}", FileTEMP, file);
		
		
	    byte fileByte[];
		try {
			fileByte = FileUtils.readFileToByteArray( file );
		    response.setContentType("application/octet-stream");
		    response.setContentLength(fileByte.length);
		    response.setHeader("Content-Disposition", "attachment; fileName=\"" + file.getName() +"\";");
		    response.setHeader("Content-Transfer-Encoding", "binary");
		    response.getOutputStream().write(fileByte);
		     
		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		} catch (IOException e) {
			logger.error("264 err {}", e);
		}
	}
	
	@RequestMapping("/admin-rebuildqrcodeXXX")
	public ModelAndView facilityRebuildqrcodeXXX(HttpServletRequest request, Model model, Principal principal, @RequestParam Map<String, String> params) {
		String page = params.get("page") == null ? "1" : params.get("page");
		String bid = params.get("bid") == null ? "" : params.get("bid");
		String EQIP_ID = params.get("EQIP_ID") == null ? "" : params.get("EQIP_ID");

//		String base64value = "";
//		byte[] imageData = null;

		String FileTEMP = request.getSession().getServletContext().getRealPath("/");
		
		File file = null;
		
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			String QRCODE_PATH = commonsService.fnGenerateQRcode(FileTEMP, EQIP_ID);
			Calendar now = Calendar.getInstance();
			String today = String.format("%4d%02d%02d", now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1,
					now.get(Calendar.DAY_OF_MONTH));
			//param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));
			param.put("IMG_PATH",
					String.format("/temp/%s/%s/%s", "qrcode", today, FileUtil.getNewName(QRCODE_PATH)));
			param.put("bid", EQIP_ID);
			facilityService.updateEQIP(param);

			file = new File(FileTEMP + "/" + param.get("IMG_PATH"));
			
			logger.debug(String.format("239 chking %s %s %s ", param, file, file.isFile()));
			

//			if (file.isFile()) {
//				file.delete();
//				logger.debug(String.format("243 delete %s", file.toString()));
//			}
//			logger.debug("257 {}", param);
//			facilityService.updateFacilityQRcode(param);
//			logger.debug("259 {}", param);

			// byte[] imageContent = blob.getBytes(0, (int) blob.length());

//			BufferedImage image = ImageIO.read( file );
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
//
//			BufferedImage buf = new BufferedImage(300, 230, BufferedImage.TYPE_INT_BGR);
//			Graphics g = buf.getGraphics();
//
//			g.drawImage(image, 0, 0, 300, 230, null);
//
//			ImageIO.write(buf, "jpg", baos);
//			imageData = baos.toByteArray();
			
//			base64value = Base64.encodeBase64URLSafeString(imageData);
			
			
		} catch (NullPointerException e) {
			logger.error(String.format("262 err %s", e));
		}
		
		return new ModelAndView("download", "downloadFile", file);
//		return imageData;
//		return "redirect:/admin-qrcode-view?page=" + page + "&bid=" + EQIP_ID;
	}
	
	
	
	

	@RequestMapping("/admin-facility-proc")
	public String facilityProc(Model model, HttpServletRequest request, Principal principal, @RequestParam Map<String, String> params,
			@RequestParam(value="file",required=false) MultipartFile[] files , @RequestParam(value="DIR1",required=false) MultipartFile[] DIR1,
			@RequestParam(value="DIR2",required=false) MultipartFile[] DIR2, @RequestParam(value="DIR3",required=false) MultipartFile[] DIR3,
			@RequestParam(value="DIR4",required=false) MultipartFile[] DIR4) {
		try {
			String mode = params.get("mode") == null ? "" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");
			String CCTV_NM = params.get("CCTV_NM") == null ? "" : params.get("CCTV_NM");
			String CTLR_TYPE_CD = params.get("CTLR_TYPE_CD") == null ? "" : params.get("CTLR_TYPE_CD");
			String FAC_LCTN = params.get("FAC_LCTN") == null ? "" : params.get("FAC_LCTN");
			String IP = params.get("IP") == null ? "" : params.get("IP");
			String PORT = params.get("PORT") == null ? "" : params.get("PORT");
			String LON = params.get("LON") == null ? "" : params.get("LON");
			String LAT = params.get("LAT") == null ? "" : params.get("LAT");
			String CTLR_VER = params.get("CTLR_VER") == null ? "" : params.get("CTLR_VER");
			String STRM_URL = params.get("STRM_URL") == null ? "" : params.get("STRM_URL");
			String WEB_URL = params.get("WEB_URL") == null ? "" : params.get("WEB_URL");
			String ANDR_URL = params.get("ANDR_URL") == null ? "" : params.get("ANDR_URL");
			String IOS_URL = params.get("IOS_URL") == null ? "" : params.get("IOS_URL");
			String USE_YN = params.get("USE_YN") == null ? "" : params.get("USE_YN");
			String LGN_ID = params.get("LGN_ID") == null ? "" : params.get("LGN_ID");
			String LGN_PASSWD = params.get("LGN_PASSWD") == null ? "" : params.get("LGN_PASSWD");
			String FIX_PSET_NO = params.get("FIX_PSET_NO") == null ? "" : params.get("FIX_PSET_NO");
			String DETECT_YN = params.get("DETECT_YN") == null ? "" : params.get("DETECT_YN");
			String INTV_YN = params.get("INTV_YN") == null ? "" : params.get("INTV_YN");
			String DIRECTION = params.get("DIRECTION") == null ? "" : params.get("DIRECTION");
			// String DIR2 = params.get("DIR2")==null ? "": params.get("DIR2") ;
			// String DIR3 = params.get("DIR3")==null ? "": params.get("DIR3") ;
			// String DIR4 = params.get("DIR4")==null ? "": params.get("DIR4") ;
			String MOV_LIVE = params.get("MOV_LIVE") == null ? "" : params.get("MOV_LIVE");

			String FileTEMP = request.getSession().getServletContext().getRealPath("/");
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("ref_type", "facility");

			if (mode.equals("update")) {
				param.put("bid", bid);
				param.put("CCTV_NM", CCTV_NM);
				param.put("CTLR_TYPE_CD", CTLR_TYPE_CD);
				param.put("FAC_LCTN", FAC_LCTN);
				param.put("IP", IP);
				param.put("PORT", PORT);
				param.put("LON", LON);
				param.put("LAT", LAT);
				param.put("CTLR_VER", CTLR_VER);
				param.put("STRM_URL", STRM_URL);
				param.put("WEB_URL", WEB_URL);
				param.put("ANDR_URL", ANDR_URL);
				param.put("IOS_URL", IOS_URL);
				param.put("USE_YN", USE_YN);
				param.put("LGN_ID", LGN_ID);
				param.put("LGN_PASSWD", LGN_PASSWD);
				param.put("FIX_PSET_NO", FIX_PSET_NO);
				param.put("DETECT_YN", DETECT_YN);
				param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));

				facilityService.updateFacility(param);
				logger.debug(String.format("222 succ %s", param));

				return "redirect:/admin-facility-view?page=" + page + "&bid=" + bid;

			} else if (mode.equals("delete")) {

				param.put("bid", bid);

				facilityService.deleteFacility(param);
//				facilityService.deleteFacilityHistoryByFcltId(param);

				return "redirect:/admin-facility?page=" + page;

			} else if (mode.equals("insert")) {

				String QRCODE_PATH = commonsService.fnGenerateQRcode(FileTEMP, CCTV_ID);
				Calendar now = Calendar.getInstance();
				String today = String.format("%4d%02d%02d", now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1,
						now.get(Calendar.DAY_OF_MONTH));

				// int maxid = noticeService.selectNoticeMaxId();
				// String maxid = this.fFacilityService.selectFacilityMaxId();
				param.put("CCTV_ID", CCTV_ID);
				param.put("CCTV_NM", CCTV_NM);
				param.put("CTLR_TYPE_CD", CTLR_TYPE_CD);
				param.put("FAC_LCTN", FAC_LCTN);
				param.put("IP", IP);
				param.put("PORT", PORT);
				param.put("LON", LON);
				param.put("LAT", LAT);
				param.put("CTLR_VER", CTLR_VER);
				param.put("STRM_URL", STRM_URL);
				param.put("WEB_URL", WEB_URL);
				param.put("ANDR_URL", ANDR_URL);
				param.put("IOS_URL", IOS_URL);
				param.put("USE_YN", USE_YN);
				param.put("LGN_ID", LGN_ID);
				param.put("LGN_PASSWD", LGN_PASSWD);
				param.put("FIX_PSET_NO", FIX_PSET_NO);
				param.put("DETECT_YN", DETECT_YN);
				param.put("QRCODE_PATH",
						String.format("/temp/%s/%s/%s", "qrcode", today, FileUtil.getNewName(QRCODE_PATH)));
				param.put("USER_ID", WebUtils.getAuth(principal));
				param.put("REGDATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));
				param.put("REGDATES", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd"));

				facilityService.insertFacility(param);
				logger.debug(String.format("279 succ %s", param));

				return "redirect:/admin-facility?page=" + page;

			} else if (mode.equals("replace")) {

				if (files != null && files.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, files, principal);
					for (Map<String, Object> item : list) {
						param.put("FILE_PATH", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_savenm")));
					}
				}

				param.put("bid", bid);
				param.put("INTV_YN", INTV_YN);
				param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));

				facilityService.updateFacility(param);
//				facilityService.updateFacilityINTV_YN(param);

				logger.debug(String.format("214 succ %s", param));

				return "redirect:/admin-facility?page=" + page;

			} else if (mode.equals("movlive")) {

				param.put("bid", bid);
				param.put("MOV_LIVE", MOV_LIVE);
				param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));

				facilityService.updateFacility(param);
				logger.debug(String.format("311 succ %s", param));

				return "redirect:/admin-facility?page=" + page;

			} else if (mode.equals("direction")) {

				param.put("DIR1", "");
				param.put("DIR1_BLOB", "");
				param.put("DIR2", "");
				param.put("DIR2_BLOB", "");
				param.put("DIR3", "");
				param.put("DIR3_BLOB", "");
				param.put("DIR4", "");
				param.put("DIR4_BLOB", "");

				if (DIR1 != null && DIR1.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, DIR1, principal);
					for (Map<String, Object> item : list) {
						param.put("DIR1", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_orgnm")));
						param.put("DIR1_BLOB", param.get("img_blob"));
					}
				}
				if (DIR2 != null && DIR2.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, DIR2, principal);
					for (Map<String, Object> item : list) {
						param.put("DIR2", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_orgnm")));
						param.put("DIR2_BLOB", item.get("img_blob"));
					}
				}
				if (DIR3 != null && DIR3.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, DIR3, principal);
					for (Map<String, Object> item : list) {
						param.put("DIR3", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_orgnm")));
						param.put("DIR3_BLOB", item.get("img_blob"));
					}
				}
				if (DIR4 != null && DIR4.length > 0) {
					List<Map<String, Object>> list = commonsService.fnSaveFile1(FileTEMP, param, DIR4, principal);
					for (Map<String, Object> item : list) {
						param.put("DIR4", String.format("/temp/%s/%s/%s", item.get("ref_type"), item.get("today"),
								item.get("img_orgnm")));
						param.put("DIR4_BLOB", item.get("img_blob"));
					}
				}

				param.put("bid", bid);

				facilityService.updateFacilityDirection(param);
				logger.debug(String.format("337 succ %s", param));

				return "redirect:/admin-facility?page=" + page;

			} else if (mode.equals("direction-delete")) {
				if (DIRECTION.equals("DIR1")) {
					param.put("DIR1", "DELETE");
				} else if (DIRECTION.equals("DIR2")) {
					param.put("DIR2", "DELETE");
				} else if (DIRECTION.equals("DIR3")) {
					param.put("DIR3", "DELETE");
				} else if (DIRECTION.equals("DIR4")) {
					param.put("DIR4", "DELETE");
				}
				param.put("bid", bid);
				
				logger.debug("403 direction-delete-{}", param);

				facilityService.updateFacilityDirectionDelete(param);
				logger.debug(String.format("399 succ %s", param));

				return "redirect:/admin-cctv-direction?mode=direction&page=" + page + "&bid=" + bid;
			} else {
				return "notice";
			}

		} catch (NullPointerException e) {
			logger.error(String.format("245 err %s", e));
		}
		return "redirect:/admin-facility";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping("/admin-facility-history")
	public String adminFacilityHistory(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");
			int list_size = 10;
			int page_size = 10;
			int i = 0;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));
			param.put("CCTV_ID", CCTV_ID);


			logger.debug("484 param {}", param);
			ArrayList list1 = (ArrayList) facilityService.getProcessStatInfo(param);
			ArrayList list2 = (ArrayList) facilityService.getCCTVStatInfo(param);
			logger.debug("645 {} {}", list1, list2);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			param.put("sval", sval);
			model.addAttribute("map", param);
			model.addAttribute("list1", list1);
			model.addAttribute("list2", list2);
			// model.addAttribute("paging", WebUtils.getPaging("?page=",
			// Integer.parseInt(page), tot_size, list_size, page_size));
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("297 err %s", e));
		}

		return "admin-facility-history";
	}
	@RequestMapping("/admin-facility-history-ajax")
	public @ResponseBody HashMap adminFacilityHistoryAjax(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		HashMap result = new HashMap();
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");
			int list_size = 10;
			int page_size = 10;
			int i = 0;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));
			param.put("CCTV_ID", CCTV_ID);


			logger.debug("686 param {}", param);
			ArrayList list1 = (ArrayList) facilityService.getProcessStatInfo(param);

			logger.debug("689 param {}", param);
			ArrayList list2 = (ArrayList) facilityService.getCCTVStatInfo(param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			param.put("sval", sval);
			
			result.put("map", param);
			result.put("list1", list1);
			result.put("list2", list2);

		} catch (NullPointerException e) {
			logger.error(String.format("702 err %s", e));
		}

		return result;
	}

	@RequestMapping("/admin-facility-history-view")
	public String adminFacilityHistoryView(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String mode = params.get("mode") == null ? "insert" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("mode", mode);
			param.put("page", page);
			param.put("CCTV_ID", CCTV_ID);

			Map<String, Object> item = new HashMap<String, Object>();
//			item = facilityService.getFacilityHistory(param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("map", param);
			model.addAttribute("item", item);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("334 err %s", e));
		}

		return "admin-facility-history-view";
	}

	@RequestMapping("/admin-facility-history-write")
	public String adminFacilityHistoryWrite(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String mode = params.get("mode") == null ? "insert" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("bid", bid);
			param.put("mode", mode);
			param.put("page", page);
			param.put("CCTV_ID", CCTV_ID);

			Map<String, Object> item = new HashMap<String, Object>();
			if (mode.equals("update") && !bid.equals("")) {
//				item = facilityService.getFacilityHistory(param);
			} else {
				item.put("USER_ID", principal.getName());
//				item.put("HIST_ID", facilityService.selectFacilityHistoryMaxId());
			}

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("map", param);
			model.addAttribute("item", item);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("334 err %s", e));
		}

		return "admin-facility-history-write";
	}

	@RequestMapping("/admin-facility-history-proc")
	public String facilityHistoryProc(Model model, Principal principal, @RequestParam Map<String, String> params,
			@RequestParam("file") MultipartFile[] files) {
		try {
			String mode = params.get("mode") == null ? "" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");
			String HIST_ID = params.get("HIST_ID") == null ? "" : params.get("HIST_ID");
			String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");
			String USER_ID = params.get("USER_ID") == null ? "" : params.get("USER_ID");
			String HIST_TYPE = params.get("HIST_TYPE") == null ? "" : params.get("HIST_TYPE");
			String HIST_STATUS = params.get("HIST_STATUS") == null ? "" : params.get("HIST_STATUS");
			String HIST_COMMENT = params.get("HIST_COMMENT") == null ? "" : params.get("HIST_COMMENT");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("ref_type", "facility");

			if (mode.equals("update")) {
				param.put("bid", bid);
				// param.put("CCTV_ID", CCTV_ID);
				param.put("USER_ID", USER_ID);
				param.put("HIST_TYPE", HIST_TYPE);
				param.put("HIST_STATUS", HIST_STATUS);
				param.put("HIST_COMMENT", HIST_COMMENT);
				param.put("UPDATE_DATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));

//				facilityService.updateFacilityHistory(param);
				logger.debug(String.format("480 succ %s", param));

				return "redirect:/admin-facility-history-view?page=" + page + "&bid=" + bid + "&CCTV_ID=" + CCTV_ID;

			} else if (mode.equals("delete")) {

				param.put("bid", bid);

//				facilityService.deleteFacilityHistoryByFcltId(param);
				logger.debug(String.format("496 succ %s", param));

				return "redirect:/admin-facility-history?page=" + page + "&CCTV_ID=" + CCTV_ID;

			} else if (mode.equals("insert")) {

				// int maxid = noticeService.selectNoticeMaxId();
				// String maxid = this.fFacilityService.selectFacilityMaxId();
				param.put("HIST_ID", HIST_ID);
				param.put("CCTV_ID", CCTV_ID);
				param.put("USER_ID", USER_ID);
				param.put("HIST_TYPE", HIST_TYPE);
				param.put("HIST_STATUS", HIST_STATUS);
				param.put("HIST_COMMENT", HIST_COMMENT);
				param.put("USER_ID", WebUtils.getAuth(principal));
				param.put("REGDATE", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd HH:mm:ss"));
				param.put("REGDATES", WebUtils.getDateAdd(new Date(), 0, "yyyy-MM-dd"));

//				facilityService.insertFacilityHistory(param);
				logger.debug(String.format("522 succ %s", param));

				return "redirect:/admin-facility-history?page=" + page + "&CCTV_ID=" + CCTV_ID;

			} else {
				return "admin-facility-history";
			}

		} catch (NullPointerException e) {
			logger.error(String.format("414 err %s", e));
		}
		return "redirect:/admin-facility-history";
	}

	@RequestMapping("/admin-cctv-replace")
	public String adminCCTVReplace(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String mode = params.get("mode") == null ? "" : params.get("mode");
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("mode", "replace");
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getFacility(param);
			
			logger.debug("684 {}", item);
			
			//
			// Blob blob = (Blob) item.get("IMG_DATA");
			// String base64value = "";
			// byte[] imageData = null;
			//
			// try {
			// BufferedImage image = ImageIO.read ( blob.getBinaryStream() );
			// ByteArrayOutputStream baos = new ByteArrayOutputStream();
			//
			// ImageIO.write(image, "jpg", baos);
			// imageData = baos.toByteArray();
			//
			// base64value = Base64.encodeBase64URLSafeString(imageData);
			// param.put("IMG_DATA", base64value);
			//
			// } catch (IOException e) {
			// LOGGER.error( String.format("269 err %s", e) );
			// }

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("map", param);
			model.addAttribute("item", item);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("441 err %s", e));
		}

		return "admin-cctv-replace";
	}

	@RequestMapping("/admin-cctv-movlive")
	public String adminCCTVMovlive(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("mode", "movlive");
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getFacility(param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("468 err %s", e));
		}

		return "admin-cctv-movlive";
	}

	@RequestMapping("/admin-cctv-direction")
	public String adminCCTVDirection(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String bid = params.get("bid") == null ? "" : params.get("bid");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("mode", "direction");
			param.put("bid", bid);
			param.put("page", page);

			Map<String, Object> item = facilityService.getFacilityDirection(param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
			
			logger.debug("760 {}", param);
			model.addAttribute("item", item);
			model.addAttribute("map", param);
			model.addAttribute("lang", locale.getLanguage());

		} catch (NullPointerException e) {
			logger.error(String.format("468 err %s", e));
		}

		return "admin-cctv-direction";
	}

}
