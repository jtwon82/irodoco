package com.irodco.web.services;

import java.util.List;
import java.util.Map;

import com.irodco.web.mapper.NoticeMapper;
import com.irodco.web.models.Notice;

public interface NoticeService {
	NoticeMapper getMapper();
	
	List<Notice> getTopicNoticeList();

	List<Notice> getNoticeList(Map<String, Object> param);

	Notice getNotice(Map<String, Object> param);

	void updateNotice(Map<String, Object> param);

	void deleteNotice(Map<String, Object> param);

	int selectNoticeMaxId();

	int insertNotice(Map<String, Object> param);
}
