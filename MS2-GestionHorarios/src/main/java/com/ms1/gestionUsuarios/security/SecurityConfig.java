package com.ms1.gestionUsuarios.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {	
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;	

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;	
		
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// We don't need CSRF for this example
		http
		.cors()
		.and()
		.csrf().disable()
				// dont authenticate this particular request
		        .authorizeHttpRequests()
		        .requestMatchers("/register", "/login", "/passwordreset")
		        .permitAll()
//		        .requestMatchers(HttpMethod.GET, "/ejemplo1").hasAnyRole("ROLE_RESPONSABLE_AULA","ROLE_VIGILANTE_AULA", "RESPONSABLE_AULA","VIGILANTE_AULA")
//		        .requestMatchers(HttpMethod.GET, "/ejemplo2").hasAnyRole("CORRECTOR")		        
//		        .requestMatchers("/login")
//		        .anonymous()
		        .anyRequest()
		        .authenticated()
		        .and()
				// make sure we use stateless session; session won't be used to
				// store user's state.
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// Add a filter to validate the tokens with every request
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);		
		return http.build();
	}


}
