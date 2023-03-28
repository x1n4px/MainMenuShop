package com.sistema.examenes.modelo;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class Clientes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre;
    private String apellido1;
    private String apellido2;
    @Column(unique = true)
    private String dni;
    private String localidad;
    private String codigoPostal;
    private String numeroTelefono;
    private String numeroMovil;
    private String email;



}
