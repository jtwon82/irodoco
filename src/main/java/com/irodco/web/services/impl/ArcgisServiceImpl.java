package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.ArcgisMapper;
import com.irodco.web.services.ArcgisService;

@Service(value = "arcgisService")
public class ArcgisServiceImpl implements ArcgisService {

	public static final Logger LOGGER = LoggerFactory.getLogger(ArcgisServiceImpl.class);

	@Autowired
	private SqlSession sqlSession;

	public ArcgisServiceImpl() {
	}

	@Override
	public ArcgisMapper getMapper() {
		return sqlSession.getMapper(ArcgisMapper.class);
	}

	@Override
	public List<Map<String, Object>> getStationList(Map<String, Object> param) {
		return getMapper().getStationList(param);
	}

	@Override
	public List<Map<String, Object>> getClassBreaksRender(Map<String, Object> param) {
		return getMapper().getClassBreaksRender(param);
	}
}
