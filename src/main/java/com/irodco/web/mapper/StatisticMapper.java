package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

public interface StatisticMapper 
{
	List<Map <String,String>> getStatisticDayList(Map<String, String> param);
	
	List<Map <String,String>> getStatisticHourList(Map<String, String> param);
	
	List<Map <String,String>> getCCTVStatisticList(Map<String, String> param);

	void insertStatistic(Map<String, String> param);
	
	void updateIsLiveApp(Map<String, String> param);
	
}
