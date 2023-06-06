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

    public void modificarCliente(Clientes clienteOriginal, Clientes clientes){
        if(clientesRepository.existsById(clientes.getId())){
            if(clientes.getNombre() != null){
                clienteOriginal.setNombre(clientes.getNombre());
            }
            if(clientes.getApellido1() != null){
                clienteOriginal.setApellido1(clientes.getApellido1());
            }
            if(clientes.getApellido2() != null){
                clienteOriginal.setApellido2(clientes.getApellido2());
            }
            if(clientes.getLocalidad() != null){
                clienteOriginal.setLocalidad(clientes.getLocalidad());
            }
            if(clientes.getCodigoPostal() != null){
                clienteOriginal.setCodigoPostal(clientes.getCodigoPostal());
            }
            if(clientes.getNumeroMovil() != null){
                clienteOriginal.setNumeroMovil(clientes.getNumeroMovil());
            }
            if(clientes.getNumeroTelefono() != null){
                clienteOriginal.setNumeroTelefono(clientes.getNumeroTelefono());
            }
            if(clientes.getEmail() != null){
                clienteOriginal.setEmail(clientes.getEmail());
            }
            if(clientes.getDireccion() != null){
                clienteOriginal.setDireccion(clientes.getDireccion());
            }

            clienteOriginal.setPuntos(clientes.getPuntos());

            clientesRepository.save(clientes);
        }else{
            throw new RuntimeException();
        }
    }

    public List<Clientes> buscarCliente(String nombre){
        return clientesRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
