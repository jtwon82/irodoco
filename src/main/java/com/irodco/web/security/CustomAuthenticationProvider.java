package com.irodco.web.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.irodco.web.mapper.TbUserMapper;
import com.irodco.web.models.Tb_User;

public class CustomAuthenticationProvider implements AuthenticationProvider {

	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String user_id = (String) authentication.getPrincipal();
		String user_pw = (String) authentication.getCredentials();

		if (!user_id.equals("") && !user_pw.equals("")) {
			TbUserMapper mapper = sqlSession.getMapper(TbUserMapper.class);

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("user_id", user_id);
			param.put("pw", user_pw);
			logger.debug("46 user={}", param);
			Tb_User m = mapper.getUser(param);
			
			if (m != null) {
				logger.debug("48 m={}", m);

				if (m.getPw().equals(user_pw)) {
					logger.info("50 login ok {}", m);

					List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
					roles.add(new SimpleGrantedAuthority( m.getAuth_cd() ));

					UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(user_id,
							user_pw, roles);

					result.setDetails(new CustomUserDetails(m.getUser_id(), m.getPw(), m.getAuth_cd()));
					return result;
				} else {
					return null;
				}
			} else {
				logger.info("로그인실패");
				throw new BadCredentialsException("Bad credentials");
			}

		} else {
			logger.info("사용자 크리덴셜 정보가 틀립니다. 에러가 발생합니다.");
			throw new BadCredentialsException("Bad credentials");
		}
	}
}