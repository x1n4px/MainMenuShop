package com.sistema.examenes.controladores;

import com.sistema.examenes.modelo.*;
import com.sistema.examenes.repositorios.ClientesRepository;
import com.sistema.examenes.repositorios.ProductoRepository;
import com.sistema.examenes.repositorios.TicketProductoRepository;
import com.sistema.examenes.repositorios.TicketRepository;
import com.sistema.examenes.servicios.ClientesService;
import com.sistema.examenes.servicios.ProductoService;
import com.sistema.examenes.servicios.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

   @Autowired
   private ProductoRepository productoRepository;


    @GetMapping("/producto/buscar/{busqueda}")
    public ResponseEntity<List<Productos>> buscarProductoPorNombreOReferencia(@PathVariable("busqueda") String busqueda) {
        try {
            List<Productos> productos = productoRepository.findByNombreContaining(busqueda);
            if (productos.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            HttpHeaders headers = new HttpHeaders();
            ResponseEntity.ok().headers(headers).body(productos);
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");

            return ResponseEntity.ok().headers(headers).body(productos);


        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketProductoRepository ticketProductoRepository;



    @PostMapping("/ticket")
    public ResponseEntity<Ticket> guardarTicket(@RequestBody Ticket ticket) {
        try {
            // Guardar el ticket
            Ticket ticketGuardado = ticketRepository.save(ticket);

            // Asignar el ticket y producto a cada ticketProducto y guardarlos
            for (TicketProducto tp : ticket.getProductos()) {
                tp.setTicket(ticketGuardado);
                ticketProductoRepository.save(tp);
            }

            return ResponseEntity.ok(ticketGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }











    @Autowired
    private TicketService ticketService;


    @GetMapping("/ticket/todos")
    public List<Ticket > obtenerTicket() {
            return ticketService.getAllTickets();
    }


    @GetMapping("/ticket/{id}")
    public ResponseEntity<Ticket> obtenerTicketPorId(@PathVariable(value = "id") Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            return ResponseEntity.ok(ticket.get());
        } else {
            return ResponseEntity.notFound().build();
        }
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
        clientesService.modificarCliente(cliente);
        return ResponseEntity.ok().build();
    }

}
