package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica,Long> {
}
