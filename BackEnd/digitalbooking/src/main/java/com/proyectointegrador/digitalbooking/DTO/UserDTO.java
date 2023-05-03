package com.proyectointegrador.digitalbooking.DTO;

import com.proyectointegrador.digitalbooking.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;

}
