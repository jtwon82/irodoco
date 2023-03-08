package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

public interface CommonsMapper {

	/**********************************
	 *********************************
	 ********
	 ******** Image Management
	 ********
	 **********************************
	 *********************************/

	List<Map<String, Object>> getCodeList(Map<String, Object> param);

	/**
	 * IMAGE LIST
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getImageList(Map<String, Object> map);

	/**
	 * IMAGE INSERT
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int saveImage(Map<String, Object> map);

	/**
	 * IMAGE UPDATE
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int updateImage(Map<String, Object> map);

	/**
	 * IMAGE MULTI DELETE
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int multiImageDelete(List<String> param);

	/**
	 * IMAGE SINGLE DELETE
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int singleImageDelete(Map<String, Object> map);

	/**********************************
	 *********************************
	 ********
	 ******** File Management
	 ********
	 **********************************
	 *********************************/

	/**
	 * FILE LIST
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getFileList(Map<String, Object> map);

	/**
	 * FILE INSERT
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int saveFile(Map<String, Object> map);

	/**
	 * FILE UPDATE
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int updateFile(Map<String, Object> map);

	/**
	 * FILE MULTI DELETE
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int multiFileDelete(List<String> param);

	/**
	 * FILE SINGLE DELETE
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	int singleFileDelete(Map<String, Object> map);
}
