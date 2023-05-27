package com.MainMenuShop.MainMenuShop.controller;


import com.MainMenuShop.MainMenuShop.dto.*;
import com.MainMenuShop.MainMenuShop.entities.Usuario;
import com.MainMenuShop.MainMenuShop.repositories.UsuarioRepository;
import com.MainMenuShop.MainMenuShop.security.CustomAuthenticationManager;
import com.MainMenuShop.MainMenuShop.security.JwtUtil;
import com.MainMenuShop.MainMenuShop.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class LoginController {
	
	@Autowired
	private JwtUserDetailsService userDetailsService;
	@Autowired
	private CustomAuthenticationManager authenticationManager;
	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private JwtUtil jwtTokenUtil;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@PostMapping("/register")
	public ResponseEntity<?> saveUser(@RequestBody UsuarioDTO user) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(user));
	}	

	private void authenticate(String username, String password) throws Exception {
	try {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	} catch (DisabledException e) {
		throw new Exception("USER_DISABLED", e);
	} catch (BadCredentialsException e) {
		throw new Exception("INVALID_CREDENTIALS", e);
	}
}
	
	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequestDTO authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok().body(new JwtResponseDTO(token));
	}


	@PostMapping("/passwordreset")
	@ResponseStatus(code= HttpStatus.OK)
	public ResponseEntity<NuevaContrasenaDTO> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
		Optional<Usuario> optionalUsuario = userDetailsService.buscarUsername(resetPasswordDTO.getUsername());

		String nuevaContrasena = null;
		if (optionalUsuario.isPresent()) {
			Usuario usuario = optionalUsuario.get();
			nuevaContrasena = generateRandomPassword();
			usuario.setPassword(bcryptEncoder.encode(nuevaContrasena));
			usuarioRepository.save(usuario);
            /*
            COMUNICACIÓN CON MICROSERVICIO NOTIFICACIONES
             */
		}
		return ResponseEntity.ok().body(new NuevaContrasenaDTO(nuevaContrasena));
	}


	private String generateRandomPassword() {
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (int i = 0; i < 10; i++) {
			int index = random.nextInt(characters.length());
			sb.append(characters.charAt(index));
		}
		return sb.toString();
	}


}
