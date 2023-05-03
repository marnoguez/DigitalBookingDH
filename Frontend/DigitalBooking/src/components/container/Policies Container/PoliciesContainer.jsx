import { useEffect, useState } from 'react'
import Politics from '../../pure/Politics/Politics'
import styles from "./policesContainer.module.css"

const PoliciesContainer = ({ data }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Qué tenés que saber</h3>
            <hr></hr>
            <div className={styles.listPoli}>
                <section className={styles.sectionContainer}>
                    <h4 className={styles.title}> Normas de la casa</h4>
                    <ul>
                        {data?.politica?.normas?.map((item) => {
                            return <Politics key={item.id} politics={item.item_norma} />
                        })}
                    </ul>
                </section>
                <section  className={styles.sectionContainer}>
                    <h4 className={styles.title}> Salud y seguridad</h4>
                    <ul>
                        {data?.politica?.salud?.map((item) => {
                            return <Politics key={item.id} politics={item.item_salud} />
                        })}
                    </ul>
                </section>
                <section  className={styles.sectionContainer}>
                    <h4 className={styles.title}>Políticas de cancelación</h4>
                    <ul>
                        {data?.politica?.cancelaciones?.map((item) => {
                            return <Politics key={item.id} politics={item.item_cancelacion} />
                        })}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default PoliciesContainer