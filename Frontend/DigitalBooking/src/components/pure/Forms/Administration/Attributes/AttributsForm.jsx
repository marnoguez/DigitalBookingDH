import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import styles from './/attributsForm.module.css'

const AttributsForm = ({createNewAtribute}) => {

    const urlREG = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const validationAttributs = Yup.object().shape({
        nombreAttribut: Yup.string()
            .min(3, 'Nombre demasiado corto')
            .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'Nombre inválido')
            .max(30, 'Nombre demasiado largo'),
        urlAttribut: Yup.string()
            .min(10, 'Link demasiado corto')
            .matches(urlREG, 'Link del icono inválido')
            .max(500, 'Link demasiado largo')
    })
    
    return (
        <div className={styles.formContainerAtributos}>
            <Formik
                validationSchema={validationAttributs}
                initialValues={{ nombreAttribut: "", urlAttribut: "" }}
                onSubmit={(values, {resetForm}               
            ) => {                
                createNewAtribute(values.nombreAttribut, values.urlAttribut)
                resetForm({values:''})
            }}>   
                        
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                handleSubmit,
                isValid
            }) => (
                <form className={styles.formAtributos} noValidate onSubmit={handleSubmit}>
                    <div className={styles.formGroupAtributos}>
                        <label htmlFor="nombre-atributo">Nombre</label>
                        <input className={styles.inputAtributos} type="text" id='nombre-atributo' name='nombre-atributo' placeholder='Wifi'
                            onChange={handleChange('nombreAttribut')}
                            onBlur={() => setFieldTouched('nombreAttribut')}
                        />
                        <p className={styles.errorNombreAttr}>{errors.nombreAttribut && touched.nombreAttribut && errors.nombreAttribut}</p>
                    </div>
                    <div className={styles.formGroupAtributos}>
                        <label htmlFor="url-atributo">Icono</label>
                        <input className={styles.inputAtributos} type="url" id='url-artibuto' name='url-artibuto' placeholder='wifi.svg' 
                            onChange={handleChange('urlAttribut')}
                            onBlur={() => setFieldTouched('urlAttribut')}
                        />
                        <p className={styles.errorUrlAttr}>{errors.urlAttribut && touched.urlAttribut && errors.urlAttribut}</p>
                        <button  type="submit" className={styles.addButton2}>+</button>
                    </div>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default AttributsForm