package com.sistema.examenes.controladores;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Productos;
import com.sistema.examenes.modelo.Usuario;
import com.sistema.examenes.repositorios.ClientesRepository;
import com.sistema.examenes.repositorios.ProductoRepository;
import com.sistema.examenes.servicios.ClientesService;
import com.sistema.examenes.servicios.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ProductoController {
    @Autowired
    private ProductoRepository productoController;
    @Autowired
    private ProductoService productoService;

    @Autowired
    private ClientesRepository clientesRepository;
    @Autowired
    private ClientesService clientesService;
    @GetMapping("producto/{id}")
    public ResponseEntity<Optional<Productos>> obtenerProductoPorId(@PathVariable Long id){
        Optional<Productos> productos = productoService.obtenerProductoPorId(id);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/producto/todos")
    public List<Productos> obtenerProductos() {

        return productoService.obtenerProductos();

    }
    @GetMapping("cliente/{id}")
    public ResponseEntity<Optional<Clientes>> obtenerClientePorId(@PathVariable Long id){
        Optional<Clientes> clientes = clientesService.obtenerClientePorId(id);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/cliente/todos")
    public List<Clientes> obtenerClientes() {

        return clientesService.obtenerClientes();

    }
}
