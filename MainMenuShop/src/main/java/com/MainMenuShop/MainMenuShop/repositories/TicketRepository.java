package com.MainMenuShop.MainMenuShop.repositories;

import com.MainMenuShop.MainMenuShop.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByReferencia(String referencia);

    List<Ticket> findByReferenciaContainingIgnoreCase(String referencia);
}
