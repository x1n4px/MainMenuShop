package com.MainMenuShop.MainMenuShop.repositories;

import com.MainMenuShop.MainMenuShop.entities.Productos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductosRepository extends JpaRepository<Productos, Long> {
    List<Productos> findByNombreContainingIgnoreCase(String nombre);
}
