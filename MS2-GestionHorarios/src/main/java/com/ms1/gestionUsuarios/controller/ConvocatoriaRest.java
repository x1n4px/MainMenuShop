package com.ms1.gestionUsuarios.controller;

import com.ms1.gestionUsuarios.dto.ConvocatoriaDTO;
import com.ms1.gestionUsuarios.entities.Convocatoria;
import com.ms1.gestionUsuarios.exceptios.EntidadExistenteException;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.ConvocatoriaRepository;
import com.ms1.gestionUsuarios.service.ConvocatoriaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
 public class ConvocatoriaRest {
	@Autowired
	private ConvocatoriaServicio servicio;
	@Autowired
	private ConvocatoriaRepository convocatoriaRepository;
	

	@GetMapping("/convocatorias")
	public List<ConvocatoriaDTO> obtenerTodasLasConvocatorias(UriComponentsBuilder uriBuilder) {
		var convocatorias = convocatoriaRepository.findAll();
		return convocatorias.stream()
				.map(conv->ConvocatoriaDTO.fromConvocatoria(conv,
						convocatoriaUriBuilder(uriBuilder.build())))
		.collect(Collectors.toList());
	}
	
	public static Function<Long, URI> convocatoriaUriBuilder(UriComponents uriComponents) {
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance().uriComponents(uriComponents);
		return id -> uriBuilder.path("/convocatorias")
				.path(String.format("/%d", id))
				.build()
				.toUri();
	}
	
	public static Function<Long, URI> convocatoriaActualUriBuilder(UriComponents uriComponents) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.newInstance().uriComponents(uriComponents);
        return id -> uriBuilder.path("/convocatorias/actual")
                .build()
                .toUri();
    }
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@PostMapping("/convocatorias")
	public ResponseEntity<?> aniadirConvocatoria (@RequestBody ConvocatoriaDTO convocatoriaDTO, UriComponentsBuilder uriBuilder) {
		Convocatoria convocatoria = convocatoriaDTO.convocatoria();
		convocatoriaRepository.save(convocatoria);
		Long id = convocatoria.getId();
		URI location = uriBuilder.path("/convocatorias").buildAndExpand(id).toUri();

		return ResponseEntity.created(location).build();
	}
	@PreAuthorize("hasRole('ROLE_VICERRECTORADO')")
	@GetMapping("convocatorias/actual")
	public ConvocatoriaDTO obtenerConvocatoriaActual(UriComponentsBuilder uriBuilder) {
	    Convocatoria convocatoria = servicio.obtenerConvocatoriaActual();
	    return ConvocatoriaDTO.fromConvocatoria(convocatoria, convocatoriaActualUriBuilder(uriBuilder.build()));
	}
	
	@ExceptionHandler(EntidadNoEncontradaException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public void noEncontrado() {}
	
	@ExceptionHandler(EntidadExistenteException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public void existente() {}
}