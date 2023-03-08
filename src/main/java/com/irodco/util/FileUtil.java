package com.irodco.util;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

//@Component
public class FileUtil {

	public static final Logger logger = LoggerFactory.getLogger(FileUtil.class);

	private static Map<String, String> s_imgTypeMap = null;

	static {
		s_imgTypeMap = new HashMap<String, String>();
		s_imgTypeMap.put("image/pjpeg", "image/pjpeg");
		s_imgTypeMap.put("image/jpeg", "image/jpeg");
		s_imgTypeMap.put("image/gif", "image/gif");
		s_imgTypeMap.put("image/bmp", "image/bmp");
		s_imgTypeMap.put("image/png", "image/png");
	}

	public static List<Map<String, Object>> setFileUpload(Map<String, Object> param, MultipartFile[] files,
			Principal principal, String path) {

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = null;

		BufferedImage bi = null;

		for (int i = 0; i < files.length; i++) {
			map = new HashMap<String, Object>();

			try {

				if (files[i].isEmpty() == false) {

					String contType = files[i].getContentType();

					logger.debug(String.format("64 fileutil %s", param));

					Calendar now = Calendar.getInstance();
					String today = String.format("%4d%02d%02d", now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1,
							now.get(Calendar.DAY_OF_MONTH));

					map.put("ref_type", param.get("ref_type"));
					map.put("ref_no", param.get("ref_no"));
					map.put("today", today);

					if (s_imgTypeMap.containsValue(contType)) {
						map.put("isimg", true);

						String orgName = files[i].getOriginalFilename();
						map.put("img_orgnm", orgName);

						map.put("img_type", contType);
						map.put("img_size", files[i].getSize());

						String fileName = getBaseName(files[i].getOriginalFilename());
						map.put("baseName", fileName);
						String fileExt = getExtension(files[i].getOriginalFilename());
						map.put("extension", fileExt);

						String savePath = getSaveName(path, String.valueOf(param.get("ref_type")), orgName, fileName,
								fileExt);
						map.put("img_path", savePath);
						map.put("img_savenm", getNewName(savePath));

						// String linkedPath = savePath.replaceAll("\\\\","/");
						if (param.get("img_link") != null && !param.get("img_link").equals(""))
							map.put("img_link", String.valueOf(param.get("img_link")).replaceAll("\\\\", "/"));
						else
							map.put("img_link", "");

						// Image image = ImageIO.read(new File(resaveName));
						// map.put("imgwidth",image.getWidth(null));
						// map.put("imgheight",image.getWidth(null));
						// resaveName.substring(resaveName.lastIndexOf(File.separator)-1);
						// map.put("imgPath", resaveName);

						try {
							bi = ImageIO.read(files[i].getInputStream());
						} catch (IOException e) {
							logger.error("107 err {}", e);
						}

						byte[] bytes = null;
						try {
							bytes = files[i].getBytes();
						} catch (IOException e) {
							logger.error("114 err {}", e);
						}
						map.put("img_data", bytes);
						map.put("img_width", bi.getWidth());
						map.put("img_height", bi.getHeight());

						BufferedOutputStream buffStream = null;
						try {
							buffStream = new BufferedOutputStream(new FileOutputStream(new File(savePath)));
						} catch (FileNotFoundException e1) {
							logger.error("124 err {}", e1);
						}
						try {
							buffStream.write(bytes);
							buffStream.close();
						} catch (IOException e) {
							logger.error("134 err {}", e);
						} finally {
							try {
								buffStream.close();
							} catch (IOException e) {
								logger.error("135 err {}", e);
							}
						}

					} else {
						map.put("isimg", false);

						String orgName = files[i].getOriginalFilename();
						map.put("file_orgnm", orgName);

						map.put("file_type", contType);
						map.put("file_size", files[i].getSize());

						String fileName = getBaseName(files[i].getOriginalFilename());
						map.put("baseName", fileName);
						String fileExt = getExtension(files[i].getOriginalFilename());
						map.put("extension", fileExt);

						String savePath = getSaveName(path, String.valueOf(param.get("ref_type")), orgName, fileName,
								fileExt);
						map.put("file_path", savePath);
						map.put("file_savenm", getNewName(savePath));

						File file = new File(savePath);
						InputStream is = null;
						try {
							is = new FileInputStream(file);
							int fileSize = (int) file.length();
							byte[] buffer = new byte[fileSize];

							is.read(buffer);
							is.close();
							map.put("file_blob", buffer);
						} catch (IOException e) {
							logger.error("162 err {}", e);
						} finally {
							try {
								is.close();
							} catch (IOException e) {
								logger.error("173 err {}", e);
							}
						}

						byte[] filebytes = null;
						try {
							filebytes = files[i].getBytes();
						} catch (IOException e) {
							logger.error("182 err {}", e);
						}

						BufferedOutputStream buffStream = null;
						try {
							buffStream = new BufferedOutputStream(new FileOutputStream(new File(savePath)));
							buffStream.write(filebytes);
						} catch (IOException e) {
							logger.error("190 err {}", e);
						} finally {
							try {
								buffStream.close();
							} catch (IOException e) {
								logger.error("195 err {}", e);
							}
						}
					}

					list.add(map);
				}

			} catch (NullPointerException e) {
				logger.error("ERROR : " + e.getMessage());
			}

		}

		return list;
	}

