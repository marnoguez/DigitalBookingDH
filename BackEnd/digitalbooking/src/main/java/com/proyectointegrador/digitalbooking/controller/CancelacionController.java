package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Cancelacion;
import com.proyectointegrador.digitalbooking.service.CancelacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cancelaciones")
public class CancelacionController {
    private CancelacionService cancelacionService;
    @Autowired
    public CancelacionController(CancelacionService cancelacionService) {
        this.cancelacionService = cancelacionService;
    }

    @PostMapping
    public ResponseEntity<Cancelacion> registrarCancelacion(@RequestBody Cancelacion cancelacion){
        return ResponseEntity.ok(cancelacionService.guardarCancelacion(cancelacion));
    }


    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarCancelacion(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Cancelacion> cancelacionBuscada=cancelacionService.buscarCancelacionXId(id);
        if (cancelacionBuscada.isPresent()){
            cancelacionService.eliminarCancelacion(id);
            return ResponseEntity.status(HttpStatus.OK).body("La politica de cancelacion con id= " + id + " fue eliminada.");
        }
        else{
            throw new ResourceNotFoundException("La politica de cancelacion con id= "+id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarCancelacion(@RequestBody Cancelacion cancelacion)throws ResourceNotFoundException{
        Optional<Cancelacion> cancelacionBuscada=cancelacionService.buscarCancelacionXId(cancelacion.getId());
        if (cancelacionBuscada.isPresent()){
            cancelacionService.actualizarCancelacion(cancelacion);
            return ResponseEntity.ok("La politica de cancelacion con id " + cancelacion.getId() + " fue actualizada.");
        }
        else{
            throw new ResourceNotFoundException("La politica de cancelacion con id= " +cancelacion.getId()+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Cancelacion>> listarCancelaciones(){
        return ResponseEntity.ok(cancelacionService.listarCancelaciones());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Cancelacion> buscarCancelacionPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Cancelacion> cancelacionBuscada = cancelacionService.buscarCancelacionXId(id);
        if (cancelacionBuscada.isPresent()) {
            return ResponseEntity.ok(cancelacionBuscada.get());
        } else {
            throw new ResourceNotFoundException("La politica de cancelacion con id= " +id+" no fue encontrada. por favor verifique sus datos nuevamente.");
        }
    }
}
