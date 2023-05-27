package com.ms1.gestionUsuarios.service;


import com.ms1.gestionUsuarios.entities.Horario;
import com.ms1.gestionUsuarios.exceptios.EntidadExistenteException;
import com.ms1.gestionUsuarios.exceptios.EntidadNoEncontradaException;
import com.ms1.gestionUsuarios.repositories.SlotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class SlotsServicio {
	@Autowired
	private SlotsRepository horaRepo;
	
	public SlotsServicio(SlotsRepository horaRepo) {
		this.horaRepo = horaRepo;
	}
	
	public List<Horario> obtenerHorarios(){
		return horaRepo.findAll();
	}
	
	public Horario obtenerHorario (Long id) {
		var horario = horaRepo.findById(id);
		if (horario.isPresent()) {
			return horario.get();
		} else {
			throw new EntidadNoEncontradaException();
		}	
	}
	
	public Long aniadirHorario (Horario hor) {
		if (!horaRepo.existsById(hor.getId())) {
			hor.setId(null);
			horaRepo.save(hor);
			return hor.getId();
		} else {
			throw new EntidadExistenteException();
		}
	}
	
	public void eliminarHorario(Long id) {
		if (horaRepo.existsById(id)) {
			horaRepo.deleteById(id);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}

	public void actualizarHorario(Horario slots) {
		if (horaRepo.existsById(slots.getId())) {
			horaRepo.save(slots);
		} else {
			throw new EntidadNoEncontradaException();
		}
	}

    public Optional<Horario> obtenerSlot(Long idSlot) {
		return horaRepo.findById(idSlot);
    }

	public void eliminarUsuario(Long idSlot) {
		if(horaRepo.existsById(idSlot)){
			horaRepo.deleteById(idSlot);
		}else{
			throw new EntidadNoEncontradaException();
		}
	}
}
