package com.sistema.examenes.servicios;

import com.sistema.examenes.modelo.Productos;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.repositorios.ProductoRepository;
import com.sistema.examenes.repositorios.UsuarioRepository;
import com.sistema.examenes.servicios.exceptions.EntidadNoEncontradaException;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Productos> obtenerProductos(){
        return productoRepository.findAll();
    }

    public Optional<Productos> obtenerProductoPorId(Long id){
        return productoRepository.findById(id);
    }


    public List<Productos> obtener(String nombre){return productoRepository.findByNombreContaining(nombre);}
}
