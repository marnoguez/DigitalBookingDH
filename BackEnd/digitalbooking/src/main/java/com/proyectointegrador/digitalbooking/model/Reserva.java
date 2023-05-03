package com.proyectointegrador.digitalbooking.model;

import javax.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name="reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String horaReserva;
    @Column(length = 20)
    private LocalDate fechaInicio;
    @Column(length = 20)
    private LocalDate fechaFin;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "producto_id", referencedColumnName = "id")
    private Producto producto;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private User user;
}
