import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from './/cardReservations.module.css'
import DeleteButton from '../../utils/AdminButtons/DeleteButton'

const CardReservations = ({ img, category, name, calification, review, direction, description, hora, fechaFin, fechaInicio }) => {

return (
    <div className={styles.cardReservations}>
        <section className={styles.imageContainer}>
            <img className={styles.images} src={img} alt='imagen'/>
        </section>
        <section className={styles.dataReservations}>
            <div className={styles.nameAndCategory}>
                <h6 className={styles.category}>{category}</h6>
                <h3 className={styles.title}>{name}</h3>
            </div>
            <div className={styles.reviewAndCalification}>
                <p className={styles.calification}>{calification}</p>               
            </div>            
            <div className={styles.descriptionContainer}>
                <p><span><FaMapMarkerAlt fontSize={'20px'} /></span><span>{direction}</span> <a  className={styles.a}>MOSTRAR EN EL MAPA</a></p>
                <p>{description.slice(0,150) + '...'}<a  className={styles.a}>mas</a></p>
                <p>
                    <span className={styles.spanCheck}>CheckIn:</span> {fechaInicio}
                    <br />   
                    <span className={styles.spanCheck}>CheckOut:</span> {fechaFin}
                </p>
                <p><span className={styles.spanCheck}>Hora de llegada estimada: </span>{hora}</p>
            </div>
            <section className={styles.sectionIcons}></section>            
        </section>
    </div>
)
}

export default CardReservations