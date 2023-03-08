package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.FacilityMapper;
import com.irodco.web.services.FacilityService;

@Service(value = "facilityService")
public class FacilityServiceImpl implements FacilityService {

	public static final Logger LOGGER = LoggerFactory.getLogger(FacilityServiceImpl.class);

	@Autowired
	private SqlSession sqlSession;

	public FacilityServiceImpl() {
	}

	@Override
	public List<Map<String, Object>> getFacilityList(Map<String, Object> param) {
		return getMapper().getFacilityList(param);
	}

	@Override
	public List<Map<String, Object>> getFacilityList2(Map<String, Object> param) {
		return getMapper().getFacilityList2(param);
	}

	@Override
	public Map<String, Object> getFacility(Map<String, Object> param) {
		return getMapper().getFacility(param);
	}

	@Override
	public Map<String, Object> getFacility2(Map<String, Object> param) {
		return getMapper().getFacility2(param);
	}

	@Override
	public Map<String, Object> getFacilityIMGE(Map<String, Object> param) {
		return getMapper().getFacilityIMGE(param);
	}

	@Override
	public Map<String, Object> getFacilityDirection(Map<String, Object> param) {
		return getMapper().getFacilityDirection(param);
	}

	@Override
	public void updateFacility(Map<String, Object> param) {
		getMapper().updateFacility(param);
	}

	@Override
	public void updateFacilityDirection(Map<String, Object> param) {
		getMapper().updateFacilityDirection(param);
	}

	@Override
	public void updateFacilityDirectionDelete(Map<String, Object> param) {
		getMapper().updateFacilityDirectionDelete(param);
	}

	@Override
	public void updateFacilityQRcode(Map<String, Object> param) {
		getMapper().updateFacilityQRcode(param);
	}

	@Override
	public void deleteFacility(Map<String, Object> param) {
		getMapper().deleteFacility(param);
	}

	@Override
	public List<Map<String, Object>> getEQIPList(Map<String, Object> param) {
		return getMapper().getEQIPList(param);
	}

	@Override
	public Map<String, Object> getEQIP(Map<String, Object> param) {
		return getMapper().getEQIP(param);
	}
	@Override
	public void updateEQIP(Map<String, Object> param) {
		getMapper().updateEQIP(param);
	}
	
	
	

	@Override
	public void updateFacilityINTV_YN(Map<String, Object> param) {
		getMapper().updateFacilityINTV_YN(param);
	}

	@Override
	public String selectFacilityMaxId() {
		return getMapper().selectFacilityMaxId();
	}

	@Override
	public void insertFacility(Map<String, Object> param) {
		getMapper().insertFacility(param);
	}

	@Override
	public List<Map<String, Object>> getIncidentList(Map<String, Object> param) {
		return getMapper().getIncidentList(param);
	}

	@Override
	public List<Map<String, Object>> getProcessStatInfo(Map<String, Object> param) {
		return getMapper().getProcessStatInfo(param);
	}

	@Override
	public List<Map<String, Object>> getCCTVStatInfo(Map<String, Object> param) {
		return getMapper().getCCTVStatInfo(param);
	}

	@Override
	public FacilityMapper getMapper() {
		FacilityMapper facilityMapper = sqlSession.getMapper(FacilityMapper.class);
		return facilityMapper;
	}

	


	@Override
	public List<Map<String, Object>> getFacilityHistoryListXXX(Map<String, Object> param) {
		return getMapper().getFacilityHistoryListXXX(param);
	}

	@Override
	public Map<String, Object> getFacilityHistoryXXX(Map<String, Object> param) {
		return getMapper().getFacilityHistoryXXX(param);
	}

	@Override
	public void updateFacilityHistoryXXX(Map<String, Object> param) {
		getMapper().updateFacilityHistoryXXX(param);
	}

	@Override
	public void deleteFacilityHistoryXXX(Map<String, Object> param) {
		getMapper().deleteFacilityHistoryXXX(param);
	}

	@Override
	public String selectFacilityHistoryMaxIdXXX() {
		return getMapper().selectFacilityHistoryMaxIdXXX();
	}

	@Override
	public void insertFacilityHistoryXXX(Map<String, Object> param) {
		getMapper().insertFacilityHistoryXXX(param);
	}

	@Override
	public void deleteFacilityHistoryByFcltIdXXX(Map<String, Object> param) {
		getMapper().deleteFacilityHistoryByFcltIdXXX(param);
	}
}
