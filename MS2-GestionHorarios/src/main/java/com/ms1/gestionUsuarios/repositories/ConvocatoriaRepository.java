package com.ms1.gestionUsuarios.repositories;

 import com.ms1.gestionUsuarios.entities.Convocatoria;
 import org.springframework.data.jpa.repository.JpaRepository;

public interface ConvocatoriaRepository extends JpaRepository<Convocatoria, Long>{
	boolean existsById(Long id);


    Convocatoria findTopByOrderByIdDesc();
}