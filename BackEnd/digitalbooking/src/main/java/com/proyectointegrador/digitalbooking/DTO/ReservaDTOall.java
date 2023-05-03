package com.proyectointegrador.digitalbooking.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.proyectointegrador.digitalbooking.model.Producto;
import lombok.*;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservaDTOall {

    private Long id;

    private String horaReserva;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private Producto producto;
    @JsonProperty("User")
    private UserDTOshort userDTOshort;
}
