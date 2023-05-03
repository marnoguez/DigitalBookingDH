package com.proyectointegrador.digitalbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.util.HashSet;
import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name="Rol")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    @JsonIgnore
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<User> users = new HashSet<>();
}
