package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

import com.irodco.web.models.Member;

public interface MemberMapper 
{
	List<Member> getUserList(Map<String, Object> param);
	
	Member getUser(Map<String, Object> param);
}
