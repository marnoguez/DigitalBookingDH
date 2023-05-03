import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AttributsForm from '../../pure/Forms/Administration/Attributes/AttributsForm'
import PoliticsForm from '../../pure/Forms/Administration/Politicies/PoliticsForm'
import PropertyForm from '../../pure/Forms/Administration/Property/PropertyForm'
import LoadImagesForm from '../../pure/Forms/Administration/LoadImages/LoadImagesForm'
import styles from './/administrationContainer.module.css'
import SelectAttribute from '../../pure/Forms/Administration/Attributes/SelectAttribute'
import axios from "axios";
import Swal from "sweetalert2";

const AdministrationContainer = () => {

    //Atributos
    const [atributes, setAttributes] = useState([])

    //Normas
    const [normas, setNormas] = useState([])


    //Salud
    const [salud, setSalud] = useState([])


    //Cancelacion
    const [cancelacion, setCancelacion] = useState([])


    //img
    const [img, setImg] = useState([])

    //Politica
    const [politicaId, setPoliticaId] = useState([])

  

    //Crear Politica y producto
    const createProduct = () => {

        //Creo la politica
           let politicaProdcuto = {
            normas: normas,
            salud: salud,
            cancelaciones: cancelacion
        }

        console.log(dataUsario);
        
        if(politicaProdcuto.normas.length !== 0  && politicaProdcuto.cancelaciones.length !== 0  && politicaProdcuto.salud.length !== 0   ){
        axios.post(
            "http://3.20.188.10/politicas",
            politicaProdcuto
        )
            .then((response) => {

                let dataProducto = {
                    nombre:dataUsario.nombre,
                    descripcion:dataUsario.descripcion,
                    calificacion:"8",
                    valoracion:"Muy Bueno",
                    latitud:dataUsario.latitud,
                    longitud:dataUsario.longitud,
                    ciudad: cityId,
                    categoria:categoryId,
                    caracteristicas:atributes,
                    imagenes:img,
                    politica:{id: response.data.id}         
        
                }
        
                console.log(dataProducto);
                
                axios.post(
                    "http://3.20.188.10/productos",
                    dataProducto
                )
                    .then((response) => {
                        Swal.fire(
                            'Producto agregado con éxito!',
                            '',
                            'success'
                        )
        
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error al crear el producto',
                            'Verifique los datos y vuelva a intentar!',
                            'error'
                        )
                        console.error(error);
                    });
        
              
                setPoliticaId()
            })
            .catch((error) => {
                Swal.fire(
                    'Ocurrio un error al agregar el producto',
                    'Intente nuevamente',
                    'error'
                )
                console.error(error);
            });
        }else{
            Swal.fire(
                'Ocurrio un error al agregar el producto',
                'Todos los datos son obligatorios',
                'error'
            )

        }

       
    }

    //Obtener data Producto sin relaciones

     //Prueba obtener 
     const [dataUsario, setDataUsario] = useState({nombre:"" , direccion:"", latitud:"", longitud:"",descripcion:""})

     const handleBlur = (field, value) => {
         setDataUsario({ ...dataUsario, [field]: value });
       
       };
 

    
    //Conseguir data de ciudad:
    const [cityId, setCityId] = useState({id:""});
    
    const showSelected = () => {
        let combo = document.getElementById("cities");
        let selected = combo.options[combo.selectedIndex].value;
        setCityId({id:selected});

      };

      //Conseguir data de Categoris:
    const [categoryId, setCategoryId] = useState({id:""});
    
    const showSelectedCategory = () => {
        let combo = document.getElementById("categoria-propiedad");
        let selected = combo.options[combo.selectedIndex].value;
        setCategoryId({id:selected});

      };


      

      //Conseguir attributos
   
      const saveAttributeId = (atribute) => {

        setAttributes([...atributes,{id: atribute}])
        

      }

      console.log("Desde admiin " , atributes);



    const createNewAttribute = (description, url) => {

        axios.post(
            "http://3.20.188.10/caracteristicas",
            {
                descripcion: description,
                icono: url,
            }
        )
            .then((response) => {
                Swal.fire(
                    'Atributo agregado con éxito!',
                    '',
                    'success'
                )
                setAttributes([...atributes, { id: response.data.id }])
            })
            .catch((error) => {
                console.error(error);
            });
    }



    const createNewNorma = (norma) => {

        axios.post(
            "http://3.20.188.10/normas",
            {
                item_norma: norma,

            }
        )
            .then((response) => {
                Swal.fire(
                    'Norma agregada con éxito!',
                    '',
                    'success'
                )
                setNormas([...normas, { id: response.data.id }])
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const createNewSalud = (saluds) => {

        axios.post(
            "http://3.20.188.10/salud",
            {
                item_salud: saluds,

            }
        )
            .then((response) => {
                Swal.fire(
                    'Salud agregada con éxito!',
                    '',
                    'success'
                )
                setSalud([...salud, { id: response.data.id }])
            })
            .catch((error) => {
                console.error(error);
            });

    }



    const createNewCancelacion = (cancelaciones) => {

        axios.post(
            "http://3.20.188.10/cancelaciones",
            {
                item_cancelacion: cancelaciones,

            }
        )
            .then((response) => {
                Swal.fire(
                    'Politica de cancelación agregada con éxito!',
                    '',
                    'success'
                )
                setCancelacion([...cancelacion, { id: response.data.id }])
            })
            .catch((error) => {
                console.error(error);
            });

    }



    const createNewImg = (imagenes) => {


        axios.post(
            "http://3.20.188.10/imagenes",
            {
                titulo: "imgDesdeProducto",
                urlImagen: imagenes

            }
        )
            .then((response) => {
                Swal.fire(
                    'Imagen agregada con éxito!',
                    '',
                    'success'
                )
                setImg([...img, { id: response.data.id }])
            })
            .catch((error) => {
                console.error(error);
            });

    }


 


    return (
        <div className={styles.formContainer}>
            <h3 className={styles.titleAdministration}>Crear propiedad</h3>
            <div className={styles.administrationForm}>
                <div className={styles.divForm}>
                    <div className={styles.formGroupAdmin1}>
                        <PropertyForm handleBlur={handleBlur} citySelect={showSelected} categorySelect={showSelectedCategory}/>
                    </div>
                    <div className={styles.formGroupAdmin2}>
                        <h3 className={styles.titles}>Seleccionar Atributos</h3>
                            <SelectAttribute saveAttributeId={saveAttributeId} />
                        <h3 className={styles.titles}>Agregar atributos</h3>
                        <div>
                            <AttributsForm createNewAtribute={createNewAttribute} />
                        </div>
                    </div>
                    <h3 className={styles.titles}>Políticas del producto</h3>
                    <div className={styles.formGroupAdmin3}>
                        <PoliticsForm createNewNorma={createNewNorma} createNewSalud={createNewSalud} createNewCancelacion={createNewCancelacion} />
                    </div>
                    <h3 className={styles.titles}>Cargar imágenes</h3>
                    <div className={styles.formGroupAdmin4}>
                        <LoadImagesForm createNewImg={createNewImg} />
                    </div>
                    <button onClick={createProduct} className={styles.btnCrearProducto} type="submit">Crear producto</button>
                </div>
            </div>
            <br /><br /><br />
        </div>
    )
}

export default AdministrationContainer