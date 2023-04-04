package com.sistema.examenes.servicios;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Productos;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.repositorios.ClientesRepository;
import com.sistema.examenes.repositorios.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ClientesService {

    @Autowired
    private ClientesRepository clientesRepository;

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
}
