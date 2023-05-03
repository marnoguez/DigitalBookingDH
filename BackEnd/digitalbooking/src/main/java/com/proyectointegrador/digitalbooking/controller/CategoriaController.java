package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Categoria;
import com.proyectointegrador.digitalbooking.service.CategoriaService;
import com.proyectointegrador.digitalbooking.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categorias")
public class CategoriaController {
    private CategoriaService categoriaService;
    private ImagenService imagenService;
    @Autowired
    public CategoriaController(CategoriaService categoriaService,ImagenService imagenService) {
        this.categoriaService = categoriaService;
        this.imagenService = imagenService;
    }

    @PostMapping
    public ResponseEntity<Categoria> registrarCategoria(@RequestBody Categoria categoria){
        return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
    }


    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Categoria> categoriaBuscada=categoriaService.buscarCategoriaXId(id);
        if (categoriaBuscada.isPresent()){
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.status(HttpStatus.OK).body("La categoria con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La categoria con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarCategoria(@RequestBody Categoria categoria)throws ResourceNotFoundException{
        Optional<Categoria> categoriaBuscada=categoriaService.buscarCategoriaXId(categoria.getId());
        if (categoriaBuscada.isPresent()){
            categoriaService.actualizarCategoria(categoria);
            return ResponseEntity.ok("La categoria con id " + categoria.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La categoria con id= " +categoria.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias(){
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Categoria> buscarCategoriaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoriaBuscada = categoriaService.buscarCategoriaXId(id);
        if (categoriaBuscada.isPresent()) {
            return ResponseEntity.ok(categoriaBuscada.get());
        } else {
            throw new ResourceNotFoundException("La categoria con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
