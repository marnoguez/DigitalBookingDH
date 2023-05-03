package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Imagen;
import com.proyectointegrador.digitalbooking.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/imagenes")
public class ImagenController {
    private ImagenService imagenService;
    @Autowired
    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @PostMapping
    public ResponseEntity<Imagen> registrarImagen(@RequestBody Imagen imagen){
        return ResponseEntity.ok(imagenService.guardarImagen(imagen));
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarImagen(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Imagen> imagenBuscada=imagenService.buscarImagenXId(id);
        if (imagenBuscada.isPresent()){
            imagenService.eliminarImagen(id);
            return ResponseEntity.status(HttpStatus.OK).body("La imagen con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La imagen con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarImagen(@RequestBody Imagen imagen)throws ResourceNotFoundException{
        Optional<Imagen> imagenBuscada=imagenService.buscarImagenXId(imagen.getId());
        if (imagenBuscada.isPresent()){
            imagenService.actualizarImagen(imagen);
            return ResponseEntity.ok("La imagen con id " + imagen.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La imagen con id= " +imagen.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Imagen>> listarImagenes(){
        return ResponseEntity.ok(imagenService.listarImagenes());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Imagen> buscarImagenPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Imagen> imagenBuscada = imagenService.buscarImagenXId(id);
        if (imagenBuscada.isPresent()) {
            return ResponseEntity.ok(imagenBuscada.get());
        } else {
            throw new ResourceNotFoundException("La imagen con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping("/url/{url}")
    public ResponseEntity<Imagen> buscarImagenXUrl(@PathVariable String url) throws ResourceNotFoundException{
        Optional<Imagen> imagenBuscada = imagenService.buscarImagenxUrl(url);
        if (imagenBuscada.isPresent()) {
            return ResponseEntity.ok(imagenBuscada.get());
        } else {
            throw new ResourceNotFoundException("La imagen no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
