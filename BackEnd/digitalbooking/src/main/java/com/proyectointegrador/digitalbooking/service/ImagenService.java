package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Imagen;
import com.proyectointegrador.digitalbooking.repository.ImagenRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ImagenService {
    private ImagenRepository imagenRepository;
    private static final Logger LOGGER=Logger.getLogger(ImagenService.class);
    @Autowired
    public ImagenService(ImagenRepository imagenRepository){
        this.imagenRepository = imagenRepository;
    }
    public Imagen guardarImagen(Imagen imagen){
        LOGGER.info("Se inicio el guardado de una imagen: " + imagen.getTitulo());
        return imagenRepository.save(imagen);
    }
    public void eliminarImagen(Long id){
        LOGGER.warn("Se eliminó la imagen con id "+id);
        imagenRepository.deleteById(id);
    }
    public void actualizarImagen(Imagen imagen){
        LOGGER.info("Se inició la actualización de la imagen con id " + imagen.getId());
        imagenRepository.save(imagen);
    }
    public List<Imagen> listarImagenes(){
        LOGGER.info("Se inició el listado de imágenes");
        return imagenRepository.findAll();
    }
    public Optional<Imagen> buscarImagenXId(Long id){
        LOGGER.info("Se inició la búsqueda de la imagen con id "+id);
        return imagenRepository.findById(id);
    }

    public Optional<Imagen> buscarImagenxUrl(String urlImagen){
        LOGGER.info("Se inicio la busqueda de una imagen por su URL: " + urlImagen);
        return imagenRepository.findByURL(urlImagen);
    }
}
