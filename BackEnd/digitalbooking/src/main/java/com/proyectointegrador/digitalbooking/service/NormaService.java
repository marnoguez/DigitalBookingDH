package com.proyectointegrador.digitalbooking.service;


import com.proyectointegrador.digitalbooking.model.Norma;
import com.proyectointegrador.digitalbooking.repository.NormaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NormaService {
    private NormaRepository normaRepository;
    private static final Logger LOGGER=Logger.getLogger(NormaService.class);
    @Autowired
    public NormaService(NormaRepository normaRepository){
        this.normaRepository = normaRepository;
    }
    public Norma guardarNorma(Norma norma){
        LOGGER.info("Se inicio el guardado de la norma: " + norma.getId());
        return normaRepository.save(norma);
    }
    public void eliminarNorma(Long id){
        LOGGER.warn("Se eliminó la norma con id "+id);
        normaRepository.deleteById(id);
    }
    public void actualizarNorma(Norma norma){
        LOGGER.info("Se inició la actualización de la norma con id " + norma.getId());
        normaRepository.save(norma);
    }
    public List<Norma> listarNormas(){
        LOGGER.info("Se inició el listado de las normas");
        return normaRepository.findAll();
    }
    public Optional<Norma> buscarNormaXId(Long id){
        LOGGER.info("Se inició la búsqueda de la norma con id "+id);
        return normaRepository.findById(id);
    }
}
