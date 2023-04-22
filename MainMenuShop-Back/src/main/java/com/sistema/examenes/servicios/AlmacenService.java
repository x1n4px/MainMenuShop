package com.sistema.examenes.servicios;

import com.sistema.examenes.modelo.Almacen;
import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.repositorios.AlmacenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlmacenService {

    @Autowired
    private AlmacenRepository almacenRepository;
    public List<Almacen> obtenerAlmacen(){
        return almacenRepository.findAll();
    }

}
