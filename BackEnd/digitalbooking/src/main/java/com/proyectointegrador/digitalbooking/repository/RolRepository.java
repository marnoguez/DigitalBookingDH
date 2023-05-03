package com.proyectointegrador.digitalbooking.repository;

import com.proyectointegrador.digitalbooking.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Role,Long> {
    @Query(value = "select * from rol where nombre = ?",nativeQuery = true)
    Role ConseguirUser(String nombre);
}
