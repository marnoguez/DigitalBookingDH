package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Salud;
import com.proyectointegrador.digitalbooking.repository.SaludRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SaludService {
    private SaludRepository saludRepository;
    private static final Logger LOGGER=Logger.getLogger(SaludService.class);
    @Autowired
    public SaludService(SaludRepository saludRepository){
        this.saludRepository = saludRepository;
    }
    public Salud guardarSalud(Salud salud){
        LOGGER.info("Se inicio el guardado de la politica de salud: " + salud.getId());
        return saludRepository.save(salud);
    }
    public void eliminarSalud(Long id){
        LOGGER.warn("Se eliminó la politica de salud con id "+id);
        saludRepository.deleteById(id);
    }
    public void actualizarSalud(Salud salud){
        LOGGER.info("Se inició la actualización de la politica de salud con id " + salud.getId());
        saludRepository.save(salud);
    }
    public List<Salud> listarSalud(){
        LOGGER.info("Se inició el listado de las politicas de salud");
        return saludRepository.findAll();
    }
    public Optional<Salud> buscarSaludXId(Long id){
        LOGGER.info("Se inició la búsqueda de la politica de salud con id "+id);
        return saludRepository.findById(id);
    }
}
