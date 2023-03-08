package com.irodco.mybatis;

import java.util.ArrayList;
import java.util.Map;

import com.irodco.web.mapper.TbUserMapper;
import com.irodco.web.models.Tb_User;

public interface MemberDAO {
	
	TbUserMapper getMapper();

	public ArrayList<Tb_User> getMembers();

	public Tb_User getMembers(Map<String, Object> param);

}
