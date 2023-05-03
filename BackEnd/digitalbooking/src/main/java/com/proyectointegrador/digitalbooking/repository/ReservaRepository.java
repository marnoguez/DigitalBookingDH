package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva,Long> {
    @Query(value = "select * from reservas where producto_id = ?1 and" +
            "                         ((fecha_inicio >= ?2 and fecha_inicio < ?3 )" +
            "                         or" +
            "                         (fecha_fin > ?2 and fecha_fin <=  ?3)" +
            "                         or" +
            "                         ((fecha_inicio < ?2) and (fecha_fin > ?2))" +
            "                         or" +
            "                         ((fecha_fin > ?3) and (fecha_inicio < ?3)))", nativeQuery = true)
    List<Reserva> buscarPorFecha(Long id, LocalDate fInicio, LocalDate fFin);


    List<Reserva> findByProductoId(Long product_id);

    List<Reserva> findByUserId(Long user_id);
}
