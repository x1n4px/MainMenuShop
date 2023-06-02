package com.MainMenuShop.MainMenuShop.repositories;

import com.MainMenuShop.MainMenuShop.entities.Clientes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Clientes, Long> {

    List<Clientes> findByNombreContainingIgnoreCase(String nombre);
}
