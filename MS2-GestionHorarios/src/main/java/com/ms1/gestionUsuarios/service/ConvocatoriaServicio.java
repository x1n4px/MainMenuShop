package com.ms1.gestionUsuarios.service;

  import com.ms1.gestionUsuarios.entities.Convocatoria;
  import com.ms1.gestionUsuarios.repositories.ConvocatoriaRepository;
  import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ConvocatoriaServicio {
	@Autowired
	private ConvocatoriaRepository convocatoriaRepository;
	

	public Convocatoria obtenerConvocatoriaActual() {
		return convocatoriaRepository.findTopByOrderByIdDesc();

	}


}
