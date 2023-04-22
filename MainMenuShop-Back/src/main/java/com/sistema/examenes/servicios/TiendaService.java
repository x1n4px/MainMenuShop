package com.sistema.examenes.servicios;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Tienda;
import com.sistema.examenes.repositorios.ClientesRepository;
import com.sistema.examenes.repositorios.TiendaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TiendaService {

    @Autowired
    private TiendaRepositorio tiendaRepositorio;

    public List<Tienda> obtenerTiendas(){
        return tiendaRepositorio.findAll();
    }

}
