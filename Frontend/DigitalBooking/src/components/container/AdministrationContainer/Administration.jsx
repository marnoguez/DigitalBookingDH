import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import styles from './/administration.module.css'
import CardAdmin from '../../pure/cardAdmin/CardAdmin'
import axios from 'axios'

const Administration = () => {

    const [productData, setProductData] = useState();

    useEffect(() => {
        axios.get("http://3.20.188.10/productos")
        .then((response) => {
            setProductData(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <div className={styles.adminContainer}>
            <div className={styles.titleAdmin}>
                <h1>Administración</h1>
                <Link to="/home">
                    <MdOutlineArrowBackIos />
                </Link>
            </div>
            <div className={styles.btnCreateContainer}>
                <button className={styles.createProductBtn}><Link to="/add-product">Crear producto</Link></button>
            </div> 
            <div className={styles.cardContainer}>
                {productData?.map((products) => {
                    return(
                        <CardAdmin 
                            key={products?.id}
                            id={products?.id}
                            img={products?.imagenes[0]?.urlImagen}
                            category={products?.categoria?.titulo}
                            name={products?.nombre}
                            description={products?.descripcion}
                        />
                    );
                })}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Administration