package com.proyectointegrador.digitalbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "cancelaciones")
public class Cancelacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String item_cancelacion;

    @JsonIgnore
    @ManyToMany(mappedBy = "cancelaciones", cascade = CascadeType.MERGE)
    private List<Politica> politicas = new ArrayList<>();
}
