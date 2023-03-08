package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.TbUserMapper;
import com.irodco.web.models.Tb_User;
import com.irodco.web.services.TbUserService;

@Service(value = "tbUserService")
public class TbUserServiceImpl implements TbUserService {

	@Autowired
	private SqlSession sqlSession;

	public TbUserServiceImpl() {
	}

	@Override
	public List<Tb_User> getUserList(Map<String, Object> param) {
		return getMapper().getUserList(param);
	}

	@Override
	public Tb_User getUser(Map<String, Object> param) {
		return getMapper().getUser(param);
	}

	@Override
	public TbUserMapper getMapper() {
		return sqlSession.getMapper(TbUserMapper.class);
	}

}
