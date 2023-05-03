import React from 'react'
import { Link } from 'react-router-dom'
import styles from './succesAlert.module.css'

export default function SuccesAlert (props) {
    

    return(
        <div className={styles.succesCard}>
            <img className={styles.imgSucces} src="https://productosc3g5.s3.us-east-2.amazonaws.com/iconos/check.svg" alt="check" />
            <h1 className={styles.titleSucces}>{props.title}</h1>
            <h4 className={styles.textSucces}>{props.texto}</h4>
            <p className={styles.pSucces}>{props.paragraph}</p>
            <a href={props.link}>{props.aText}</a>
            <Link to="/"><button className={styles.btnSucces}>Ok</button></Link>
        </div>
    )
}
