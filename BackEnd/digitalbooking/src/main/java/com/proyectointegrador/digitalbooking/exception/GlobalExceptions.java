package com.proyectointegrador.digitalbooking.exception;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions{
    private static final Logger LOGGER=Logger.getLogger(GlobalExceptions.class);
    @ExceptionHandler({com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException.class})
    public ResponseEntity<String> procesarResourceNotFoundException (com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException rnfe){
        LOGGER.error("Error, el sistema registró el siguiente problema: "+ rnfe.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rnfe.getMessage());
    }

    @ExceptionHandler({com.proyectointegrador.digitalbooking.exception.BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException bre){
        LOGGER.error("Error, el sistema registró el siguiente problema: "+ bre.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bre.getMessage());
    }

}
