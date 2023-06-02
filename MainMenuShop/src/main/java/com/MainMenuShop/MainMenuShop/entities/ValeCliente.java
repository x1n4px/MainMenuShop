package com.MainMenuShop.MainMenuShop.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class ValeCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Clientes cliente;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vale_id")
    private Vale vale;

    private int referencia;
}
