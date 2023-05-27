package com.MainMenuShop.MainMenuShop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MainMenuShop.MainMenuShop.entities.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	Optional<Usuario> findByUsername(String username);

    boolean existsByNombre(String nombre);

    Optional<Usuario> findByNombre(String nombre);
}