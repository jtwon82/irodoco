package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.StatisticMapper;
import com.irodco.web.services.StatisticService;

@Service(value = "statisticService")
public class StatisticServiceImpl implements StatisticService {

	@Autowired
	private SqlSession sqlSession;

	public StatisticServiceImpl() {
	}

	@Override
	public List<Map<String, String>> getStatisticDayList(Map<String, String> param) {
		return getMapper().getStatisticDayList(param);
	}

	@Override
	public List<Map<String, String>> getStatisticHourList(Map<String, String> param) {
		return getMapper().getStatisticHourList(param);
	}

	@Override
	public List<Map<String, String>> getCCTVStatisticList(Map<String, String> param) {
		return getMapper().getCCTVStatisticList(param);
	}

	@Override
	public void insertStatistic(Map<String, String> param) {
		getMapper().insertStatistic(param);
	}

	@Override
	public void updateIsLiveApp(Map<String, String> param) {
		getMapper().updateIsLiveApp(param);
	}

	@Override
	public StatisticMapper getMapper() {
		return sqlSession.getMapper(StatisticMapper.class);
	}

}
