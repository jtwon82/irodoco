package com.irodco.web.mapper;

import java.util.List;
import java.util.Map;

import com.irodco.web.models.Notice;

public interface NoticeMapper {
	
	NoticeMapper getMapper();

	List<Notice> getTopicNoticeList();

	List<Notice> getNoticeList(Map<String, Object> param);

	Notice getNotice(Map<String, Object> param);

	void updateNotice(Map<String, Object> param);

	void deleteNotice(Map<String, Object> param);

	int selectNoticeMaxId();

	int insertNotice(Map<String, Object> param);

}
