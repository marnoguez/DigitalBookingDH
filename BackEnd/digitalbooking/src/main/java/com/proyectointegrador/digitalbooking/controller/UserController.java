package com.proyectointegrador.digitalbooking.controller;


import com.proyectointegrador.digitalbooking.model.User;
import com.proyectointegrador.digitalbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{userId}" )
    //@PreAuthorize("hasRole('ADMIN')")
    public User loadById(@PathVariable Long userId ) {
        return this.userService.findById( userId );
    }

    @GetMapping( "/all")
    //@PreAuthorize("hasRole('ADMIN')")
    public List<User> loadAll() {
        return userService.findAll();
    }


    /*
     *  We are not using userService.findByUsername here(we could),
     *  so it is good that we are making sure that the user has role "ROLE_USER"
     *  to access this endpoint.
     */
    @GetMapping("/me")
    //@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public User user(Principal user) {
        return this.userService.findByUsername(user.getName());
    }
}
