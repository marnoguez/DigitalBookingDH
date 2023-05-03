package com.proyectointegrador.digitalbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="productos")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column(length = 1250)
    private String descripcion;
    @Column
    private String calificacion;
    @Column
    private String valoracion;
    @Column
    private String latitud;
    @Column
    private String longitud;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "ciudad_id", referencedColumnName = "id")
    private Ciudad ciudad;

    @OneToMany( fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JsonIgnoreProperties(value = { "producto" })
    @JoinColumn(name = "imagen_id", referencedColumnName = "id")
    private List<Imagen> imagenes = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    //@JoinTable(name="producto_caracteristica",
          //  joinColumns = @JoinColumn(name="producto_id"),
          //  inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    private List<Caracteristica> caracteristicas = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "politica_id", referencedColumnName = "id")
    private Politica politica;

    @JsonIgnore
    @OneToMany(mappedBy = "producto",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Reserva> reservas = new HashSet<>();
}
