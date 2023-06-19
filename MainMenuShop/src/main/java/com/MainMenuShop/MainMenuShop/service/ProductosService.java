package com.MainMenuShop.MainMenuShop.service;

import com.MainMenuShop.MainMenuShop.dto.ProductosOnlineDTO;
import com.MainMenuShop.MainMenuShop.entities.Productos;
import com.MainMenuShop.MainMenuShop.repositories.ProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductosService {

    @Autowired
    private ProductosRepository productoRepository;

    public List<Productos> buscar(String nombre){
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }



    public List<Productos> obtenerProductos(String familia){
        //return productoRepository.findAll();
        return productoRepository.findByFamilia(familia);
    }

    public Optional<Productos> obtenerProductoPorId(Long id){
        return productoRepository.findById(id);
    }


}
