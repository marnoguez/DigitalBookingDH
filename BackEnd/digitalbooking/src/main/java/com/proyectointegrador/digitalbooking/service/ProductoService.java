package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Producto;
import com.proyectointegrador.digitalbooking.repository.ProductoRepository;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    private ProductoRepository productoRepository;
    private static final Logger LOGGER=Logger.getLogger(ProductoService.class);
    @Autowired
    public ProductoService(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    public Producto guardarProducto(Producto producto) {
        LOGGER.info("Se inició el guardado de el producto "+producto.getNombre());
        Producto productoAGuardar = productoRepository.save(producto);
        return productoAGuardar;
    }
    public Optional<Producto> buscarProductoXId(Long id) throws ResourceNotFoundException {
        Optional<Producto> productoBuscado = productoRepository.findById(id);
        if (productoBuscado.isPresent()) {
            LOGGER.info("Se inició la búsqueda de el producto con id "+id);
            return productoBuscado;
        } else {
            throw new ResourceNotFoundException("No existe el producto con id " + id);
        }
    }

    public List<Producto> listarProductos() {
        LOGGER.info("Se inició el listado de productos");
        return productoRepository.findAll();
    }

    public ResponseEntity<Producto> actualizarProducto(Producto producto) throws ResourceNotFoundException {
        Optional<Producto> productoBuscado = productoRepository.findById(producto.getId());
        if (productoBuscado.isPresent()) {
            LOGGER.info("Se inició la actualización de el producto con id " + producto.getId());
            return ResponseEntity.ok().body(productoRepository.save(producto));
        } else {
            throw new ResourceNotFoundException("No existe el producto con id " + producto.getId() + " que intenta actualizar");
        }
    }

    public void eliminarProducto(Long id) throws ResourceNotFoundException {
        Optional<Producto> productoBuscado = productoRepository.findById(id);
        if (productoBuscado.isPresent()) {
            LOGGER.warn("Se eliminó el producto con id "+id);
            productoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No existe el producto con id " + id + " que intenta eliminar");
        }
    }
    public List<Producto> productosRandom() {
        LOGGER.warn("Se inicio el listado de productos random ");
        return productoRepository.productosRandom();
    }
    public List<Producto> productosPorCategoria(Long categoria_id){
        LOGGER.warn("Se inicio el listado de productos por categoria ");
        return productoRepository.findAllByCategoriaId(categoria_id);
    }
    public List<Producto> productosPorCiudad(Long ciudad_id ){
        LOGGER.warn("Se inicio el listado de productos por ciudad ");
        return productoRepository.findAllByCiudadId(ciudad_id);
    }
    public List<Producto> productosPorCiudadYCategoria(Long ciudad_id, Long categoria_id){
        LOGGER.warn("Se inicio el listado de productos por categoria y ciudad");
        return productoRepository.findAllByCiudadIdAndCategoriaId(ciudad_id, categoria_id);
    }
    public List<Producto> productosPorFechaYCiudad(Long ciudad, LocalDate fInicio, LocalDate fFin ){
        LOGGER.warn("Se inicio el listado de productos por fecha y ciudad");
        return productoRepository.productosPorCiudadYFecha(ciudad,fInicio,fFin);
    }
    public List<Producto> productoPorFecha(LocalDate fInicio, LocalDate fFin ){
        LOGGER.warn("Se inicio el listado de productos por fecha");
        return productoRepository.ProductoPorFecha(fInicio,fFin);
    }

    public List<Producto> productosPorCategoriaYFecha(Long categoria,LocalDate fInicio, LocalDate fFin ){
        LOGGER.warn("Se inicio el listado de productos por categoria y fecha");
        return productoRepository.productosPorCategoriaYFecha(categoria,fInicio,fFin);
    }

    public List<Producto> productosPorCiudadFechaYCategoria(Long ciudad, LocalDate fInicio, LocalDate fFin, Long categoria){
        LOGGER.warn("Se inicio el listado de productos por ciudad, fecha Y categoria");
        return productoRepository.productosPorCiudadFechaYCategoria(ciudad,fInicio,fFin,categoria);
    }
}