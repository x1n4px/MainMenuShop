package com.ms1.gestionUsuarios.controller;


import com.ms1.gestionUsuarios.dto.HorarioDTO;
import com.ms1.gestionUsuarios.entities.Horario;
import com.ms1.gestionUsuarios.entities.Prueba;
import com.ms1.gestionUsuarios.exceptios.EntidadExistenteException;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.SlotsRepository;
import com.ms1.gestionUsuarios.service.SlotsServicio;
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
@RequestMapping("/slots")
public class SlotsRest {
	@Autowired
	private SlotsServicio servicio;
	@Autowired
	private SlotsRepository slotsRepository;
	public SlotsRest(SlotsServicio servicio) {
		this.servicio = servicio;
	}

	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@GetMapping
	public List<HorarioDTO> obtenerTodosLosHorarios(UriComponentsBuilder uriBuilder) {
		var slots = servicio.obtenerHorarios();
		return slots.stream()
				.map(hor->HorarioDTO.fromHorario(hor,
						horarioUriBuilder(uriBuilder.build())))
		.collect(Collectors.toList());
	}
	
	public static Function<Long, URI> horarioUriBuilder(UriComponents uriComponents) {
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance().uriComponents(uriComponents);
		return id -> uriBuilder.path("/slots")
				.path(String.format("/%d", id))
				.build()
				.toUri();
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PostMapping
	public ResponseEntity<?> aniadirHorario(@RequestBody HorarioDTO horarioDTO, UriComponentsBuilder uriBuilder) {
		Horario slots = horarioDTO.horario();
		slotsRepository.save(slots);
		Long id = slots.getId();
		URI location = uriBuilder.path("/slots").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@GetMapping("{idSlot}")
	public HorarioDTO obtenerHorario(@PathVariable Long idSlot, UriComponentsBuilder uriBuilder) {
		Horario horario = servicio.obtenerHorario(idSlot);
		return HorarioDTO.fromHorario(horario, horarioUriBuilder(uriBuilder.build()));
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PutMapping("{idSlot}")
	public ResponseEntity<?> actualizarHorario(@PathVariable Long idSlot, @RequestBody Horario horario) {
		Optional<Horario> optionalHorario = slotsRepository.findById(idSlot);
		if(!optionalHorario.isPresent()){
			return ResponseEntity.notFound().build();
		}
		horario.setId(idSlot);
		servicio.actualizarHorario(horario);
		return ResponseEntity.ok().build();
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@DeleteMapping("{idSlot}")
	public void eliminarHorario(@PathVariable Long idSlot) {
		Optional<Horario> horario = servicio.obtenerSlot(idSlot);
		if (!horario.isPresent()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
		}
		servicio.eliminarUsuario(idSlot);
	}
	
	@ExceptionHandler(EntidadNoEncontradaException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public void noEncontrado() {}
	
	@ExceptionHandler(EntidadExistenteException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public void existente() {}
}
