package com.MainMenuShop.MainMenuShop.controller;

import com.MainMenuShop.MainMenuShop.entities.Clientes;
import com.MainMenuShop.MainMenuShop.repositories.ClienteRepository;
import com.MainMenuShop.MainMenuShop.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ClienteController {
    @Autowired
    private ClienteRepository clientesRepository;
    @Autowired
    private ClienteService clientesService;

    @GetMapping("cliente/{id}")
    public ResponseEntity<Optional<Clientes>> obtenerClientePorId(@PathVariable Long id){
        Optional<Clientes> clientes = clientesService.obtenerClientePorId(id);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/cliente/todos")
    public List<Clientes> obtenerClientes() {

        return clientesService.obtenerClientes();

    }

    @GetMapping("buscarCliente")
    public List<Clientes> buscarClientePorNombre(@RequestParam("nombre") String nombre) {
        return clientesService.buscarCliente(nombre);
    }

    @PostMapping("/cliente/")
    public Clientes guardarCliente(@RequestBody Clientes clientes) throws Exception{
        return clientesRepository.save(clientes);
    }

    @PutMapping("/cliente/{id}")
    public ResponseEntity<?> modificarCliente(@PathVariable Long id, @RequestBody Clientes cliente){
        Optional<Clientes> optionalCliente = clientesRepository.findById(id);
        if(!optionalCliente.isPresent()){
            return ResponseEntity.notFound().build();
        }
        cliente.setId(id);
        clientesService.modificarCliente(optionalCliente.get(), cliente);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/cliente/puntos/{id}")
    public ResponseEntity<?> modificarPuntosCliente(@PathVariable Long id, @RequestBody double puntos) {
        Optional<Clientes> optionalCliente = clientesRepository.findById(id);
        if(!optionalCliente.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Clientes cliente = optionalCliente.get();
        cliente.setPuntos(puntos);
        clientesRepository.save(cliente);
        return ResponseEntity.ok().build();
    }
}
