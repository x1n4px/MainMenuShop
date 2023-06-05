package com.MainMenuShop.MainMenuShop.repositories;

import com.MainMenuShop.MainMenuShop.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByReferencia(String referencia);

    List<Ticket> findByReferenciaContainingIgnoreCase(String referencia);

    List<Ticket> findByClienteId(Long id);


    @Query("SELECT SUM(t.importeTotal) FROM Ticket t WHERE t.fecha = :fecha")
    Double sumarImporteTotalPorFecha(LocalDate fecha);
}
