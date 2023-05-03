import React, { useContext } from 'react'
import { ProductContex } from '../../../context/ProductContex';
import styles from './/categoryCard.module.css'

export const CategoryCard = ({ id, img, name, number }) => {

  const { filterByCategoria } = useContext(ProductContex);

  return (
    <div onClick={() => { filterByCategoria(id) }} className={styles.card}>
      <section className={styles.imgContainer} >
        <img className={styles.img} src={img} width='100%' alt="categorias" />
      </section>
      <section>
        <h4  className={styles.name}>{name}</h4>
      </section>
    </div>
  )
}
