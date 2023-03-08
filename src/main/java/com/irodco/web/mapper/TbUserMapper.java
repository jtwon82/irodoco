package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

import com.irodco.web.models.Tb_User;

public interface TbUserMapper {
	List<Tb_User> getUserList(Map<String, Object> param);

	Tb_User getUser(Map<String, Object> param);
}
