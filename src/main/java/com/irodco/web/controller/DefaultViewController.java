package com.irodco.web.controller;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.irodco.util.WebUtils;
import com.irodco.web.models.Notice;
import com.irodco.web.services.ArcgisService;
import com.irodco.web.services.CommonsService;
import com.irodco.web.services.FacilityService;
import com.irodco.web.services.NoticeService;
import com.irodco.web.services.StatisticService;

@Controller
public class DefaultViewController {

	private static final Logger logger = LoggerFactory.getLogger(DefaultViewController.class);

	@Autowired
	CommonsService commonsService;

	@Autowired
	FacilityService facilityService;

	@Autowired
	StatisticService statisticService;
	
	@Autowired
	NoticeService noticeService;
	
	@Autowired
	ArcgisService arcgisService;

	@Value("#{config['arcgis.url.rute_bus']}")	private String arcgisurl_rute_bus;
	@Value("#{config['arcgis.url.iri']}")		private String arcgisurl_iri;
	@Value("#{config['arcgis.url.sigi']}")		private String arcgisurl_sigi;
	@Value("#{config['arcgis.url.city']}")		private String arcgisurl_city;
	@Value("#{config['arcgis.url.province']}")	private String arcgisurl_province;
	@Value("#{config['arcgis.url.national']}")	private String arcgisurl_national;
	@Value("#{config['arcgis.url.pata']}")		private String arcgisurl_pata;
	
	
	public DefaultViewController(){
	}
	
	// index
	@RequestMapping(value = { "/" })
	public String home(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		model.addAttribute("lang", locale.getLanguage());

		try {
			if (principal != null) {
				logger.debug("82 principal {}", principal);

				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
		} catch (NullPointerException e) {
			logger.error("107 err {}", e);
		}
		
		List<Notice> list = noticeService.getTopicNoticeList();
		
		model.addAttribute("notice", list);
		model.addAttribute("random", Math.random());
		
		logger.debug("88 {}", model);

		return "index"; //-arcgis
	}

	@RequestMapping(value = { "/page/{name}" })
	public String company(@PathVariable("name") String name, Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		model.addAttribute("lang", locale.getLanguage());

		if (principal != null) {
			model.addAttribute("auth", WebUtils.getAuth(principal));
		}
		model.addAttribute("random", Math.random());
		
		logger.debug("131 locale {}", locale);
		
		return "page-"+name;
	}

	@RequestMapping("/main")
	public String main(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		model.addAttribute("lang", locale.getLanguage());

		if (principal != null) {
			model.addAttribute("auth", WebUtils.getAuth(principal));
		}
		
		model.addAttribute("arcgisurl_rute_bus", arcgisurl_rute_bus);
		model.addAttribute("arcgisurl_iri", arcgisurl_iri);
		model.addAttribute("arcgisurl_sigi", arcgisurl_sigi);
		model.addAttribute("arcgisurl_city", arcgisurl_city);
		model.addAttribute("arcgisurl_province", arcgisurl_province);
		model.addAttribute("arcgisurl_national", arcgisurl_national);
		model.addAttribute("arcgisurl_pata", arcgisurl_pata);
		
		model.addAttribute("map", params);
		
		model.addAttribute("random", Math.random());

		logger.debug("132 model {}", model.toString());
		return "main"; //-arcgisgoogle
	}

	@RequestMapping("/main-gmap")
	public String mainGmap(Model model, Principal principal, @RequestParam Map<String, String> params, Locale locale) {
		model.addAttribute("lang", locale.getLanguage());

		String lat = params.get("lat") == null ? "-6.530271806806603 " : params.get("lat");
		String lng = params.get("lng") == null ? "107.21929931640624" : params.get("lng");
		String zoom = params.get("zoom") == null ? "7" : params.get("zoom");

		Map<String, Object> param = new HashMap<String, Object>();
		param.put("lat", lat);
		param.put("lng", lng);
		param.put("zoom", zoom);

		logger.debug(String.format("125 %s", param));
		model.addAttribute("map", param);

		if (principal != null) {
			model.addAttribute("auth", WebUtils.getAuth(principal));
		}

		return "main-gmap";
	}

	@RequestMapping("/main-androidcctv")
	public String mainCctvAndroid(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		model.addAttribute("lang", locale.getLanguage());
		try {
			String strimurl = params.get("strimurl") == null ? "1" : params.get("strimurl");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("strimurl", strimurl);

			model.addAttribute("map", param);

			if (principal != null) {
				model.addAttribute("auth", WebUtils.getAuth(principal));
			}
		} catch (NullPointerException e) {
			logger.error(String.format("191 %s", e));
		}

		return "main-androidcctv";
	}

	@RequestMapping(value = "/ajax-incident") //
	public @ResponseBody List ajaxIncident(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		ArrayList result = null;
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

			logger.debug(String.format("212 param %s", param));
			result = (ArrayList) facilityService.getIncidentList(param);
			logger.debug(String.format("214 result %s", result));

		} catch (NullPointerException e) {
			logger.error(String.format("217 %s", e));
		}

		return result;
	}

	@RequestMapping(value = "/ajax-cctv")
	public @ResponseBody ArrayList ajaxcctv(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		String result = null;
		ArrayList list = null;
		try {
			String page = params.get("page") == null ? "1" : params.get("page");
			String skey = params.get("skey") == null ? "" : params.get("skey");
			String sval = params.get("sval") == null ? "" : params.get("sval");
			int list_size = 10;

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("page", page);
			param.put("list_size", list_size);
			param.put("skey", skey);
			param.put("sval", String.format("%%%s%%", sval));

			logger.debug(String.format("238 param %s", param));
			list = (ArrayList) facilityService.getFacilityList2(param);

			// result = (new Gson()).toJson(list, ArrayList.class).toString();
			// result = list.toString();

		} catch (NullPointerException e) {
			logger.error(String.format("243 %s", e));
		}

		return list;
	}

