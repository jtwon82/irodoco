package com.irodco.web.services.impl;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.irodco.util.FileUtil;
import com.irodco.web.mapper.CommonsMapper;
import com.irodco.web.services.CommonsService;

@Service(value = "commonsService")
public class CommonsServiceImpl implements CommonsService {

	public static final Logger logger = LoggerFactory.getLogger(CommonsServiceImpl.class);

	@Autowired
	private SqlSession sqlSession;

	@Value("#{config['weburl.qrcode']}")
	private String weburl_qrcodeview;

	/**********************************************
	 **********************************************
	 ********
	 ******** FILE MANAGEMENT BUSINESS LOGIC
	 ********
	 **********************************************
	 **********************************************/

	@Override
	public CommonsMapper getMapper() {
		return sqlSession.getMapper(CommonsMapper.class);
	}

	/*
	 * FILE LIST
	 * 
	 * @see com.irodco.services.CommonsService#getFileList(java.util.Map)
	 */
	@Override
	public List<Map<String, Object>> getFileList(Map<String, Object> param) {
		try {
			return getMapper().getFileList(param);
		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return null;
	}

	/*
	 * FILE MULTI DELETE
	 * 
	 * @see com.irodco.services.CommonsService#fnMultiFileDelete(java.util.List)
	 */
	@Override
	public int fnMultiFileDelete(List<String> param) {
		try {
			return getMapper().multiImageDelete(param);
		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return 0;
	}

	/*
	 * FILE SINGLE DELETE
	 * 
	 * @see com.irodco.services.CommonsService#fnSingleFileDelete(java.util.Map)
	 */
	@Override
	public int fnSingleFileDelete(Map<String, Object> param) {
		try {
			return getMapper().singleImageDelete(param);

		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return 0;
	}

	/**********************************************
	 **********************************************
	 ********
	 ******** IMAGE MANAGEMENT BUSINESS LOGIC
	 ********
	 **********************************************
	 **********************************************/

	/*
	 * IMAGE LIST
	 * 
	 * @see com.irodco.services.CommonsService#getImageList(java.util.Map)
	 */
	@Override
	public List<Map<String, Object>> getImageList(Map<String, Object> param) {
		try {
			return getMapper().getImageList(param);
		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return null;
	}

	/*
	 * IMAGE MULTI DELETE
	 * 
	 * @see
	 * com.irodco.services.CommonsService#fnMultiImageDelete(java.util.List)
	 */
	@Override
	public int fnMultiImageDelete(List<String> param) {
		try {
			return getMapper().multiImageDelete(param);
		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return 0;
	}

	/*
	 * IMAGE SINGLE DELETE
	 * 
	 * @see
	 * com.irodco.services.CommonsService#fnSingleImageDelete(java.util.Map)
	 */
	@Override
	public int fnSingleImageDelete(Map<String, Object> param) {
		try {
			return getMapper().singleImageDelete(param);

		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return 0;
	}

	/**********************************************
	 **********************************************
	 ********
	 ******** FILE COMMONS
	 ********
	 **********************************************
	 **********************************************/

	/*
	 * File INSERT
	 * 
	 * @see com.irodco.services.CommonsService#fnSaveFile(java.util.Map)
	 */
	@Override
	public int fnSaveFileXXX(Map<String, Object> param, MultipartFile[] files, Principal principal) {
		int totalcount = 0;
//		try {
//			List<Map<String, Object>> list = FileUtil.setFileUpload(param, files, principal, FileTEMP);
//
//			if (list != null && list.size() > 0) {
//				for (Map<String, Object> item : list) {
//					logger.debug(String.format("176 %s", item));
//				}
//			}
//
//		} catch (NullPointerException e) {
//			logger.error("FAILED : " + e.getMessage());
//		}

		return totalcount;
	}

	/*
	 * File UPDATE
	 * 
	 * @see com.irodco.services.CommonsService#fnUpdateFile(java.util.Map)
	 */
	@Override
	public int fnUpdateFileXXX(Map<String, Object> param) {
//		try {
//			CommonsMapper commonsMapper = sqlSession.getMapper(CommonsMapper.class);
//			return commonsMapper.updateImage(param);
//		} catch (NullPointerException e) {
//			logger.error("FAILED : " + e.getMessage());
//		}

		return 0;
	}

	@Override
	public List<Map<String, Object>> fnSaveFile1(String FileTEMP, Map<String, Object> param, MultipartFile[] files,
			Principal principal) {
		List<Map<String, Object>> list = null;

		try {
			list = FileUtil.setFileUpload(param, files, principal, FileTEMP);

			if (list != null && list.size() > 0) {
				for (Map<String, Object> item : list) {
					logger.debug(String.format("176 %s", item));
				}
			}

		} catch (NullPointerException e) {
			logger.error("FAILED : " + e.getMessage());
		}

		return list;
	}

	@Override
	public String fnGenerateQRcode(String FileTEMP, String ID) {
		// http://219.83.69.47:8080/admin-qrcode-view
		String myCodeText = weburl_qrcodeview + "?bid=" + ID;
		String filePath = FileUtil.getSaveName(FileTEMP, "qrcode", "QR-" + ID, "QR-" + ID, "png");
		int size = 150;
		String fileType = "png";

		logger.debug(String.format("258 %s", filePath));

		File myFile = new File(filePath);
		try {

			Map<EncodeHintType, Object> hintMap = new EnumMap<EncodeHintType, Object>(EncodeHintType.class);
			hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

			// Now with zxing version 3.2.1 you could change border size (white
			// border size to just 1)
			hintMap.put(EncodeHintType.MARGIN, 1); /* default = 4 */
			hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

			QRCodeWriter qrCodeWriter = new QRCodeWriter();
			BitMatrix byteMatrix = null;
			try {
				byteMatrix = qrCodeWriter.encode(myCodeText, BarcodeFormat.QR_CODE, size, size, hintMap);
			} catch (WriterException e) {
				logger.error("274 err {}",e);
			}
			int CrunchifyWidth = byteMatrix.getWidth();
			BufferedImage image = new BufferedImage(CrunchifyWidth, CrunchifyWidth, BufferedImage.TYPE_INT_RGB);
			image.createGraphics();

			Graphics2D graphics = (Graphics2D) image.getGraphics();
			graphics.setColor(Color.WHITE);
			graphics.fillRect(0, 0, CrunchifyWidth, CrunchifyWidth);
			graphics.setColor(Color.BLACK);

			for (int i = 0; i < CrunchifyWidth; i++) {
				for (int j = 0; j < CrunchifyWidth; j++) {
					if (byteMatrix.get(i, j)) {
						graphics.fillRect(i, j, 1, 1);
					}
				}
			}
			ImageIO.write(image, fileType, myFile);
			
		} catch (IOException e) {
			logger.error("296 err {}", e );
			
		} catch (NullPointerException e) {
			logger.error(String.format("295 %s", e.toString()));
		}
		return filePath;
	}

}
