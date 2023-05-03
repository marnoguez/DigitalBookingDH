import React from 'react'
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from ".//selectCheckin.module.css"


const SelectCheckin = ({getSelectCheckIn}) => {
    return (
        <div className={styles.container}>
            <p className={styles.description}> <AiOutlineCheckCircle /> Tu habitación va a estar lista para el ceck-in entre las 10:00hs y las 23:00hs </p>
            <h6 className={styles.subTitle}> Indicá tu horario de llegada</h6>
            <select className={styles.select} name="seleccionar-hora" id="seleccionar-hora" placeholder="Selecionar hora de llegada" onChange={getSelectCheckIn}>
                <option defaultValue={true} value="Selecionar hora de llegada">Selecionar hora de llegada</option>
                <option value="01:00hs">01:00hs</option>
                <option value="02:00hs">02:00hs</option>
                <option value="03:00hs">03:00hs</option>
                <option value="04:00hs">04:00hs</option>
                <option value="05:00hs">05:00hs</option>
                <option value="06:00hs">06:00hs</option>
                <option value="07:00hs">07:00hs</option>
                <option value="08:00hs">08:00hs</option>
                <option value="09:00hs">09:00hs</option>
                <option value="11:00hs">11:00hs</option>
                <option value="12:00hs">12:00hs</option>
                <option value="13:00hs">13:00hs</option>
                <option value="14:00hs">14:00hs</option>
                <option value="15:00hs">15:00hs</option>
                <option value="16:00hs">16:00hs</option>
                <option value="18:00hs">18:00hs</option>
                <option value="19:00hs">19:00hs</option>
                <option value="20:00hs">20:00hs</option>
                <option value="21:00hs">21:00hs</option>
                <option value="22:00hs">22:00hs</option>
                <option value="23:00hs">23:00hs</option>
                <option value="00:00hs">00:00hs</option>
            </select>
        </div>
    )
}

export default SelectCheckin