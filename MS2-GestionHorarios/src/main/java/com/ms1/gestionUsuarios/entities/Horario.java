package com.ms1.gestionUsuarios.entities;

import lombok.*;

import jakarta.persistence.*;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private LocalTime horaInicio;

    private LocalTime horaFin;

    @Column(nullable = false)
    private boolean eliminada;

    @ManyToOne
    private Convocatoria convocatoria;

}
