package com.proyectointegrador.digitalbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "salud")
public class Salud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String item_salud;

    @JsonIgnore
    @ManyToMany(mappedBy = "salud", cascade = CascadeType.MERGE)
    private List<Politica> politicas = new ArrayList<>();
}
