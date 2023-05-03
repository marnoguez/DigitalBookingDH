package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Politica;
import com.proyectointegrador.digitalbooking.service.PoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/politicas")
public class PoliticaController {
    private PoliticaService politicaService;
    @Autowired
    public PoliticaController(PoliticaService politicaService) {
        this.politicaService = politicaService;
    }

    @PostMapping
    public ResponseEntity<Politica> registrarPolitica(@RequestBody Politica politica){
        return ResponseEntity.ok(politicaService.guardarPolitica(politica));
    }


    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarPolitica(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Politica> politicaBuscada=politicaService.buscarPoliticaXId(id);
        if (politicaBuscada.isPresent()){
            politicaService.eliminarPolitica(id);
            return ResponseEntity.status(HttpStatus.OK).body("La politica con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La politica con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarPolitica(@RequestBody Politica politica)throws ResourceNotFoundException{
        Optional<Politica> politicaBuscada=politicaService.buscarPoliticaXId(politica.getId());
        if (politicaBuscada.isPresent()){
            politicaService.actualizarPolitica(politica);
            return ResponseEntity.ok("La politica con id " + politica.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La politica con id= " +politica.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Politica>> listarPolitica(){
        return ResponseEntity.ok(politicaService.listarPoliticas());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Politica> buscarPoliticaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Politica> politicaBuscada = politicaService.buscarPoliticaXId(id);
        if (politicaBuscada.isPresent()) {
            return ResponseEntity.ok(politicaBuscada.get());
        } else {
            throw new ResourceNotFoundException("La politica con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
