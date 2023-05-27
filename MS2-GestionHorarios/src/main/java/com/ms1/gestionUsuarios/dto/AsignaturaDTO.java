package com.ms1.gestionUsuarios.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms1.gestionUsuarios.entities.Materia;
import lombok.*;

import java.net.URI;
import java.util.function.Function;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignaturaDTO {
	
	private Long id;
    private String nombre;
    private boolean eliminada;

    public static AsignaturaDTO fromAsignatura(Materia materia, Function<Long, URI> uriBuilder) {
		var dto = new AsignaturaDTO();
		dto.setId(materia.getId());
		dto.setNombre(materia.getNombre());
		dto.setEliminada(materia.isEliminada());

		return dto;
	}
	
	public Materia asignatura() {
		var asig = new Materia();
		asig.setId(id);
		asig.setNombre(nombre);
		asig.setEliminada(eliminada);
		return asig;
	}
}
