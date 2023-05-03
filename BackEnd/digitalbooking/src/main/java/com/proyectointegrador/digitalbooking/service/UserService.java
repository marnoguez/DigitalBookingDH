package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.model.User;

import java.util.List;

public interface UserService {
    User findById(Long id);
    User findByUsername(String username);
    List<User> findAll ();

    void changePassword(String oldPassword, String newPassword);

    User save(User user);
}
