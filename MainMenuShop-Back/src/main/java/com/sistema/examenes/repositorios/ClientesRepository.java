package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Clientes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientesRepository extends JpaRepository<Clientes, Long> {
}
