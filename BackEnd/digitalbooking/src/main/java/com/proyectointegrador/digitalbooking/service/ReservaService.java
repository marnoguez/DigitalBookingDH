package com.proyectointegrador.digitalbooking.service;

import com.proyectointegrador.digitalbooking.DTO.ReservaDTO;
import com.proyectointegrador.digitalbooking.DTO.ReservaDTOall;
import com.proyectointegrador.digitalbooking.DTO.UserDTOshort;
import com.proyectointegrador.digitalbooking.Email.EmailSenderService;
import com.proyectointegrador.digitalbooking.model.Producto;
import com.proyectointegrador.digitalbooking.model.Reserva;
import com.proyectointegrador.digitalbooking.model.User;
import com.proyectointegrador.digitalbooking.repository.ProductoRepository;
import com.proyectointegrador.digitalbooking.repository.ReservaRepository;
import com.proyectointegrador.digitalbooking.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaService {
    private static final Logger LOGGER = Logger.getLogger(ReservaService.class);
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private EmailSenderService senderService;
    @Autowired
    private UserRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    public ReservaService(ReservaRepository bookingRepository) {
        this.reservaRepository = reservaRepository;

    }

    public Reserva newReserva(Reserva reserva) {

        if (reservaRepository.buscarPorFecha(reserva.getProducto().getId(),reserva.getFechaInicio(),reserva.getFechaFin()).isEmpty()){

            LOGGER.debug("Se inicio el guardado de la reserva " + reserva);
            User usuario = usuarioRepository.findById(reserva.getUser().getId()).get();
            Producto producto = productoRepository.findById(reserva.getProducto().getId()).get();

            Reserva r = reservaRepository.save(reserva);

            senderService.sendEmail(usuario.getUsername(), "Reserva realizada",
                "Reserva realizada para el "+reserva.getFechaInicio().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) +
                    " al " + reserva.getFechaFin().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) +
                    " a las " + reserva.getHoraReserva() + " para el "+ producto.getCategoria().getTitulo() +" " + producto.getNombre() +
                    " por el usuario " + reserva.getUser().getFirstName() + " " + reserva.getUser().getLastName());


            LOGGER.debug("Email de confirmacion de reserva enviado");
            return r;
        }else {
            return null;
        }
    }

    public List<ReservaDTOall> getAllReservas() {
        LOGGER.info("Se inicio el listado de reservas");
        List<ReservaDTOall> reservaDTOList = new ArrayList<>();
        List<Reserva> reservaEntityList = reservaRepository.findAll();

        for (Reserva reserva : reservaEntityList) {
            UserDTOshort u = new UserDTOshort();
            u.setEmail(reserva.getUser().getUsername());
            u.setFirstName(reserva.getUser().getFirstName());
            u.setLastName(reserva.getUser().getLastName());
            ReservaDTOall r = new ReservaDTOall();
            r.setId(reserva.getId());
            r.setHoraReserva(reserva.getHoraReserva());
            r.setFechaInicio(reserva.getFechaInicio());
            r.setFechaFin(reserva.getFechaFin());
            r.setProducto(reserva.getProducto());
            r.setUserDTOshort(u);

            reservaDTOList.add(r);

        }
        return reservaDTOList;
    }

    public List<List> filterByProductId(Long id) {
        LOGGER.info("Se inicio la busqueda de reservas con producto id: " + id);
        List<Reserva> reservas = reservaRepository.findByProductoId(id);
        List<List> fechasList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

        for (Reserva reserva: reservas) {

            List<String> fechas = new ArrayList<>();

           // Long fechaI =  reserva.getFechaInicio().atStartOfDay().atZone(ZoneOffset.UTC).toInstant().toEpochMilli();
           // Long fechaF =  reserva.getFechaFin().atStartOfDay().atZone(ZoneOffset.UTC).toInstant().toEpochMilli();

            String fechaI =  reserva.getFechaInicio().format(formatter);
            String fechaF =  reserva.getFechaFin().format(formatter);

            fechas.add(String.valueOf(fechaI));
            fechas.add(String.valueOf(fechaF));

            fechasList.add(fechas);
        }
        return fechasList;
    }

    public List<ReservaDTO> filterByUserId(Long id) {
        LOGGER.info("Se inicio la busqueda de reservas del usuario con id: " + id);
        List<ReservaDTO> reservaDTOList = new ArrayList<>();
        List<Reserva> reservaEntityList = reservaRepository.findByUserId(id);

        for (Reserva reserva : reservaEntityList) {
            ReservaDTO reservaDTOABuscar = new ReservaDTO();
            reservaDTOABuscar.setId(reserva.getId());
            reservaDTOABuscar.setHoraReserva(reserva.getHoraReserva());
            reservaDTOABuscar.setFechaInicio(reserva.getFechaInicio());
            reservaDTOABuscar.setFechaFin(reserva.getFechaFin());
            reservaDTOABuscar.setProducto(reserva.getProducto());
            reservaDTOList.add(reservaDTOABuscar);
        }
        return reservaDTOList;
    }

}
