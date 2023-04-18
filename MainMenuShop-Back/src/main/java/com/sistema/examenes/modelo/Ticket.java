package com.sistema.examenes.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String referencia;
   // private LocalDateTime fecha;

  //  private LocalDateTime hora;

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
}
