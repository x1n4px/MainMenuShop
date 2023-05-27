package com.ms1.gestionUsuarios.repositories;

 import com.ms1.gestionUsuarios.entities.Prueba;
 import org.springframework.data.jpa.repository.JpaRepository;

public interface PruebaRepository extends JpaRepository<Prueba, Long>{
 	boolean existsById(Long id);

}