	@RequestMapping(value = "/cctv-img", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] cctv_img(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) throws SQLException {

		String CCTV_ID = params.get("CCTV_ID") == null ? "" : params.get("CCTV_ID");
		String DIRECTION = params.get("DIRECTION") == null ? "" : params.get("DIRECTION");

		Map<String, Object> param = new HashMap<String, Object>();
		param.put("CCTV_ID", CCTV_ID);

		Map<String, Object> rs = null;
		Blob blob = null;

		if (DIRECTION.equals("DIR1")) {
			rs = (Map<String, Object>) facilityService.getFacilityDirection(param);
			blob = (Blob) rs.get("DIR1_BLOB");

		} else if (DIRECTION.equals("DIR2")) {
			rs = (Map<String, Object>) facilityService.getFacilityDirection(param);
			blob = (Blob) rs.get("DIR2_BLOB");

		} else if (DIRECTION.equals("DIR3")) {
			rs = (Map<String, Object>) facilityService.getFacilityDirection(param);
			blob = (Blob) rs.get("DIR3_BLOB");

		} else if (DIRECTION.equals("DIR4")) {
			rs = (Map<String, Object>) facilityService.getFacilityDirection(param);
			blob = (Blob) rs.get("DIR4_BLOB");

		} else {
			rs = (Map<String, Object>) facilityService.getFacility2(param);
			blob = (Blob) rs.get("IMG_DATA");
		}

		logger.debug("332 {} {}", rs, blob);

		String base64value = "";
		byte[] imageData = null;

		try {
			// byte[] imageContent = blob.getBytes(0, (int) blob.length());

			BufferedImage image = ImageIO.read(blob.getBinaryStream());
			ByteArrayOutputStream baos = new ByteArrayOutputStream();

			BufferedImage buf = new BufferedImage(300, 230, BufferedImage.TYPE_INT_BGR);
			Graphics g = buf.getGraphics();

			g.drawImage(image, 0, 0, 300, 230, null);

			ImageIO.write(buf, "jpg", baos);
			imageData = baos.toByteArray();

			base64value = Base64.encodeBase64URLSafeString(imageData);

		} catch (IOException e) {
			logger.error(String.format("269 err %s", e));
		}

		return imageData;
	}

	@RequestMapping(value = "/ajax-publictraffic")
	public @ResponseBody List ajaxPublictraffic(Model model, Principal principal,
			@RequestParam Map<String, String> params, Locale locale) {
		ArrayList result = null;
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

			logger.debug(String.format("297 param %s", param));
			result = (ArrayList) facilityService.getFacilityList2(param);
			logger.debug(String.format("299 result %s", result));

		} catch (NullPointerException e) {
			logger.error(String.format("302 %s", e));
		}

		return result;
	}

	@RequestMapping(value = "/ajax-statics")
	public @ResponseBody String ajaxStatics(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		String result = "";
		try {
			String STATICS_TYPE = params.get("STATICS_TYPE") == null ? "" : params.get("STATICS_TYPE");
			String PLATFORM = params.get("PLATFORM") == null ? "WEB" : params.get("PLATFORM");

			HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
					.getRequest();
			String REG_IP = req.getHeader("X-FORWARDED-FOR");

			if (REG_IP == null)
				REG_IP = req.getRemoteAddr();

			Map<String, String> param = new HashMap<String, String>();
			param.put("REG_IP", REG_IP);
			param.put("STATICS_TYPE", STATICS_TYPE);
			param.put("PLATFORM", PLATFORM);

			logger.debug(String.format("323 param %s", param));
			statisticService.insertStatistic(param);

			logger.debug("406 {}", param);

		} catch (NullPointerException e) {
			logger.error(String.format("327", e));
		}

		return result;
	}

	@RequestMapping(value = "/ajax-rote")
	public @ResponseBody ArrayList ajaxRote(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		ArrayList result = null;
		try {
			String BUS_ROTE_ID = params.get("BUS_ROTE_ID") == null ? "" : params.get("BUS_ROTE_ID");

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("BUS_ROTE_ID", BUS_ROTE_ID);

			logger.debug("367 {}", param);
			result = (ArrayList) arcgisService.getStationList(param);
			logger.debug("369 {}", result);

		} catch (NullPointerException e) {
			logger.error(String.format("379 {}", e));
		}

		return result;
	}
	
	@RequestMapping(value = "/ajax-breaks")
	public @ResponseBody ArrayList ajaxBreaks(Model model, Principal principal, @RequestParam Map<String, String> params,
			Locale locale) {
		ArrayList result = null;
		try {
			String STTS_DT = params.get("STTS_DT") == null ? "2011" : params.get("STTS_DT");
			String PRVN_NO = params.get("PRVN_NO") == null ? "" : params.get("PRVN_NO");
			String LNGT = params.get("LNGT") == null ? "" : params.get("LNGT");
			if ( STTS_DT.equals("") ){
				STTS_DT="2011";
			}

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("STTS_DT", STTS_DT);
			param.put("PRVN_NO", PRVN_NO);
			param.put("LNGT", LNGT);

			logger.debug("395 {}", param);
			result = (ArrayList) arcgisService.getClassBreaksRender(param);

		} catch (NullPointerException e) {
			logger.error(String.format("400 {}", e));
		}

		return result;
	}
}
