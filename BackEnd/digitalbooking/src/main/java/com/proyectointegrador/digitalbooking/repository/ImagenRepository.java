package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {
    @Query(value = "select * from imagenes where url_imagen = ?",nativeQuery = true)
    Optional<Imagen> findByURL(String urlImagen);
}
