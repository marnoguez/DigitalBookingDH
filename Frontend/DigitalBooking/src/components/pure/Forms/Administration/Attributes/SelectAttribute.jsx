import React,{useEffect,useState} from 'react'
import axios from "axios";
import styles from './/attributsForm.module.css'

const SelectAttribute = ({saveAttributeId}) => {

    const [attributes, setAttributes] = useState([])

    const [attributeId, setAttributeId] = useState([])
    

    const [attributeImg, setAttributeImg] = useState([])
    
    useEffect(() => {
        axios
          .get("http://3.20.188.10/caracteristicas")
          .then(function (response) {
            setAttributes(response.data);           
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }, []);

      useEffect(() => {
      
        attributeId?.map((id)=> {             
            axios
            .get(`http://3.20.188.10/caracteristicas/id/${id}`)
            .then(function (response) {
                console.log(response.data.icono);
                setAttributeImg([...attributeImg, response.data.icono]);           
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });      
                 
    })}, [attributeId])        
     

      const addAtribute = () => {
        let combo = document.getElementById("atribute");
        let selected = combo.options[combo.selectedIndex].value;     
        setAttributeId([selected]);        
        saveAttributeId(selected)   
       
      }; 

     
     

    return (
        <div className={styles.selectAttributesContainer}>
            <select id="atribute" className={styles.selectAttributes}>
                <option defaultValue={true}>{"Seleccione un atributo"}</option>
                {attributes.map((item)=>{
                    return <option key={item.id} value={item.id}>{item.descripcion}</option>
                })}
            </select>
            <button onClick={addAtribute} className={styles.addButton}>+</button>
            <h4 style={{marginTop :"20px"}}>Iconos añadidos</h4>
            <div className={styles.addAttributesIcons}>
                {attributeImg.map((img, index)=>{
                   return <img className={styles.imgAttributes} key={index} src={img} alt='icon' />
                })}                
            </div>
        </div>
    )
}

export default SelectAttribute