package com.ms1.gestionUsuarios.service;


import com.ms1.gestionUsuarios.entities.Materia;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
public class AsignaturaServicio {
	@Autowired
	private AsignaturaRepository asigRepo;
	

	public Materia obtenerAsignatura(Long id) {
		Optional<Materia> asignatura = asigRepo.findById(id);
		if (asignatura.isPresent()) {
			return asignatura.get();
		} else {
			throw new EntidadNoEncontradaException();
		}	
	}
	

	
	public void eliminarAsignatura(Long id) {
		if (asigRepo.existsById(id)) {
			asigRepo.deleteById(id);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}
	
	public void actualizarAsignatura(Materia materia) {
		if (asigRepo.existsById(materia.getId())) {
			asigRepo.save(materia);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}
}
