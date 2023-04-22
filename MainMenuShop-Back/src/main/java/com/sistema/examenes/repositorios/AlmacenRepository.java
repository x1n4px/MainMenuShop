package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlmacenRepository extends JpaRepository<Almacen, Long> {
}
