package com.MainMenuShop.MainMenuShop.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String referencia;
    private String vendedor;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Clientes cliente;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TicketProducto> productos;


    @Temporal(TemporalType.DATE)
    @Column(name = "fecha")
    private Date fecha;


    private LocalTime hora;

    private String metodoPago;

    private double importeTotal;
}
