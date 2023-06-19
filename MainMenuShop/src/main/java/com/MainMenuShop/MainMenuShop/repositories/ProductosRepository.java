package com.MainMenuShop.MainMenuShop.repositories;

import com.MainMenuShop.MainMenuShop.dto.ProductosOnlineDTO;
import com.MainMenuShop.MainMenuShop.entities.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductosRepository extends JpaRepository<Productos, Long> {
    List<Productos> findByNombreContainingIgnoreCase(String nombre);

    @Query(value = "SELECT * FROM productos WHERE upper(FAMILIA) = upper(:familia)", nativeQuery = true)
    List<Productos> findByFamilia(@Param("familia") String familia);


 }
