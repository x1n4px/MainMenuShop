package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Tienda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TiendaRepositorio extends JpaRepository<Tienda, Long> {
}