	/**
	 * ?ŒŒ?¼ ???ž¥?´ë¦? ?ƒ?„±
	 * 
	 * @param sheet
	 * @param extension
	 * @return
	 */
	public static String getSaveName(String path, String sheet, String orgname, String filename, String extension) {
		Calendar now = Calendar.getInstance();
		
		path = path +"temp";

		String newPath = String.format("%s" + File.separator + "%s" + File.separator + "%4d%02d%02d", path, sheet,
				now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1, now.get(Calendar.DAY_OF_MONTH));

		logger.debug(String.format("167 file %s", newPath));

		File pathFile = new File(newPath);

		if (!pathFile.exists()) {
			pathFile.mkdirs();
		}

		File file = new File(pathFile, orgname);

		if (!file.exists()) {
			// System.out.println("NOTHING");

			String nameFile = String.format(
					"%s" + File.separator + "%s" + File.separator + "%4d%02d%02d" + File.separator + "%s.%s", path,
					sheet, now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1, now.get(Calendar.DAY_OF_MONTH),
					filename, extension);

			return nameFile;
		}

		int idx = 0;
		while (true) {
			newPath = String.format(
					"%s" + File.separator + "%s" + File.separator + "%4d%02d%02d" + File.separator + "%s(%02d).%s",
					path, sheet, now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1, now.get(Calendar.DAY_OF_MONTH),
					filename, ++idx, extension);

			file = new File(newPath);

			if (!file.exists()) {

				String nameFile = String.format(
						"%s" + File.separator + "%s" + File.separator + "%4d%02d%02d" + File.separator + "%s(%02d).%s",
						path, sheet, now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1,
						now.get(Calendar.DAY_OF_MONTH), filename, idx, extension);

				return nameFile;
			}
		}
	}

	/**
	 * ?‹ ê·œíŒŒ?¼?´ë¦? ì¡°íšŒ
	 * 
	 * @param filename
	 * @return
	 */
	public static String getNewName(String filename) {
		int i = filename.lastIndexOf(File.separator) + 1;
		return filename.substring(i);
	}

	/**
	 * ?›ë³¸íŒŒ?¼?´ë¦? ì¡°íšŒ
	 * 
	 * @param filename
	 * @return
	 */
	public static String getOrgName(String filename) {
		int i = filename.lastIndexOf(File.separator) + 1;
		return filename.substring(i);
	}

	/**
	 * ?ŒŒ?¼ ê¸°ë³¸ ?´ë¦? ì¡°íšŒ
	 * 
	 * @param filename
	 * @return
	 */
	public static String getBaseName(String filename) {
		int i = filename.lastIndexOf(File.separator) + 1;
		int lastDot = filename.lastIndexOf('.');
		if (lastDot >= 0)
			return filename.substring(i, lastDot);
		if (i > 0)
			return filename.substring(i);
		else
			return filename;
	}

	/**
	 * ?ŒŒ?¼ ?™•?ž¥?ž
	 * 
	 * @param filename
	 * @return
	 */
	public static String getExtension(String filename) {
		int lastDot = filename.lastIndexOf('.');

		if (lastDot >= 0)
			return filename.substring(lastDot + 1);
		else
			return "";
	}

	/**********************************
	 *********************************
	 ********
	 ******** Download ?„¤? •
	 ********
	 **********************************
	 *********************************/

	public void downFile(HttpServletRequest request, HttpServletResponse response, String filename, String filepath) {

		try {
			File file = new File(filepath);

			if (!file.exists()) {
				throw new FileNotFoundException("?ŒŒ?¼? •ë³´ì—†?Œ");
			}

			if (!file.isFile()) {
				throw new FileNotFoundException(filepath);
			}

			int fSize = (int) file.length();

			if (fSize > 0) {

				String mimetype = "application/x-msdownload";

				response.setContentType(mimetype);

				setDisposition(filename, request, response);
				response.setContentLength(fSize);

				BufferedInputStream in = null;
				BufferedOutputStream out = null;

				in = new BufferedInputStream(new FileInputStream(file));
				out = new BufferedOutputStream(response.getOutputStream());

				FileCopyUtils.copy(in, out);

				out.flush();
			}

		} catch (IOException e) {
			logger.error("324 err {}", e);
		} catch (Exception e) {
			logger.error("324 err {}", e);
		}

	}

	/**
	 * ë¸Œë¼?š°?? êµ¬ë¶„ ?–»ê¸?.
	 *
	 * @param request
	 * @return
	 */
	public String getBrowser(HttpServletRequest request) {
		String header = request.getHeader("User-Agent");

		if (header.indexOf("MSIE") > -1 || header.indexOf("Windows") > -1) {
			return "MSIE";
		} else if (header.indexOf("Chrome") > -1) {
			return "Chrome";
		} else if (header.indexOf("Opera") > -1) {
			return "Opera";
		}

		return "Firefox";
	}

	/**
	 * Disposition ì§?? •?•˜ê¸?.
	 *
	 * @param filename
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String browser = getBrowser(request);

		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;

		if (browser.equals("MSIE")) {
			// encodedFilename =
			// URLEncoder.encode(filename,"UTF-8").replaceAll("\\+", "%20");
			encodedFilename = URLEncoder.encode(filename, "UTF-8");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			// throw new RuntimeException("Not supported browser");
			throw new IOException("Not supported browser");
		}

		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename + ";");

		if ("Opera".equals(browser)) {
			response.setContentType("application/octet-stream;charset=UTF-8");
		}
	}
}
