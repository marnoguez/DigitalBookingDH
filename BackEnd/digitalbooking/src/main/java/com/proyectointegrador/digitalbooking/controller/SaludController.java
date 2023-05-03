package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Salud;
import com.proyectointegrador.digitalbooking.service.SaludService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/salud")
public class SaludController {
    private SaludService saludService;
    @Autowired
    public SaludController(SaludService saludService) {
        this.saludService = saludService;
    }

    @PostMapping
    public ResponseEntity<Salud> registrarSalud(@RequestBody Salud salud){
        return ResponseEntity.ok(saludService.guardarSalud(salud));
    }


    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarSalud(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Salud> saludBuscada=saludService.buscarSaludXId(id);
        if (saludBuscada.isPresent()){
            saludService.eliminarSalud(id);
            return ResponseEntity.status(HttpStatus.OK).body("La salud con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La salud con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarSalud(@RequestBody Salud salud)throws ResourceNotFoundException{
        Optional<Salud> saludBuscada=saludService.buscarSaludXId(salud.getId());
        if (saludBuscada.isPresent()){
            saludService.actualizarSalud(salud);
            return ResponseEntity.ok("La salud con id " + salud.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La salud con id= " +salud.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Salud>> listarSalud(){
        return ResponseEntity.ok(saludService.listarSalud());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Salud> buscarSaludPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Salud> saludBuscada = saludService.buscarSaludXId(id);
        if (saludBuscada.isPresent()) {
            return ResponseEntity.ok(saludBuscada.get());
        } else {
            throw new ResourceNotFoundException("La salud con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
