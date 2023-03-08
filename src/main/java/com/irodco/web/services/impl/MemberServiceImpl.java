package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.MemberMapper;
import com.irodco.web.models.Member;
import com.irodco.web.services.MemberService;

@Service(value = "memberService")
public class MemberServiceImpl implements MemberService {

	@Autowired
	private SqlSession sqlSession;

	public MemberServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Member> getUserList(Map<String, Object> param) {
		return getMapper().getUserList(param);
	}

	@Override
	public Member getUser(Map<String, Object> param) {
		return getMapper().getUser(param);
	}

	@Override
	public MemberMapper getMapper() {
		// TODO Auto-generated method stub
		return sqlSession.getMapper(MemberMapper.class);
	}

}
