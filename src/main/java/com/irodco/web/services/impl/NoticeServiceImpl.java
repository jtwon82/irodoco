package com.irodco.web.services.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irodco.web.mapper.NoticeMapper;
import com.irodco.web.models.Notice;
import com.irodco.web.services.NoticeService;

@Service(value = "noticeService")
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private SqlSession sqlSession;

	public NoticeServiceImpl() {
	}

	@Override
	public List<Notice> getTopicNoticeList() {
		return getMapper().getTopicNoticeList();
	}

	@Override
	public List<Notice> getNoticeList(Map<String, Object> param) {
		return getMapper().getNoticeList(param);
	}

	@Override
	public Notice getNotice(Map<String, Object> param) {
		return getMapper().getNotice(param);
	}

	@Override
	public void updateNotice(Map<String, Object> param) {
		getMapper().updateNotice(param);
	}

	@Override
	public void deleteNotice(Map<String, Object> param) {
		getMapper().deleteNotice(param);
	}

	@Override
	public int selectNoticeMaxId() {
		return getMapper().selectNoticeMaxId();
	}

	@Override
	public int insertNotice(Map<String, Object> param) {
		return getMapper().insertNotice(param);
	}

	@Override
	public NoticeMapper getMapper() {
		return sqlSession.getMapper(NoticeMapper.class);
	}

}
