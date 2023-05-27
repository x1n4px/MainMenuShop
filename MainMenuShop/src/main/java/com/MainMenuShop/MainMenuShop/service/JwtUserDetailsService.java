package com.MainMenuShop.MainMenuShop.service;


import com.MainMenuShop.MainMenuShop.dto.UsuarioDTO;
import com.MainMenuShop.MainMenuShop.entities.Usuario;
import com.MainMenuShop.MainMenuShop.exceptios.EntidadExistenteException;
import com.MainMenuShop.MainMenuShop.exceptios.EntidadNoEncontradaException;
import com.MainMenuShop.MainMenuShop.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository userRepo;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> user = userRepo.findByUsername(username);
		if (!user.isPresent()) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		Set<SimpleGrantedAuthority> auths = new java.util.HashSet<SimpleGrantedAuthority>();
		Set<Usuario.Role> roles = user.get().getRoles();
		roles.forEach(rol -> auths.add(new SimpleGrantedAuthority("ROLE_" + rol.toString())));
		
		return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(),
				auths);
	}


	public Optional<Usuario> buscarUsername(String username){
		return userRepo.findByUsername(username);
	}

	public Optional<Usuario> buscarUserNombre(String nombre){return userRepo.findByNombre(nombre);}

	public Integer aniadirUsuario(Usuario usuario) {
		if (userRepo.existsByNombre(usuario.getNombre())) {
			throw new EntidadExistenteException();
		}
		usuario.setPassword("0000");
 		userRepo.save(usuario);
		return usuario.getId();
	}

	public Usuario save(UsuarioDTO user) {
		Usuario newUser = new Usuario();
		newUser.setUsername(user.getUsername());
		newUser.setRoles(user.getRoles());

		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepo.save(newUser);
	}






	public Optional<Usuario> obtenerUsuario(Integer id){
		return userRepo.findById(id);
	}

	public Usuario guardarUsuario(Usuario user){
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}



	public List<Usuario> obtenerUsuarios(){
		return userRepo.findAll();
	}

	public void modificarUsuario(Usuario usuario) {
			userRepo.save(usuario);
	}


	public void eliminarUsuario(Integer id){
		if(userRepo.existsById(id)){
			userRepo.deleteById(id);
		}else{
			throw new EntidadNoEncontradaException();
		}
	}


}