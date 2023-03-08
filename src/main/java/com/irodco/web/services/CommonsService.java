package com.irodco.web.services;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.irodco.web.mapper.CommonsMapper;

public interface CommonsService {

	/**************************************
	 **************************************
	 ********
	 ******** FILE MANAGEMENT INTERFACE
	 ********
	 **************************************
	 *************************************/

	CommonsMapper getMapper();
	
	/**
	 * File LIST
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getFileList(Map<String, Object> param);

	/**
	 * File MULTI DELETE
	 * 
	 * @param param
	 * @return
	 */
	int fnMultiFileDelete(List<String> param);

	/**
	 * File SINGLE DELETE
	 * 
	 * @param map
	 * @return
	 */
	int fnSingleFileDelete(Map<String, Object> param);

	/**************************************
	 **************************************
	 ********
	 ******** IMAGE MANAGEMENT INTERFACE
	 ********
	 **************************************
	 *************************************/

	/**
	 * Image LIST
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getImageList(Map<String, Object> param);

	/**
	 * Image MULTI DELETE
	 * 
	 * @param param
	 * @return
	 */
	int fnMultiImageDelete(List<String> param);

	/**
	 * Image SINGLE DELETE
	 * 
	 * @param map
	 * @return
	 */
	int fnSingleImageDelete(Map<String, Object> param);

	/**************************************
	 **************************************
	 ********
	 ******** FILE COMMONS
	 ********
	 **************************************
	 *************************************/

	/**
	 * File INSERT
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int fnSaveFileXXX(Map<String, Object> param, MultipartFile[] files, Principal principal);

	/**
	 * File INSERT
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> fnSaveFile1(String FileTEMP, Map<String, Object> param, MultipartFile[] files, Principal principal);

	/**
	 * File UPDATE
	 * 
	 * @param map
	 * @return
	 */
	int fnUpdateFileXXX(Map<String, Object> param);

	String fnGenerateQRcode(String FileTEMP, String FCLT_ID);
}
