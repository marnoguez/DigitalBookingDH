import React from 'react'
import { Link } from 'react-router-dom';
import styles from './/cardAdmin.module.css'
import DeleteButton from '../../utils/AdminButtons/DeleteButton';

const CardAdmin = ({ id, img, category, name, description }) => {
    return (
        <div className={styles.cardAdmin}>
            <div className={styles.imgContainerAdmin}>
                <img className={styles.imgAdmin} src={img} alt="Imagen producto" />
            </div>
            <div className={styles.categoryAndName}>
                <h4 className={styles.category}>{category}</h4>
                <h2 className={styles.name}>{name}</h2>
            </div>
            <div className={styles.description}>
                <p className={styles.paragraph}>
                    {description.slice(0,150) + "..."}<Link to={`/description/${id}`} style={{color: "#1DBEB4", cursor: "pointer", fontSize: "0.9rem", fontWeight: "700"}}>mas</Link>
                </p>
                <Link to={`/description/${id}`}><button className={styles.btnVerMas}>Ver más</button></Link>
            </div>
            <div className={styles.btnsAdmin}>
                <DeleteButton deleteBtn={"deleteBtnAdmin"} id={id}/>
            </div>
        </div>
    )
}

export default CardAdmin;
