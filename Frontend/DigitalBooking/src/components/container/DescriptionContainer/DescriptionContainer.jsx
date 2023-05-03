import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineArrowBackIos, MdLocationOn } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsWhatsapp, BsInstagram, BsPaperclip } from "react-icons/bs";
import { Checkbox, Menu, MenuItem } from "@mui/material";
import MapView from "../../utils/Map/MapView";
import StandardImageList from "../../pure/ListImages/ListImages";
import styles from "./descriptionContainer.module.css";
import Carrusel from "../../utils/Carrusel/Carrusel";
import { ProductContex } from "../../../context/ProductContex";
import Caracteristicas from "../../pure/Caracteristicas/Caracteristicas";
import Calendar from "../../pure/DatePicker/Calendar";
import PoliciesContainer from "../Policies Container/PoliciesContainer";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

const DescriptionContainer = () => {
  let { id } = useParams();

  const navigator = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    description(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //Contexto Producto
  const { description, selectedData } = useContext(ProductContex);

  //Eliminar fechas reservadas del calendar
  const [disableDates, setDisableDates] = useState();

  useEffect(() => {
    axios
      .get(`http://3.20.188.10/reservas/productos/${id}`)
      .then(function (response) {
        setDisableDates(response?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  //Guardo la info del calendar
  const [info, setInfo] = useState("");

  const handleDateRangeBooking = (e) => {
    setInfo(e);
  };

  //Fechas obtenidas dedel el calendar
  const date1 = info[0]?.$d?.toLocaleDateString();
  const date2 = info[1]?.$d?.toLocaleDateString();

  //**************************************************************** */

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const verifyLogin = () => {
    if (localStorage.getItem("JWT")) {
      navigator(`/description/${id}/booking`);
      //Cargo en Local storgae las fechas
      localStorage.setItem("startDate", convertirFecha(date1));
      localStorage.setItem("endDate", convertirFecha(date2));
    } else {
      navigator(`/Login`, { state: { previousPath: pathname } });
    }
  };

  return (
    <div className={styles.container}>
      {selectedData && disableDates && (
        <div>
          <section className={styles.top}>
            <div className={styles.titleDesc}>
              <h6>{selectedData.categoria?.titulo}</h6>
              <h1>{selectedData.nombre}</h1>
              <Link to="/home">
                <MdOutlineArrowBackIos />
              </Link>
            </div>
            <div className={styles.divDesc}>
              <p className={styles.ubication}>
                <MdLocationOn /> {selectedData.ciudad?.nombre}, Argentina
              </p>
              <div className={styles.puntaje}>
                <p style={{ width: "120px" }}>
                  {selectedData.valoracion}
                  <span style={{ marginLeft: "10PX" }}>
                    {selectedData.calificacion}
                  </span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className={styles.likeAndShare}>
              <i onClick={handleClick}>
                <AiOutlineShareAlt />
              </i>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <a
                    href="/description"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Copiar enlace <BsPaperclip style={{ color: "grey" }} />
                  </a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a
                    href="https://whatsapp.com"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Compartir <BsWhatsapp style={{ color: "green" }} />
                  </a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a
                    href="https://instagram.com"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Compartir <BsInstagram style={{ color: "orange" }} />
                  </a>
                </MenuItem>
              </Menu>
              <div className={styles.likeButton}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite style={{ color: "#df2b2b" }} />}
                />
              </div>
            </div>
            <div className={styles.images}>
              <StandardImageList img={selectedData.imagenes} />
            </div>
            <Carrusel img={selectedData.imagenes} />
          </section>
          <br />
          <section className={styles.services}>
            <h4>Alojate en el corazón de {selectedData?.ciudad?.nombre}</h4>
            <br />
            <p>{selectedData?.descripcion}</p>
            <br />

            <br />
            <h4>¿Qué ofrece este lugar?</h4>
            <hr />

            <div className={styles.iconList}>
              <ul className={styles.iconServices}>
                {selectedData?.caracteristicas?.map((item) => {
                  return (
                    <Caracteristicas
                      key={item.id}
                      description={item.descripcion}
                      icon={item.icono}
                    />
                  );
                })}
              </ul>
            </div>
            <br />
          </section>
          <section className={styles.dateDisponible}>
            <h4>Fechas disponibles</h4>
            <Calendar
              clase={"oneCalendar"}
              clase2={"calendarDescription"}
              handleBookingDate={handleDateRangeBooking}
              disableDates={disableDates}
            />
            <div className={styles.divCalendar}>
              <p className={styles.textCalendar}>
                Agregá tus fechas de viaje para obtener precios exactos
              </p>
              <button onClick={verifyLogin} className={styles.btnCalendar}>
                Iniciar reserva
              </button>
            </div>
          </section>
          <br />
          <section className={styles.mapaContainer}>
            <h4 style={{ marginLeft: "1%" }}>¿Dónde vas a estar?</h4>
            <hr />
            <div className={styles.mapa}>
              { selectedData.latitud && <MapView/> } 
            </div>
          </section>
          <br />
          <section className={styles.listNormas}>
            <PoliciesContainer data={selectedData} />
          </section>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export default DescriptionContainer;
