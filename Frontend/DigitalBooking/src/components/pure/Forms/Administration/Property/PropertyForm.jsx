import { Formik } from 'formik'
import React, { useEffect, useState, useRef } from 'react'
import * as Yup from 'yup'
import CitiesSelect from '../../../../utils/CitiesSelect/CitiesSelect'
import styles from './/propertyForm.module.css'
import axios from "axios";

const PropertyForm = ({ handleBlur, citySelect, categorySelect }) => {

    const longitudREG = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    const latitudREG = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    const validationProperty = Yup.object().shape({
        nombre: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'Nombre inválido')
            .max(30, 'Nombre demasiado largo')
            .required('Este campo es Obligatorio'),
        direccion: Yup.string()
            .min(4, 'Dirección demasiado corta')
            .matches(/[A-Za-z0-9]$/, 'Dirección inválida')
            .max(30, 'Dirección demasiado larga')
            .required('Este campo es Obligatorio'),
        longitud: Yup.string()
            .min(8, 'Longitud demasiado corta')
            .matches(longitudREG, 'Longitud inválida')
            .max(30, 'Longitud demasiado larga')
            .required('Este campo es Obligatorio'),
        latitud: Yup.string()
            .min(8, 'Latitud demasiado corta')
            .matches(latitudREG, 'Latitud inválida')
            .max(30, 'Latitud demasiado larga')
            .required('Este campo es Obligatorio'),
    })



    //STATE
    const [categorias, setCategorias] = useState([])
    const [cities, setCities] = useState([]);

    //Select Categoria
    useEffect(() => {
        axios
            .get("http://3.20.188.10/categorias")
            .then(function (response) {
                setCategorias(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        axios
            .get("http://3.20.188.10/ciudades")
            .then(function (response) {
                setCities(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });


    }, [])






    return (
        <Formik
            validationSchema={validationProperty}
            initialValues={{ nombre: "", direccion: "", longitud: "", latitud: "", descripcion: "" }}
            onSubmit={(values) => {
                dataProducto(values.nombre)
            }}

        >
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                handleSubmit,
                isValid,

            }) => (
                <form className={styles.formProperty} noValidate >
                        <div className={styles.right}>
                            <div className={styles.formGroupAdmin}>
                                <label htmlFor="nombre-propiedad">Nombre de la propiedad</label>
                                <input className={styles.inputAdmin} type="text" id='nombre-propiedad' name='nombre-propiedad' placeholder='Hotel Hermitage'
                                    required
                                    onChange={handleChange('nombre')}
                                    onBlur={(e) => handleBlur("nombre", e.target.value)}
                                />
                                <p className={styles.errorNombre} >{errors.nombre && touched.nombre && errors.nombre}</p>
                            </div>
                            <div className={styles.formGroupAdminDirecc}>
                                <label htmlFor="direccion-propiedad">Dirección</label>
                                <input className={styles.inputAdmin} type="text" id='direccion-propiedad' name='direccion-propiedad' placeholder='Av. Colón 3790'
                                    required
                                    onChange={handleChange('direccion')}
                                    onBlur={(e) => handleBlur("direccion", e.target.value)}
                                />
                                <p className={styles.errorDireccion}>{errors.direccion && touched.direccion && errors.direccion}</p>
                            </div>
                            <div className={styles.formGroupAdminLat}>
                                <label htmlFor="latitud">Latitud</label>
                                <input className={styles.inputAdmin} type="text" id='latitud-propiedad' name='latitud-propiedad' placeholder='-35.745853'
                                    required
                                    onChange={handleChange('latitud')}
                                    onBlur={(e) => handleBlur("latitud", e.target.value)}
                                />
                                <p className={styles.errorLatitud}>{errors.latitud && touched.latitud && errors.latitud}</p>
                            </div>
                        </div>
                        <div className={styles.left}>
                            <div className={styles.formGroupAdminSelect2}>
                                <label htmlFor="ciudad-propiedad">Ciudad</label>
                                <select id="cities"  className={styles.categoriaPropiedad}  onChange={citySelect} >
                                    <option defaultValue={true}>{" ¿A dónde vamos?"}</option>
                                    {cities.map((city) => {
                                        return (
                                            <option key={city.id} value={city.id}>
                                                {city.nombre}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={styles.formGroupAdminSelect1}>
                                <label htmlFor="categoria-propiedad">Categoría</label>
                                <select className={styles.categoriaPropiedad}  onChange={categorySelect} name="categoria-propiedad" id="categoria-propiedad" placeholder='Hotel'>
                                    <option defaultValue={true} value="1">Selecciona una categoria</option>
                                    {categorias?.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.titulo}</option>
                                    })}
                                </select>
                            </div>
                            <div className={styles.formGroupAdminLong}>
                                <label htmlFor="longitud">Longitud</label>
                                <input className={styles.inputAdmin} type="text" id='longitud-propiedad' name='longitud-propiedad' placeholder='-58.205845'
                                    required
                                    onChange={handleChange('longitud')}
                                    onBlur={(e) => handleBlur("longitud", e.target.value)}
                                />
                                <p className={styles.errorLongitud}>{errors.longitud && touched.longitud && errors.longitud}</p>
                            </div>
                        </div>
                        <div className={styles.formGroupAdminDescripcion}>
                            <label htmlFor='descripcion-propiedad'>Descripción</label>
                            <textarea className={styles.textarea} id='descripcion-propiedad' name='descripcion-propiedad' required placeholder={"Escribir aquí"}
                                onBlur={(e) => handleBlur("descripcion", e.target.value)}
                            />
                        </div>
                </form>
            )}
        </Formik>
    )
}

export default PropertyForm