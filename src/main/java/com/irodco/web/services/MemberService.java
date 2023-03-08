package com.irodco.web.services;

import java.util.List;
import java.util.Map;

import com.irodco.web.mapper.MemberMapper;
import com.irodco.web.models.Member;

public interface MemberService {
	
	MemberMapper getMapper();

	List<Member> getUserList(Map<String, Object> param);

	Member getUser(Map<String, Object> param);

}
