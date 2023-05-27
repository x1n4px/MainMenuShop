package com.ms1.gestionUsuarios.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;


import com.ms1.gestionUsuarios.dto.AsignaturaDTO;
import com.ms1.gestionUsuarios.entities.Materia;
import com.ms1.gestionUsuarios.repositories.AsignaturaRepository;
import com.ms1.gestionUsuarios.service.AsignaturaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.*;

 
@RestController
@CrossOrigin("*")
 public class AsignaturaRest {
	@Autowired
	private AsignaturaServicio servicio;
	@Autowired
	private AsignaturaRepository asignaturaRepository;

	public AsignaturaRest(AsignaturaServicio servicio) {
		this.servicio = servicio;
	}

	@GetMapping("/materias")
	public List<AsignaturaDTO> obtenerTodasLasAsignaturas(UriComponentsBuilder uriBuilder) {
		var materias = asignaturaRepository.findAll();
		Function<Materia, AsignaturaDTO> mapper = (p ->
				AsignaturaDTO.fromAsignatura(p,
						productoUriBuilder(uriBuilder.build())));
		return materias.stream()
				.map(mapper)
				.toList();
	}

	public static Function<Long, URI> productoUriBuilder(UriComponents uriBuilder) {
		;
		return id -> UriComponentsBuilder.newInstance().uriComponents(uriBuilder).path("/materias")
				.path(String.format("/%d", id))
				.build()
				.toUri();
	}

	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PostMapping("/materias")
	public ResponseEntity<?> aniadirAsignatura(@RequestBody AsignaturaDTO asignaturaDTO, UriComponentsBuilder uriBuilder) {
		Materia asignatura = asignaturaDTO.asignatura();
		asignaturaRepository.save(asignatura);
		Long id = asignatura.getId();
		URI location = uriBuilder.path("/materias").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).build();
	}

	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@GetMapping("/materias/{idMateria}")
	public AsignaturaDTO obtenerAsignatura(@PathVariable Long idMateria, UriComponentsBuilder uriBuilder) {
		Materia materia = servicio.obtenerAsignatura(idMateria);
		return AsignaturaDTO.fromAsignatura(materia, productoUriBuilder(uriBuilder.build()));
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PutMapping("/materias/{idMateria}")
	public ResponseEntity<?> actualizarAsignatura(@PathVariable Long idMateria, @RequestBody Materia asignatura) {
		Optional<Materia> optionalMateria = asignaturaRepository.findById(idMateria);
		if(!optionalMateria.isPresent()){
			return ResponseEntity.notFound().build();
		}
		asignatura.setId(idMateria);
		servicio.actualizarAsignatura(asignatura);
		return ResponseEntity.ok().build();
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@DeleteMapping("/materias/{idMateria}")
	public void eliminarAsignatura(@PathVariable Long idMateria) {
		servicio.eliminarAsignatura(idMateria);
	}


}

