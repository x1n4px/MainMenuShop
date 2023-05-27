package com.ms1.gestionUsuarios.repositories;

 import com.ms1.gestionUsuarios.entities.Materia;
 import org.springframework.data.jpa.repository.JpaRepository;

 import java.util.Optional;

public interface AsignaturaRepository extends JpaRepository<Materia, Long>{
 Optional<Materia> findByNombre(String nombre);
}
