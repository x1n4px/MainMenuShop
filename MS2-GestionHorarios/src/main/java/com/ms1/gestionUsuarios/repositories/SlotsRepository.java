package com.ms1.gestionUsuarios.repositories;

import com.ms1.gestionUsuarios.entities.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.Optional;

public interface SlotsRepository extends JpaRepository<Horario, Long>{
 		boolean existsById(Long id);


}
