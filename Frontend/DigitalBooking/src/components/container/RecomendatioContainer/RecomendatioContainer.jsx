import React, {useContext,useState} from 'react'
import styles from './/recomendatioContainer.module.css'
import data from '../../../staticData/hoteles.json'
import RecomendationCard from '../../pure/RecomendationCard/RecomendationCard'
import { ProductContex } from '../../../context/ProductContex'

const RecomendatioContainer = () => {


    //Contexto de productos
    const {products} =  useContext(ProductContex);       
   
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recomendaciones</h2>
      <section className={styles.sectionContainer}>
        {products.map((data, index) =>{        
          return <RecomendationCard key={data.id} id={data.id} img={data.imagenes} title={data.nombre} calification={data.calificacion} category={data.categoria} desciption={data.descripcion} direction={"A 90 metros del centro"} caracteristicas={data.caracteristicas} review={data.valoracion}/>
        })}

      </section>
    </div>
  )
}

export default RecomendatioContainer