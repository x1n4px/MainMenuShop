package com.ms1.gestionUsuarios.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms1.gestionUsuarios.entities.Convocatoria;
import com.ms1.gestionUsuarios.entities.Horario;
import lombok.*;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.function.Function;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HorarioDTO {
	
	private Long id;
	private LocalTime horaInicio;
    private LocalTime horaFin;
    private LocalDate fecha;
    private Integer duracion;
    private boolean eliminada;
    private Convocatoria convocatoria;

	public static HorarioDTO fromHorario(Horario slots, Function<Long, URI> uriBuilder) {
		HorarioDTO dto = new HorarioDTO();
		dto.setId(slots.getId());
		dto.setHoraInicio(slots.getHoraInicio());
		dto.setHoraFin(slots.getHoraFin());
 		dto.setEliminada(slots.isEliminada());;
		dto.setConvocatoria(slots.getConvocatoria());

		return dto;
	}
	
	public Horario horario() {
		Horario hor = new Horario();
		hor.setId(id);
		hor.setHoraInicio(horaInicio);
		hor.setHoraFin(horaFin);
 		hor.setEliminada(eliminada);
		hor.setConvocatoria(convocatoria);
		return hor;
	}

}
