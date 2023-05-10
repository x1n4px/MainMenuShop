package com.sistema.examenes.repositorios;

import com.sistema.examenes.modelo.Clientes;
import com.sistema.examenes.modelo.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT p FROM Ticket p WHERE (p.referencia) LIKE %:referencia%")
    List<Ticket> findByReferencia(String referencia);
}

