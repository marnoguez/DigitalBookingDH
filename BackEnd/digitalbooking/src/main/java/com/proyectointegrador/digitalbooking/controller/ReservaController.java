package com.proyectointegrador.digitalbooking.controller;


import com.proyectointegrador.digitalbooking.DTO.ReservaDTOall;
import com.proyectointegrador.digitalbooking.model.Reserva;
import com.proyectointegrador.digitalbooking.model.User;
import com.proyectointegrador.digitalbooking.security.auth.TokenHelper;
import com.proyectointegrador.digitalbooking.service.ReservaService;
import com.proyectointegrador.digitalbooking.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.proyectointegrador.digitalbooking.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private ReservaService reservaService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    TokenHelper tokenHelper;


    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<?> createNewReserva(@RequestBody @Valid Reserva reserva, Principal user
                                             // ,HttpServletRequest request
                            ) {
       /* String token = tokenHelper.getToken(request);
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no proporcionado");
        }
        User userDetails = (User) userService.findByUsername(user.getName());
        if (!tokenHelper.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }
        reserva.setUser(userDetails);*/
        reserva.setUser(userService.findByUsername(user.getName()));
        Reserva res = reservaService.newReserva(reserva);
        if (res != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } else {
            return ResponseEntity.badRequest().body("Fecha ya ocupada");
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTOall>> listAllReservas() {
        return ResponseEntity.ok(reservaService.getAllReservas());
    }


    @GetMapping("/productos/{productoId}")
    //@PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<List>> getAllProductoByProductId(@PathVariable("productoId") Long productId) {
        return ResponseEntity.ok(reservaService.filterByProductId(productId));
    }

    @GetMapping("/user")
    public ResponseEntity<List<?>> getAllReservasByUserId(Principal user) {

        User u = userService.findByUsername(user.getName());
        return ResponseEntity.ok(reservaService.filterByUserId(u.getId()));
    }
}
