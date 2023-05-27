package com.ms1.gestionUsuarios.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms1.gestionUsuarios.entities.Convocatoria;
import lombok.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.function.Function;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConvocatoriaDTO {

	private Long id;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
	private String conv;

	public static ConvocatoriaDTO fromConvocatoria(Convocatoria convocatoria, Function<Long, URI> uriBuilder) {
		var dto = new ConvocatoriaDTO();
		dto.setId(convocatoria.getId());
		dto.setConv(convocatoria.getNombre());
		dto.setFechaInicio(convocatoria.getFechaInicio());
		dto.setFechaFin(convocatoria.getFechaFin());

		return dto;
	}
    
    public Convocatoria convocatoria() {
		var con = new Convocatoria();
		con.setId(id);
		con.setFechaInicio(fechaInicio);
		con.setFechaFin(fechaFin);
		con.setNombre(conv);
		return con;
	}
	
}
