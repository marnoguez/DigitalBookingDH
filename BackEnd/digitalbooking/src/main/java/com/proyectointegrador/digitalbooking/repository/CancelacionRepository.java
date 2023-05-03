package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Cancelacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CancelacionRepository extends JpaRepository<Cancelacion,Long> {
}
