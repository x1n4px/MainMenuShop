package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Productos, Long> {
    List<Productos> findByNombreContaining(String nombre);


    @Query("SELECT p FROM Productos p WHERE lower(p.nombre) LIKE %:nombre%")
    List<Productos> findByNombreContainingIgnoreCase(String nombre);

}
