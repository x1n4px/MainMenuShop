package com.MainMenuShop.MainMenuShop.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class Productos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Column(unique = true)
    private String referencia; //Código generado para cada producto, normalmente tiene 8 dígitos
    private String nombre; //Nombre del producto
    private String marca; //Marca del producto
    private String Categoría; //Tipo de productos (comida, comida humeda, utensilios)
    private String Nutricion; //Tipo de alimento ('Hipoalergénico', 'Natural', 'Rico en proteínas', 'Sin cereales')
    private String modulo; //Numero de modulo, empieza por K + digito de familia + 3 digitos
    private String Familia; //Tipo de mascota (perro, gato)
    private String etapaVida; //Etapa de vida de la mascota (en caso de perro/gato, puppy o adulto)
    private String tamañoRaza; //perros pequeños, medianos, grande, gigantes, toy, ....
    private String CuidadosEspecificos; //'Articulaciones', 'Cardiaco', 'Control de peso'
    private String sabores; //pollo, pavo, ternera, ...
    private String material; //acero, algodon, ...
    private String efectivoContra; //mosquitos, pulgas, ...

    private double precioNeto; //Precio del producto
    private double ivaAsociado;
    private double peso; //Peso del producto
    private String imagen;
     private String descripcion;

    private String estado; //Encargable o no encargable

}
