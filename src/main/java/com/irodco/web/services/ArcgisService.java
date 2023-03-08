package com.irodco.web.services;

import java.util.List;
import java.util.Map;

import com.irodco.web.mapper.ArcgisMapper;

public interface ArcgisService {

	ArcgisMapper getMapper();

	List<Map<String, Object>> getStationList(Map<String, Object> param);
	
	List<Map<String, Object>> getClassBreaksRender(Map<String, Object> param);

}
