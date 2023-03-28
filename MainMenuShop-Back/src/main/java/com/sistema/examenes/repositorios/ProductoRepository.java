package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Productos, Long> {
}
