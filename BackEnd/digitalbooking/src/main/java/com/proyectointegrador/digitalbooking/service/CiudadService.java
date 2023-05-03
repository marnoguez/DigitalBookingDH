package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Ciudad;
import com.proyectointegrador.digitalbooking.repository.CiudadRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CiudadService {
    private CiudadRepository ciudadRepository;
    private static final Logger LOGGER=Logger.getLogger(CiudadService.class);
    @Autowired
    public CiudadService(CiudadRepository ciudadRepository){
        this.ciudadRepository = ciudadRepository;
    }
    public Ciudad guardarCiudad(Ciudad ciudad){
        LOGGER.info("Se inicio el guardado de la ciudad: " + ciudad.getNombre());
        return ciudadRepository.save(ciudad);
    }
    public void eliminarCiudad(Long id){
        LOGGER.warn("Se eliminó la ciudad con id "+id);
        ciudadRepository.deleteById(id);
    }
    public void actualizarCiudad(Ciudad ciudad){
        LOGGER.info("Se inició la actualización de la ciudad con id " + ciudad.getId());
        ciudadRepository.save(ciudad);
    }
    public List<Ciudad> listarCiudades(){
        LOGGER.info("Se inició el listado de ciudades");
        return ciudadRepository.findAll();
    }
    public Optional<Ciudad> buscarCiudadXId(Long id){
        LOGGER.info("Se inició la búsqueda de la ciudad con id "+id);
        return ciudadRepository.findById(id);
    }
}
