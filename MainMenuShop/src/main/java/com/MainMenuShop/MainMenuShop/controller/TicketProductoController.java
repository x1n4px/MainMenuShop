package com.MainMenuShop.MainMenuShop.controller;

import com.MainMenuShop.MainMenuShop.dto.ProductosOnlineDTO;
import com.MainMenuShop.MainMenuShop.entities.Productos;
import com.MainMenuShop.MainMenuShop.entities.Ticket;
import com.MainMenuShop.MainMenuShop.entities.TicketProducto;
import com.MainMenuShop.MainMenuShop.repositories.ProductosRepository;
import com.MainMenuShop.MainMenuShop.repositories.TicketProductoRepository;
import com.MainMenuShop.MainMenuShop.repositories.TicketRepository;
import com.MainMenuShop.MainMenuShop.service.ProductosService;
import com.MainMenuShop.MainMenuShop.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class TicketProductoController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ProductosService productoService;
    @Autowired
    private ProductosRepository productoRepository;

    @Autowired
    private TicketProductoRepository ticketProductoRepository;

    @GetMapping("producto/{id}")
    public ResponseEntity<Optional<Productos>> obtenerProductoPorId(@PathVariable Long id){
        Optional<Productos> productos = productoService.obtenerProductoPorId(id);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/producto/todos")
    public List<?> obtenerProductos( @RequestParam("cantidad") Integer cantidad) {
        List<Productos> productos = productoService.obtenerProductos();
        if(cantidad == 0){
            return productos;
        }else if (cantidad == 1){
            List<ProductosOnlineDTO> productosDTOList = new ArrayList<>();
            for (Productos producto: productos) {
                ProductosOnlineDTO productoDTO = ProductosOnlineDTO.fromProducto(producto);
                productosDTOList.add(productoDTO);
            }
            return productosDTOList;
        }
        return null;
    }

    @GetMapping("buscar")
    public List<?> buscarPorNombre(@RequestParam("nombre") String nombre,
                                           @RequestParam("cantidad") Integer cantidad) {
        List<Productos> productos =  productoService.buscar(nombre);
        if(cantidad == 0){
            return productos;
        }else if (cantidad == 1){
            List<ProductosOnlineDTO> productosDTOList = new ArrayList<>();
            for (Productos producto: productos) {
                ProductosOnlineDTO productoDTO = ProductosOnlineDTO.fromProducto(producto);
                productosDTOList.add(productoDTO);
            }
            return productosDTOList;
        }
         return null;
    }



    @GetMapping("buscarTicket")
    public List<Ticket> buscarTicketPorNombre(@RequestParam("referencia") String referencia) {
        return ticketService.buscarTicket(referencia);
    }

    @GetMapping("importeTotalDia")
    public List<Ticket> obtenerImporteTotalDia(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ticketService.buscarTicketFecha(fecha);
    }



    @GetMapping("buscarTicketCliente/{id}")
    public List<Ticket> buscarTicketCliente(@PathVariable Long id) {
        return ticketService.buscarTicketCliente(id);
    }



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

    @GetMapping("/ticket/todos")
    public List<Ticket> obtenerTicket() {
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

    @PostMapping("/productos/")
    public void crearproducto(@RequestBody Productos productos){
        productoRepository.save(productos);
    }




}
