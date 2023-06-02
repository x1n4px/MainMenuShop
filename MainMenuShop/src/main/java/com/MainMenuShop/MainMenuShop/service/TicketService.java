package com.MainMenuShop.MainMenuShop.service;

import com.MainMenuShop.MainMenuShop.entities.Ticket;
import com.MainMenuShop.MainMenuShop.repositories.TicketRepository;
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

    public List<Ticket> buscarTicket(String referencia){
        return ticketRepository.findByReferenciaContainingIgnoreCase(referencia);
    }
}
