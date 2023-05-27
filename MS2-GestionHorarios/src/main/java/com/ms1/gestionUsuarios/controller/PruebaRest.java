package com.ms1.gestionUsuarios.controller;


import com.ms1.gestionUsuarios.dto.PruebaDTO;
import com.ms1.gestionUsuarios.entities.Prueba;
import com.ms1.gestionUsuarios.exceptios.EntidadExistenteException;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.PruebaRepository;
import com.ms1.gestionUsuarios.service.PruebaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;


@RestController
@CrossOrigin("*")
@RequestMapping("/pruebas")

public class PruebaRest {
	@Autowired
	private PruebaServicio servicio;
	@Autowired
	private PruebaRepository pruebaRepository;
	
	public PruebaRest(PruebaServicio servicio) {
		this.servicio = servicio;
	}
	
	public static Function<Long, URI> pruebaUriBuilder(UriComponents uriComponents) {
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance().uriComponents(uriComponents);
		return id -> uriBuilder.path("/pruebas")
				.path(String.format("/%d", id))
				.build()
				.toUri();
	}

	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@GetMapping
	public List<PruebaDTO> obtenerTodasLasPruebas(UriComponentsBuilder uriBuilder){
		
		var pruebas = pruebaRepository.findAll();

		return pruebas.stream()
				.map(hor-> PruebaDTO.fromPrueba(hor,
						pruebaUriBuilder(uriBuilder.build())))
				.collect(Collectors.toList());
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PostMapping
	public ResponseEntity<?> aniadirPrueba(@RequestBody PruebaDTO pruebaDTO, UriComponentsBuilder uriBuilder) {
		Prueba prueba = pruebaDTO.prueba();
		pruebaRepository.save(prueba);
		Long id = prueba.getId();
		URI location = uriBuilder.path("/prueba").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@GetMapping("{idPrueba}")
	public PruebaDTO obtenerPrueba(@PathVariable Long idPrueba, UriComponentsBuilder uriBuilder) {
		Optional<Prueba> prueba = servicio.obtenerPrueba(idPrueba);
		return PruebaDTO.fromPrueba(prueba.get(), pruebaUriBuilder(uriBuilder.build()));
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PutMapping("{idPrueba}")
	public ResponseEntity<?> actualizarPrueba(@PathVariable Long idPrueba, @RequestBody Prueba prueba) {
		Optional<Prueba> optionalHorario = pruebaRepository.findById(idPrueba);
		if(!optionalHorario.isPresent()){
			return ResponseEntity.notFound().build();
		}
		prueba.setId(idPrueba);
		servicio.actualizarPrueba(prueba);
		return ResponseEntity.ok().build();
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@DeleteMapping("{idPrueba}")
	public void eliminarPrueba(@PathVariable Long idPrueba) {
		Optional<Prueba> usuario = servicio.obtenerPrueba(idPrueba);
		if (!usuario.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
		}
		servicio.eliminarUsuario(idPrueba);
	}
	
	@ExceptionHandler(EntidadNoEncontradaException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public void noEncontrado() {}
	
	@ExceptionHandler(EntidadExistenteException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public void existente() {}
}
