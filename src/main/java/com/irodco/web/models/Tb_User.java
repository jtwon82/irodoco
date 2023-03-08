package com.irodco.web.models;

import java.io.Serializable;

public class Tb_User implements Serializable 
{
	
	private String user_id;
	private String pw;     
	private String intn_nm;
	private String dprt;   
	private String phnb;   
	private String email;   
	private String auth_cd;
	
	@Override
	public String toString() {
		return "Tb_User [user_id=" + user_id + ", pw=" + pw + ", intn_nm=" + intn_nm + ", dprt=" + dprt + ", phnb="
				+ phnb + ", email=" + email + ", auth_cd=" + auth_cd + "]";
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getIntn_nm() {
		return intn_nm;
	}
	public void setIntn_nm(String intn_nm) {
		this.intn_nm = intn_nm;
	}
	public String getDprt() {
		return dprt;
	}
	public void setDprt(String dprt) {
		this.dprt = dprt;
	}
	public String getPhnb() {
		return phnb;
	}
	public void setPhnb(String phnb) {
		this.phnb = phnb;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAuth_cd() {
		return auth_cd;
	}
	public void setAuth_cd(String auth_cd) {
		this.auth_cd = auth_cd;
	}

}
