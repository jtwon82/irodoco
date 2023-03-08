package com.irodco.mybatis;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.irodco.web.mapper.TbUserMapper;
import com.irodco.web.models.Tb_User;

@Repository
public class MemberDAOService implements MemberDAO {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public ArrayList<Tb_User> getMembers() {
		ArrayList<Tb_User> result = new ArrayList<Tb_User>();
		// getMember()의 메소드명과 mapper.mxl과 id는 동일해야한다.
		result = (ArrayList<Tb_User>) getMapper().getUserList(null);

		return result;
	}

	@Override
	public Tb_User getMembers(Map<String, Object> param) {
		// getMember()의 메소드명과 mapper.mxl과 id는 동일해야한다.
		Tb_User result = getMapper().getUser(param);

		return result;
	}

	@Override
	public TbUserMapper getMapper() {
		return sqlSession.getMapper(TbUserMapper.class);
	}

}
