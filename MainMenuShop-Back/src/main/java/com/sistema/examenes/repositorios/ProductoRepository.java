package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Productos, Long> {
    List<Productos> findByReferenciaContainingOrNombreContaining(String referencia, String nombre);
}
