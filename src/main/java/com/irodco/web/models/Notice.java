package com.irodco.web.models;

import java.io.Serializable;

public class Notice implements Serializable{

	int num=0;
	String page="";
	String notice_id="";
	String title="";
	String user_id="";
	String user_name="";
	String NOTICE_TYPE="";
	String content="";
	String regdate="";
	String regdates="";
	String file_path="";
	String total_cnt="";
	String CODE_KRNM="";
	String IS_DEL="";
	
	@Override
	public String toString() {
		return "Notice [num=" + num + ", page=" + page + ", notice_id=" + notice_id + ", title=" + title + ", user_id="
				+ user_id + ", user_name=" + user_name + ", NOTICE_TYPE=" + NOTICE_TYPE + ", content=" + content
				+ ", regdate=" + regdate + ", regdates=" + regdates + ", file_path=" + file_path + ", total_cnt="
				+ total_cnt + ", CODE_KRNM=" + CODE_KRNM + ", IS_DEL=" + IS_DEL + "]";
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getNotice_id() {
		return notice_id;
	}
	public void setNotice_id(String notice_id) {
		this.notice_id = notice_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getNOTICE_TYPE() {
		return NOTICE_TYPE;
	}
	public void setNOTICE_TYPE(String nOTICE_TYPE) {
		NOTICE_TYPE = nOTICE_TYPE;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getRegdate() {
		return regdate;
	}
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	public String getRegdates() {
		return regdates;
	}
	public void setRegdates(String regdates) {
		this.regdates = regdates;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getTotal_cnt() {
		return total_cnt;
	}
	public void setTotal_cnt(String total_cnt) {
		this.total_cnt = total_cnt;
	}
	public String getCODE_KRNM() {
		return CODE_KRNM;
	}
	public void setCODE_KRNM(String cODE_KRNM) {
		CODE_KRNM = cODE_KRNM;
	}
	public String getIS_DEL() {
		return IS_DEL;
	}
	public void setIS_DEL(String iS_DEL) {
		IS_DEL = iS_DEL;
	}
}
