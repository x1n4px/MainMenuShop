package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Productos;
import com.sistema.examenes.modelo.TicketProducto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketProductoRepository extends JpaRepository<TicketProducto, Long> {
}
