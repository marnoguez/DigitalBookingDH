package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.DTO.UserDTO;
import com.proyectointegrador.digitalbooking.model.User;
import com.proyectointegrador.digitalbooking.repository.RolRepository;
import com.proyectointegrador.digitalbooking.security.auth.JwtAuthenticationRequest;
import com.proyectointegrador.digitalbooking.security.auth.TokenHelper;
import com.proyectointegrador.digitalbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {


    @Autowired
    TokenHelper tokenHelper;
    @Autowired
    RolRepository rolRepository;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userDetailsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody JwtAuthenticationRequest authenticationRequest,
            HttpServletResponse response
    ) throws AuthenticationException, IOException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );

        // Inject into security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // token creation
        User user = (User)authentication.getPrincipal();
        String jws = tokenHelper.generateToken( user.getUsername());
        // Return the token and the user
        Map<String, Object> map = new HashMap<>();
        map.put("token", jws);
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getUsername());
        userDTO.setRole(user.getRole());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        map.put("user", userDTO);
        return ResponseEntity.ok(map);
    }

    @RequestMapping(value = "/refresh", method = RequestMethod.POST)
    public ResponseEntity<?> refreshAuthenticationToken(
            HttpServletRequest request,
            HttpServletResponse response,
            Principal principal
    ) {

        String authToken = tokenHelper.getToken( request );

        if (authToken != null && principal != null) {

            // TODO check user password last update
            String refreshedToken = tokenHelper.refreshToken(authToken);

            return ResponseEntity.ok(refreshedToken);
        } else {
            return ResponseEntity.accepted().build();
        }
    }

    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }

    static class PasswordChanger {
        public String oldPassword;
        public String newPassword;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody UserDTO user) {
        if(userDetailsService.findByUsername(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Ya existe un usuario con ese email");
        }

        User u = new User();
        u.setUsername(user.getEmail().toLowerCase(Locale.ROOT));
        u.setPassword(user.getPassword());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setRole(rolRepository.ConseguirUser(user.getRole().getNombre()));
        userDetailsService.save(u);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "Se ha registrado correctamente" );
        return ResponseEntity.accepted().body(result);
    }

}
