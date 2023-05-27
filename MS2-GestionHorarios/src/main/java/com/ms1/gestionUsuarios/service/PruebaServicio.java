package com.ms1.gestionUsuarios.service;


import com.ms1.gestionUsuarios.entities.Prueba;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.PruebaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PruebaServicio {
	@Autowired
	private PruebaRepository pruRepo;

	
	
	
	public Optional<Prueba> obtenerPrueba(Long id) {
		return pruRepo.findById(id);
	}
	


	public void eliminarPrueba(Long id) {
		if (pruRepo.existsById(id)) {
			pruRepo.deleteById(id);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}
	
	public void actualizarPrueba(Prueba prueba) {
		if (pruRepo.existsById(prueba.getId())) {
			pruRepo.save(prueba);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}

	public void eliminarUsuario(Long idPrueba) {
		if(pruRepo.existsById(idPrueba)){
			pruRepo.deleteById(idPrueba);
		}else{
			throw new EntidadNoEncontradaException();
		}
	}
}
