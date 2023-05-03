package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Norma;
import com.proyectointegrador.digitalbooking.service.NormaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/normas")
public class NormaController {
    private NormaService normaService;
    @Autowired
    public NormaController(NormaService normaService) {
        this.normaService = normaService;
    }

    @PostMapping
    public ResponseEntity<Norma> registrarNorma(@RequestBody Norma norma){
        return ResponseEntity.ok(normaService.guardarNorma(norma));
    }


    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarNorma(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Norma> normaBuscada=normaService.buscarNormaXId(id);
        if (normaBuscada.isPresent()){
            normaService.eliminarNorma(id);
            return ResponseEntity.status(HttpStatus.OK).body("La norma con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La norma con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarNorma(@RequestBody Norma norma)throws ResourceNotFoundException{
        Optional<Norma> normaBuscada=normaService.buscarNormaXId(norma.getId());
        if (normaBuscada.isPresent()){
            normaService.actualizarNorma(norma);
            return ResponseEntity.ok("La norma con id " + norma.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La norma con id= " +norma.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Norma>> listarNormas(){
        return ResponseEntity.ok(normaService.listarNormas());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Norma> buscarNormaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Norma> normaBuscada = normaService.buscarNormaXId(id);
        if (normaBuscada.isPresent()) {
            return ResponseEntity.ok(normaBuscada.get());
        } else {
            throw new ResourceNotFoundException("La norma con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
