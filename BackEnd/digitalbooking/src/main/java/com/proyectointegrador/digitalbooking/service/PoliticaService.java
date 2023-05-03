package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Politica;
import com.proyectointegrador.digitalbooking.repository.PoliticaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PoliticaService {
    private PoliticaRepository politicaRepository;
    private static final Logger LOGGER=Logger.getLogger(PoliticaService.class);
    @Autowired
    public PoliticaService(PoliticaRepository politicaRepository){
        this.politicaRepository = politicaRepository;
    }
    public Politica guardarPolitica(Politica politica){
        LOGGER.info("Se inicio el guardado de la politica: " + politica.getId());
        return politicaRepository.save(politica);
    }
    public void eliminarPolitica(Long id){
        LOGGER.warn("Se eliminó la politica con id "+id);
        politicaRepository.deleteById(id);
    }
    public void actualizarPolitica(Politica politica){
        LOGGER.info("Se inició la actualización de la politica con id " + politica.getId());
        politicaRepository.save(politica);
    }
    public List<Politica> listarPoliticas(){
        LOGGER.info("Se inició el listado de las politicas");
        return politicaRepository.findAll();
    }
    public Optional<Politica> buscarPoliticaXId(Long id){
        LOGGER.info("Se inició la búsqueda de la politica con id "+id);
        return politicaRepository.findById(id);
    }
}
