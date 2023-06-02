package com.MainMenuShop.MainMenuShop.service;

import com.MainMenuShop.MainMenuShop.entities.Clientes;
import com.MainMenuShop.MainMenuShop.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clientesRepository;



    public List<Clientes> obtenerClientes(){
        return clientesRepository.findAll();
    }

    public Optional<Clientes> obtenerClientePorId(Long id){
        return clientesRepository.findById(id);
    }

    public void modificarCliente(Clientes clientes){
        if(clientesRepository.existsById(clientes.getId())){
            clientesRepository.save(clientes);
        }else{
            throw new RuntimeException();
        }
    }

    public List<Clientes> buscarCliente(String nombre){
        return clientesRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
