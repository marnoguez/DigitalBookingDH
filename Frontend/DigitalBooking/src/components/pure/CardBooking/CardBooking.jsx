import React, { useEffect, useState } from "react";
import styles from ".//cardBooking.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const CardBooking = ({ dataProductos, startDate, endDate, checkIn }) => {
  const navigator = useNavigate();
 
  const handleBooking = () => {
    if (startDate && endDate && checkIn ) {
      axios
        .post(
          "http://3.20.188.10/reservas",
          {
            horaReserva: checkIn,
            fechaInicio: startDate,
            fechaFin: endDate,
            producto: { id: dataProductos?.id },
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("JWT")
              )}`,
            },
          }
        )
        .then((response) => {
          navigator("/succesfully");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error al realizar la reserva",
        text: "Por favor intente nuevamente.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.lefth}>
        <h4 className={styles.title}>Detalle de la reserva</h4>
        <img
          className={styles.img}
          src={dataProductos?.imagenes?.[0].urlImagen}
          width="100%"
        />
      </section>
      <section className={styles.right}>
        <h6 className={styles.category}>{dataProductos?.categoria?.titulo}</h6>
        <h4 className={styles.title}>{dataProductos?.nombre}</h4>
        <p className={styles.p}>{dataProductos?.descripcion}</p>
        <hr></hr>
        <section className={styles.date}>
          <h6 className={styles.checkin}> Check in</h6>
          <p>{startDate}</p>
        </section>
        <hr></hr>
        <section className={styles.date}>
          <h6 className={styles.checkout}> Check Out</h6>
          <p>{endDate}</p>
        </section>
        <hr></hr>
        <button onClick={handleBooking} className={styles.btnConf}>
          Confirmar reserva
        </button>
      </section>
    </div>
  );
};

export default CardBooking;
