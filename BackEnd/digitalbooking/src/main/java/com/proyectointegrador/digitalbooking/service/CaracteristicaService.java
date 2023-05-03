package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Caracteristica;
import com.proyectointegrador.digitalbooking.repository.CaracteristicaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {
    private CaracteristicaRepository caracteristicaRepository;
    private static final Logger LOGGER=Logger.getLogger(CaracteristicaService.class);
    @Autowired
    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository){
        this.caracteristicaRepository = caracteristicaRepository;
    }
    public Caracteristica guardarCaracteristica(Caracteristica caracteristica){
        LOGGER.info("Se inicio el guardado de la caracteristica: " + caracteristica.getDescripcion());
        return caracteristicaRepository.save(caracteristica);
    }
    public void eliminarCaracteristica(Long id){
        LOGGER.warn("Se eliminó la caracteristica con id "+id);
        caracteristicaRepository.deleteById(id);
    }
    public void actualizarCaracteristica(Caracteristica caracteristica){
        LOGGER.info("Se inició la actualización de la caracteristica con id " + caracteristica.getId());
        caracteristicaRepository.save(caracteristica);
    }
    public List<Caracteristica> listarCaracteristicas(){
        LOGGER.info("Se inició el listado de caracteristicas");
        return caracteristicaRepository.findAll();
    }
    public Optional<Caracteristica> buscarCaracteristicaXId(Long id){
        LOGGER.info("Se inició la búsqueda de la caracteristica con id "+id);
        return caracteristicaRepository.findById(id);
    }
}
