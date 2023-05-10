package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientesRepository extends JpaRepository<Clientes, Long> {
    @Query("SELECT p FROM Clientes p WHERE lower(p.nombre) LIKE %:nombre%")
    List<Clientes> findByNombreContainingIgnoreCase(String nombre);
}
