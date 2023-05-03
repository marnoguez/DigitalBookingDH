import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardReservations from "../../pure/CardReservations/CardReservations";
import { MdOutlineArrowBackIos } from "react-icons/md";
import styles from ".//reservationsContainer.module.css";

const ReservationsContainer = () => {
  const [reservaData, setReservaData] = useState();

  useEffect(() => {
    axios
      .get("http://3.20.188.10/reservas/user", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`,
        },
      })
      .then((response) => {
        setReservaData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.reservationsContainer}>
      <div className={styles.titleReservations}>
        <h1 className={styles.reservationsH1}>Mis Reservas</h1>
        <Link to="/home">
          <MdOutlineArrowBackIos />
        </Link>
      </div>
      <section className={styles.cardsReservations}>
        {reservaData?.map((reserva) => {
          return (
            <CardReservations
              key={reserva?.id}
              hora={reserva?.horaReserva}
              fechaInicio={reserva?.fechaInicio}
              fechaFin={reserva?.fechaFin}
              img={reserva?.producto?.imagenes[0]?.urlImagen}
              name={reserva?.producto?.nombre}
              category={reserva?.producto?.categoria?.titulo}
              calification={reserva?.producto?.calificacion}
              review={reserva?.producto?.valoracion}
              direction={"A 90 metros del centro"}
              description={reserva?.producto?.descripcion}
            />
          );
        })}
      </section>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ReservationsContainer;
