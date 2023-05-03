package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Politica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliticaRepository extends JpaRepository<Politica,Long> {
}
