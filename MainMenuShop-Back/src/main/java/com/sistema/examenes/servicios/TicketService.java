package com.sistema.examenes.servicios;

import com.sistema.examenes.modelo.Ticket;
import com.sistema.examenes.repositorios.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

     public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isPresent()) {
            return optionalTicket.get();
        } else {
             return null;
        }
    }
}
