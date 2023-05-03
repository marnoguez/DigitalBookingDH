import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import styles from ".//bookingContainer.module.css";
import FormBooking from "../../pure/Forms/Booking/FormBooking";
import CardBooking from "../../pure/CardBooking/CardBooking";
import ".//calendar.css";
import DatePicker from "../../pure/DatePicker/DatePicker";
import Calendar from "../../pure/DatePicker/Calendar";
import SelectCheckin from "../../pure/SelectCheckIn/SelectCheckin";
import PoliciesContainer from "../Policies Container/PoliciesContainer";
import { ProductContex } from "../../../context/ProductContex";
import axios from "axios";

const BookingContainer = () => {
  const { selectedData } = useContext(ProductContex);

  const [info, setInfo] = useState("");

  const [selectCheckIn, setSelectCheckIn] = useState("");

  //Estado para amnejar las fechas no habilitadas

  const [disableDates, setDisableDates] = useState();

  useEffect(() => {
    axios
      .get(`http://3.20.188.10/reservas/productos/${selectedData?.id}`)
      .then(function (response) {
        setDisableDates(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //Guardo la info del calendar
  const handleDateRangeBooking = (e) => {
    setInfo(e);
  };

  //Formateo la fecha para que la pueda recibir el endpoint
  function convertirFecha(fecha) {
    if (fecha) {
      const partes = fecha.split("/");
      const dia = partes[0].padStart(2, "0");
      const mes = String(partes[1]).padStart(2, "0");
      const anio = partes[2];
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      return fechaFormateada;
    }
  }

  //Fechas obtenidas dedel el from
  const date1 = info[0]?.$d?.toLocaleDateString();
  const date2 = info[1]?.$d?.toLocaleDateString();

  //Select
  const getSelectCheckIn = () => {
    let combo = document.getElementById("seleccionar-hora");
    let selected = combo.options[combo.selectedIndex].value;
    setSelectCheckIn(selected);
    console.log(selectCheckIn);
   
  }

 

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <div className={styles.topContainer}>
          <section>
            <h6 className={styles.category}>
              {selectedData?.categoria?.titulo}
            </h6>
            <h3 className={styles.nameHotel}>{selectedData?.nombre}</h3>
          </section>
          <Link to="/home">
            <MdOutlineArrowBackIos
              style={{
                fontSize: "40px",
                color: "white",
                marginTop: "17px",
                marginRight: "30px",
              }}
            />
          </Link>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.middleLeft}>
            <h4 className={styles.title}>Completá tus datos</h4>
            <FormBooking />
            <h4 className={styles.title}>Seleccioná tu fecha de reserva</h4>
            <Calendar
              clase={"oneCalendarBooking"}
              clase2={"calendarBooking"}
              handleBookingDate={handleDateRangeBooking}
              disableDates={disableDates}
            />
            <h4 className={styles.title}>Tu horario de llegada</h4>
            <SelectCheckin getSelectCheckIn={getSelectCheckIn} />
          </div>
          <div className={styles.middleRigth}>
            <CardBooking
              dataProductos={selectedData}
              startDate={convertirFecha(date1)}
              endDate={convertirFecha(date2)}
              checkIn={selectCheckIn}
            />
          </div>
        </div>
      </section>
      <PoliciesContainer data={selectedData} />
    </div>
  );
};

export default BookingContainer;
