package com.sistema.examenes.modelo;

import javax.persistence.*;

@Entity
@Table(name = "ticket_producto")
public class Ticket_Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Productos producto;

    private double cantidad;
}
