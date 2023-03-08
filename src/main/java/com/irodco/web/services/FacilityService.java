package com.irodco.web.services;

import java.util.List;
import java.util.Map;

import com.irodco.web.mapper.FacilityMapper;

public interface FacilityService {

	FacilityMapper getMapper();

	List<Map<String, Object>> getFacilityList(Map<String, Object> param);

	List<Map<String, Object>> getFacilityList2(Map<String, Object> param);

	Map<String, Object> getFacility(Map<String, Object> param);

	Map<String, Object> getFacility2(Map<String, Object> param);

	Map<String, Object> getFacilityIMGE(Map<String, Object> param);

	Map<String, Object> getFacilityDirection(Map<String, Object> param);

	void updateFacility(Map<String, Object> param);

	void updateFacilityINTV_YN(Map<String, Object> param);

	void updateFacilityDirection(Map<String, Object> param);

	void updateFacilityDirectionDelete(Map<String, Object> param);

	void deleteFacility(Map<String, Object> param);
	
	List<Map<String, Object>> getEQIPList(Map<String, Object> param);

	Map<String, Object> getEQIP(Map<String, Object> param);

	void updateEQIP(Map<String, Object> param);
	
	

	void updateFacilityQRcode(Map<String, Object> param);

	String selectFacilityMaxId();

	void insertFacility(Map<String, Object> param);

	List<Map<String, Object>> getIncidentList(Map<String, Object> param);

	List<Map<String, Object>> getProcessStatInfo(Map<String, Object> param);

	List<Map<String, Object>> getCCTVStatInfo(Map<String, Object> param);
	
	
	


	void insertFacilityHistoryXXX(Map<String, Object> param);

	List<Map<String, Object>> getFacilityHistoryListXXX(Map<String, Object> param);

	Map<String, Object> getFacilityHistoryXXX(Map<String, Object> param);

	void updateFacilityHistoryXXX(Map<String, Object> param);

	void deleteFacilityHistoryXXX(Map<String, Object> param);

	void deleteFacilityHistoryByFcltIdXXX(Map<String, Object> param);

	String selectFacilityHistoryMaxIdXXX();
}
