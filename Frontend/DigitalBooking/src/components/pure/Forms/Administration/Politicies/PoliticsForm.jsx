import React from 'react'
import styles from './/politicsForm.module.css'

const PoliticsForm = ({createNewNorma,createNewSalud, createNewCancelacion}) => {

    
    

    return (
        <div className={styles.formContainerPoliticas}>
            <form className={styles.formPoliticas}>
                <div className={styles.formGroupPoliticas}>
                    <h4>Normas de la casa</h4>
                    <label htmlFor="descripcion-politicas">Descripción</label>
                    <textarea className={styles.textareaPoliticas} name="textarea-politicas" id="textarea-politicas" placeholder={"Escribir aquí"} required/>
                    <button className={styles.addBtnPolitics} type='button'  onClick={()=>{createNewNorma(document.getElementById('textarea-politicas').value)}} >+</button>
                </div>
                <div className={styles.formGroupPoliticas}>
                    <h4>Salud y seguridad</h4>
                    <label htmlFor="descripcion-politicas">Descripción</label>
                    <textarea className={styles.textareaPoliticas} name="textarea-politicas" id="textarea-salud" placeholder={"Escribir aquí"} required/>
                    <button className={styles.addBtnPolitics} type='button'  onClick={()=>{createNewSalud(document.getElementById('textarea-salud').value)}} >+</button>
                </div>
                <div className={styles.formGroupPoliticas}>
                    <h4>Políticas de cancelación</h4>
                    <label htmlFor="descripcion-politicas">Descripción</label>
                    <textarea className={styles.textareaPoliticas} name="textarea-politicas" id="textarea-cancelaciones" placeholder={"Escribir aquí"} required/>
                    <button className={styles.addBtnPolitics} type='button'  onClick={()=>{createNewCancelacion(document.getElementById('textarea-cancelaciones').value)}} >+</button>
                </div>
            </form>
        </div>
    )
}

export default PoliticsForm