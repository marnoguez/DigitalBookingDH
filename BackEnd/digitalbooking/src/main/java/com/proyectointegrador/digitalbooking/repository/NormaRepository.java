package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Norma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NormaRepository extends JpaRepository<Norma,Long> {
}
