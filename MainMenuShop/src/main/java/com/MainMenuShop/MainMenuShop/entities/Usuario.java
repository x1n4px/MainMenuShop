package com.MainMenuShop.MainMenuShop.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "usuarios")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(nullable = false, unique = true)
	private String username; //email
	@Column(nullable = false)
	private String password;

	private String nombre;
	private String apellido1;
	private String apellido2;

	public enum Role{
		RESPONSABLE,
		VENDEDOR,
		CLIENTE,
		CORRECTOR,
		VICERRECTORADO
	}
	
	@Column(nullable = false)
	@ElementCollection(fetch = FetchType.EAGER) @Enumerated(EnumType.STRING)
	private Set<Role> roles = new HashSet<Role>();
	
	@OneToOne
	private Clientes clientes;


	public void setCliente(Clientes cliente) {
		this.nombre = cliente.getNombre();
		this.apellido1 = cliente.getApellido1();
		this.apellido2 = cliente.getApellido2();
		this.username = cliente.getEmail();
	}
}