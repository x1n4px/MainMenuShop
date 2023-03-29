package com.sistema.examenes.controladores;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Productos;
import com.sistema.examenes.repositorios.ClientesRepository;
import com.sistema.examenes.repositorios.ProductoRepository;
import com.sistema.examenes.servicios.ClientesService;
import com.sistema.examenes.servicios.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/producto/buscar/{busqueda}")
    public ResponseEntity<List<Productos>> buscarProductoPorNombreOReferencia(@PathVariable("busqueda") String busqueda) {
        try {
            List<Productos> productos = productoService.buscarProducto(busqueda);
            if (productos.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            return ResponseEntity.ok().headers(headers).body(productos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }




}
