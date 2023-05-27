package com.ms1.gestionUsuarios.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms1.gestionUsuarios.entities.Horario;
import com.ms1.gestionUsuarios.entities.Materia;
import com.ms1.gestionUsuarios.entities.Prueba;
import lombok.*;

import java.net.URI;
import java.util.function.Function;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PruebaDTO {
	
	private Long id;
    private boolean eliminada;
    private Materia materia;
    private Horario slots;

	public static PruebaDTO fromPrueba(Prueba prueba, Function<Long, URI> uriBuilder) {
		PruebaDTO dto = new PruebaDTO();
		dto.setId(prueba.getId());
 		dto.setEliminada(prueba.isEliminada());
		dto.setSlots(prueba.getSlots());
		dto.setMateria(prueba.getMateria());
		return dto;
	}
    
    public Prueba prueba() {
		Prueba pru = new Prueba();
		pru.setId(id);
		pru.setEliminada(eliminada);
 		pru.setSlots(slots);
		pru.setMateria(materia);
 		return pru;
	}
}	
