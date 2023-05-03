package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Ciudad;
import com.proyectointegrador.digitalbooking.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ciudades")
public class CiudadController {
    private CiudadService ciudadService;
    @Autowired
    public CiudadController(CiudadService ciudadService) {
        this.ciudadService = ciudadService;
    }

    @PostMapping
    public ResponseEntity<Ciudad> registrarCiudad(@RequestBody Ciudad ciudad){
        return ResponseEntity.ok(ciudadService.guardarCiudad(ciudad));
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarCiudad(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Ciudad> ciudadBuscada=ciudadService.buscarCiudadXId(id);
        if (ciudadBuscada.isPresent()){
            ciudadService.eliminarCiudad(id);
            return ResponseEntity.status(HttpStatus.OK).body("La ciudad con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La ciudad con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarCiudad(@RequestBody Ciudad ciudad)throws ResourceNotFoundException{
        Optional<Ciudad> ciudadBuscada=ciudadService.buscarCiudadXId(ciudad.getId());
        if (ciudadBuscada.isPresent()){
            ciudadService.actualizarCiudad(ciudad);
            return ResponseEntity.ok("La ciudad con id " + ciudad.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La ciudad con id= " +ciudad.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Ciudad>> listarCiudades(){
        return ResponseEntity.ok(ciudadService.listarCiudades());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Ciudad> buscarCiudadPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Ciudad> ciudadBuscada = ciudadService.buscarCiudadXId(id);
        if (ciudadBuscada.isPresent()) {
            return ResponseEntity.ok(ciudadBuscada.get());
        } else {
            throw new ResourceNotFoundException("La ciudad con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
