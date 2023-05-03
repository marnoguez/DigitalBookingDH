package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Caracteristica;
import com.proyectointegrador.digitalbooking.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/caracteristicas")
public class CaracteristicaController {
    private CaracteristicaService caracteristicaService;
    @Autowired
    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping
    public ResponseEntity<Caracteristica> registrarCaracteristica(@RequestBody Caracteristica caracteristica){
        return ResponseEntity.ok(caracteristicaService.guardarCaracteristica(caracteristica));
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarCaracteristica(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaBuscada=caracteristicaService.buscarCaracteristicaXId(id);
        if (caracteristicaBuscada.isPresent()){
            caracteristicaService.eliminarCaracteristica(id);
            return ResponseEntity.status(HttpStatus.OK).body("La caracteristica con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La caracteristica con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarCaracteristica(@RequestBody Caracteristica caracteristica)throws ResourceNotFoundException{
        Optional<Caracteristica> caracteristicaBuscada=caracteristicaService.buscarCaracteristicaXId(caracteristica.getId());
        if (caracteristicaBuscada.isPresent()){
            caracteristicaService.actualizarCaracteristica(caracteristica);
            return ResponseEntity.ok("La caracteristica con id " + caracteristica.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La caracteristica con id= " +caracteristica.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas(){
        return ResponseEntity.ok(caracteristicaService.listarCaracteristicas());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Caracteristica> buscarCaracteristicaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaBuscada = caracteristicaService.buscarCaracteristicaXId(id);
        if (caracteristicaBuscada.isPresent()) {
            return ResponseEntity.ok(caracteristicaBuscada.get());
        } else {
            throw new ResourceNotFoundException("La caracteristica con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
