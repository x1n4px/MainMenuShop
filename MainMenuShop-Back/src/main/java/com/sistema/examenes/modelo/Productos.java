package com.sistema.examenes.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "productos")
public class Productos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Column(unique = true)
    private String referencia; //Código generado para cada producto, normalmente tiene 8 dígitos
    private String nombre; //Nombre del producto
    private String marca; //Marca del producto
    private String Tipo; //Tipo de productos (comida, comida humeda, utensilios)
    private String variedad; //
    private String modulo; //Numero de modulo, empieza por K + digito de familia + 3 digitos
    private String Familia; //Tipo de mascota (perro, gato)

    private String etapaVida; //Etapa de vida de la mascota (en caso de perro/gato, puppy o adulto)

    private double precio; //Precio del producto
    private double peso; //Peso del producto

    private String estado; //Encargable o no encargable



}
