package com.proyectointegrador.digitalbooking.controller;

import com.proyectointegrador.digitalbooking.exception.ResourceNotFoundException;
import com.proyectointegrador.digitalbooking.model.Producto;
import com.proyectointegrador.digitalbooking.service.CategoriaService;
import com.proyectointegrador.digitalbooking.service.CiudadService;
import com.proyectointegrador.digitalbooking.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/productos")
public class ProductoController {
    private ProductoService productoService;
    private CiudadService ciudadService;
    private CategoriaService categoriaService;

    @Autowired
    public ProductoController(ProductoService productoService) {
            this.productoService = productoService;
    }
    @PostMapping
    public ResponseEntity<Producto> registrarProducto(@RequestBody Producto producto){
        return ResponseEntity.ok(productoService.guardarProducto(producto));
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Long id) throws ResourceNotFoundException {
        if (productoService.buscarProductoXId(id).isPresent()) {
            productoService.eliminarProducto(id);
            return ResponseEntity.status(HttpStatus.OK).body("El producto con id= " + id + " fue eliminado.");
        } else {
               throw new ResourceNotFoundException("El producto con id= " + id + " no fue encontrado. por favor verifique sus datos nuevamente.");
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarProducto(@RequestBody Producto producto) throws ResourceNotFoundException {
        ResponseEntity<Producto> respuesta;
        if (productoService.buscarProductoXId(producto.getId()).isPresent()){
            productoService.actualizarProducto(producto);
            return ResponseEntity.ok("El producto con id " + producto.getId() + " fue actualizado.");
        }else {
            throw new ResourceNotFoundException("El producto con id= " + producto.getId() + " no fue encontrado. por favor verifique sus datos nuevamente.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Producto> buscarProductoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Producto> productoBuscado = productoService.buscarProductoXId(id);
        if (productoBuscado.isPresent()) {
            return ResponseEntity.ok(productoBuscado.get());
        } else {
            throw new ResourceNotFoundException("El producto con id= " + id + " no fue encontrado. por favor verifique sus datos nuevamente.");
        }
    }
    @GetMapping("/random")
    public List<Producto> productosRandom(){
        return productoService.productosRandom();
    }

    @GetMapping(params="categoria")
    public ResponseEntity<List<Producto>>  buscarProductosPorCategoria(@RequestParam Long categoria, Pageable pageable) {
        List<Producto> productosBuscadosPorCategoria = productoService.productosPorCategoria(categoria);
        return ResponseEntity.ok(productosBuscadosPorCategoria);
    }

    @GetMapping(params = "ciudad")
    public ResponseEntity<List<Producto>>  buscarProductosPorCiudad(@RequestParam Long ciudad,Pageable pageable) {
        List<Producto> productosBuscadosPorCiudad = productoService.productosPorCiudad(ciudad);
        return ResponseEntity.ok(productosBuscadosPorCiudad);
    }

    @GetMapping(params = {"categoria", "ciudad"})
    public ResponseEntity<List<Producto>>  buscarProductosPorCategoriaYCiudad(@RequestParam Long categoria, @RequestParam Long ciudad) {
        return ResponseEntity.ok(productoService.productosPorCiudadYCategoria(ciudad, categoria));
    }

    @GetMapping(params = {"checkIn", "checkOut"})
    public ResponseEntity<List<Producto>>  ProductoPorFecha
            (@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return ResponseEntity.ok(productoService.productoPorFecha(checkIn, checkOut));
    }

    @GetMapping(params = {"city","checkIn", "checkOut"})
    public ResponseEntity<List<Producto>>  productosPorFechaYCiudad
            (@RequestParam Long city,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return ResponseEntity.ok(productoService.productosPorFechaYCiudad(city, checkIn, checkOut));

    }

    @GetMapping(params = {"checkIn", "checkOut","category"})
    public ResponseEntity<List<Producto>>  productosPorCategoriaYFecha
            (@RequestParam Long category,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return ResponseEntity.ok(productoService.productosPorCategoriaYFecha(category, checkIn, checkOut));
    }

    @GetMapping(params = {"city","checkIn", "checkOut","category"})
    public ResponseEntity<List<Producto>>  productosPorCiudadFechaYCategoria
            (@RequestParam Long city,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
             @RequestParam Long category) {
        return ResponseEntity.ok(productoService.productosPorCiudadFechaYCategoria(city,checkIn, checkOut,category));
    }
}

