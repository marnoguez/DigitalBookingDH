package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Cancelacion;
import com.proyectointegrador.digitalbooking.repository.CancelacionRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CancelacionService {
    private CancelacionRepository cancelacionRepository;
    private static final Logger LOGGER=Logger.getLogger(CancelacionService.class);
    @Autowired
    public CancelacionService(CancelacionRepository cancelacionRepository){
        this.cancelacionRepository = cancelacionRepository;
    }
    public Cancelacion guardarCancelacion(Cancelacion cancelacion){
        LOGGER.info("Se inicio el guardado de la politica de cancelacion: " + cancelacion.getId());
        return cancelacionRepository.save(cancelacion);
    }
    public void eliminarCancelacion(Long id){
        LOGGER.warn("Se eliminó la politica de cancelacion con id "+id);
        cancelacionRepository.deleteById(id);
    }
    public void actualizarCancelacion(Cancelacion cancelacion){
        LOGGER.info("Se inició la actualización de la politica de cancelacion con id " + cancelacion.getId());
        cancelacionRepository.save(cancelacion);
    }
    public List<Cancelacion> listarCancelaciones(){
        LOGGER.info("Se inició el listado de las politicas de cancelaciones");
        return cancelacionRepository.findAll();
    }
    public Optional<Cancelacion> buscarCancelacionXId(Long id){
        LOGGER.info("Se inició la búsqueda de la politica de cancelacion con id "+id);
        return cancelacionRepository.findById(id);
    }
}
