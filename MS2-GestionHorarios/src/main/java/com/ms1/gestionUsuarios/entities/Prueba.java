package com.ms1.gestionUsuarios.entities;


import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
public class Prueba {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    
    @Column(nullable = false)
    private boolean eliminada;
    
    @ManyToOne(optional = false)
    private Materia materia;
    
    @ManyToOne(optional = false)
    private Horario slots;


    
}
