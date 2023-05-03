package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.Categoria;
import com.proyectointegrador.digitalbooking.repository.CategoriaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;
    private static final Logger LOGGER=Logger.getLogger(CategoriaService.class);
    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }
    public Categoria guardarCategoria(Categoria categoria){
        LOGGER.info("Se inicio el guardado de la categoria: " + categoria.getTitulo());
        return categoriaRepository.save(categoria);
    }
    public void eliminarCategoria(Long id){
        LOGGER.warn("Se eliminó la categoria con id "+id);
        categoriaRepository.deleteById(id);
    }
    public void actualizarCategoria(Categoria categoria){
        LOGGER.info("Se inició la actualización de la categoria con id " + categoria.getId());
        categoriaRepository.save(categoria);
    }
    public List<Categoria> listarCategorias(){
        LOGGER.info("Se inició el listado de categorias");
        return categoriaRepository.findAll();
    }
    public Optional<Categoria> buscarCategoriaXId(Long id){
        LOGGER.info("Se inició la búsqueda de la categoria con id "+id);
        return categoriaRepository.findById(id);
    }
}
