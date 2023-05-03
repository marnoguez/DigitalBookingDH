package com.proyectointegrador.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductoDTO {
    private Long id;

    private String nombre;

    private String categoriaNombre;

    private UserDTO usuarioDTO;

}
