package com.sistema.examenes.modelo;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String referencia; //Número de referencia del ticket

    private String nombreVendedor; //Nombre del vendedor

    private LocalDateTime fechaCompra;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario vendedor;

    private double costeFinal;


    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<Ticket_Producto> ticketProductos;
}
