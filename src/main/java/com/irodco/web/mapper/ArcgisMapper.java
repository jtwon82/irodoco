package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

public interface ArcgisMapper {
	
	List<Map<String, Object>> getStationList(Map<String, Object> param);
	
	List<Map<String, Object>> getClassBreaksRender(Map<String, Object> param);

}
