package com.MainMenuShop.MainMenuShop.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Vale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fechaInicio;
    private Date fechaExpiracion;

    private double cantidad;
    private String condicion;
    private Date fechaUso;
    private Boolean utilizado;
    private String ticketReferencia;
}
