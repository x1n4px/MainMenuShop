package com.ms1.gestionUsuarios.entities;

import lombok.*;

import jakarta.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
public class Convocatoria {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @Column(nullable = false)
    private LocalDate fechaInicio;
	
    @Column(nullable = false)
    private LocalDate fechaFin;
    
	@Column(nullable = false)
	private String nombre;


}
