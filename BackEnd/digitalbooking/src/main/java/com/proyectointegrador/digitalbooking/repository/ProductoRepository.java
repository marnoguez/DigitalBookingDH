package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {
    @Query(value = "SELECT * FROM productos ORDER BY rand() LIMIT 8", nativeQuery = true)
    List<Producto> productosRandom();
    List<Producto> findAllByCategoriaId(Long id);
    List<Producto> findAllByCiudadId(Long id);
    List<Producto> findAllByCiudadIdAndCategoriaId(Long ciudadId, Long categoriaId);
    @Query(value= "select * from productos p " +
            "            inner join ciudades c on c.id = p.ciudad_id where c.id = ?1 and p.id" +
            "                        not in(" +
            "                        select producto_id from reservas where" +
            "                        ((fecha_inicio >= ?2 and fecha_inicio < ?3 )" +
            "                        or" +
            "                        (fecha_fin > ?2 and fecha_fin <= ?3)" +
            "                        or" +
            "                        ((fecha_inicio <= ?2) and (fecha_fin > ?2))" +
            "                        or" +
            "                        ((fecha_fin >= ?3) and (fecha_inicio < ?3))))"
            ,nativeQuery = true,countQuery = "SELECT count(*) FROM productos")
    List<Producto> productosPorCiudadYFecha(Long ciudad, LocalDate fInicio, LocalDate fFin);

    @Query(value= "select * from productos p inner join categorias c on c.id = p.categoria_id where c.id = ?1 and p.id" +
            "            not in(" +
            "              select producto_id from reservas where(" +
            "              (fecha_inicio >= ?2 and fecha_inicio < ?3 )" +
            "              or" +
            "              (fecha_fin > ?2 and fecha_fin <=  ?3)" +
            "              or" +
            "              ((fecha_inicio < ?2) and (fecha_fin > ?2))" +
            "              or" +
            "              ((fecha_fin > ?3) and (fecha_inicio < ?3))))",nativeQuery = true,countQuery = "SELECT count(*) FROM productos")
    List<Producto> productosPorCategoriaYFecha(Long categoria,LocalDate fInicio, LocalDate fFin);

    @Query(value= "select * from productos p inner join categorias cat on cat.id = p.categoria_id " +
            "inner join ciudades c on c.id = u.ciudad_id where c.id = ?1 and cat.id = ?4 and p.id" +
            "            not in(" +
            "               select producto_id from reservas where(" +
            "               (fecha_inicio >= ?2 and fecha_inicio < ?3 )" +
            "               or" +
            "               (fecha_fin > ?2 and fecha_fin <=  ?3)" +
            "               or" +
            "               ((fecha_inicio < ?2) and (fecha_fin > ?2))" +
            "               or" +
            "               ((fecha_fin > ?3) and (fecha_inicio < ?3))))",nativeQuery = true,countQuery = "SELECT count(*) FROM productos")
    List<Producto> productosPorCiudadFechaYCategoria(Long ciudad,LocalDate fInicio, LocalDate fFin,Long categoria);

    @Query(value= "select * from productos p where p.id" +
            "              not in(" +
            "              select producto_id from reservas" +
            "              where(" +
            "              (?1 < fecha_inicio  and fecha_inicio <  ?2 )" +
            "              or" +
            "              (?1 < fecha_fin  and fecha_fin <  ?2)" +
            "              or" +
            "              ((fecha_inicio < ?1)" +
            "              and" +
            "              (fecha_fin > ?1))" +
            "              or" +
            "              ((fecha_fin > ?2)" +
            "              and" +
            "              (fecha_inicio < ?2))))",nativeQuery = true,countQuery = "SELECT count(*) FROM productos")
    List<Producto> ProductoPorFecha(LocalDate fInicio, LocalDate fFin);
}
