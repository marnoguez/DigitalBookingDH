import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import styles from './/loadImageFrom.module.css'

const LoadImagesForm = ({createNewImg}) => {

    const urlREG = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const validationImages = Yup.object().shape({
        urlImages: Yup.string()
            .min(10, 'Link demasiado corto')
            .matches(urlREG, 'Link de la imágen inválido')
            .max(500, 'Link demasiado largo')
            .required('Este campo es Obligatorio')
    })

    return (
        <div className={styles.imagesContainer}>
            <Formik
                validationSchema={validationImages}
                initialValues={{ urlImages: "" }}
                onSubmit={(values, {resetForm}) => {                
                createNewImg(values.urlImages)
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
            <form className={styles.formImages} noValidate onSubmit={handleSubmit}>
                <label htmlFor="url-imagenes">Url de la imágen</label>
                <input className={styles.inputImages} type="url" id='url-imagenes' name='url-imagenes' placeholder='Insertar https://' 
                    required
                    onChange={handleChange('urlImages')}
                    onBlur={() => setFieldTouched('urlImages')}
                />
                <p className={styles.errorUrlImages}>{errors.urlImages && touched.urlImages && errors.urlImages}</p>
                <button type="submit" className={styles.addButtonImagenes}>+</button>
            </form> 
            )}
            </Formik>
        </div>
    )
}

export default LoadImagesForm