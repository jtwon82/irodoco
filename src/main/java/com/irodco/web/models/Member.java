package com.irodco.web.models;

import java.io.Serializable;

public class Member implements Serializable 
{
	private static final long serialVersionUID = 1L;
	
	private String userid;
	private String password;
	private String username;
	private String e_mail;
	private String phone;
	private String division;
	private String authority;
	private String enabled;
	private String reg_date;
	
	public String getUserid() 
	{
		return userid;
	}
	public void setUserid(String userid) 
	{
		this.userid = userid;
	}
	public String getPassword() 
	{
		return password;
	}
	public void setPassword(String password) 
	{
		this.password = password;
	}
	public String getUsername() 
	{
		return username;
	}
	public void setUsername(String username) 
	{
		this.username = username;
	}
	public String getE_mail() 
	{
		return e_mail;
	}
	public void setE_mail(String e_mail) 
	{
		this.e_mail = e_mail;
	}
	public String getPhone() 
	{
		return phone;
	}
	public void setPhone(String phone) 
	{
		this.phone = phone;
	}
	public String getDivision() 
	{
		return division;
	}
	public void setDivision(String division) 
	{
		this.division = division;
	}
	public String getAuthority() 
	{
		return authority;
	}
	public void setAuthority(String authority) 
	{
		this.authority = authority;
	}
	public String getEnabled() 
	{
		return enabled;
	}
	public void setEnabled(String enabled) 
	{
		this.enabled = enabled;
	}
	public String getReg_date() 
	{
		return reg_date;
	}
	public void setReg_date(String reg_date) 
	{
		this.reg_date = reg_date;
	}
	
	@Override
	public String toString() 
	{
		return "Member [userid=" + userid + ", password=" + password + ", username=" + username + ", e_mail=" + e_mail
				+ ", phone=" + phone + ", division=" + division + ", authority=" + authority + ", enabled=" + enabled
				+ ", reg_date=" + reg_date + "]";
	}
	
}
