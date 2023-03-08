package com.irodco.web.services;

import java.util.List;
import java.util.Map;

import com.irodco.web.mapper.TbUserMapper;
import com.irodco.web.models.Tb_User;

public interface TbUserService 
{
	TbUserMapper getMapper();
	
	List<Tb_User> getUserList(Map<String, Object> param);
	
	Tb_User getUser(Map<String, Object> param);
	
}
