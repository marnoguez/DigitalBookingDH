import React, { useEffect, useState, useContext } from "react";
import DatePicker from "../DatePicker/DatePicker";
import styles from ".//searchFilter.module.css";
import axios from "axios";
import { ProductContex } from "../../../context/ProductContex";
import CitiesSelect from "../../utils/CitiesSelect/CitiesSelect";
import moment from 'moment';

const SearchFilter = () => {
  const { filterByCity, filterByDate, filterByDateCity } = useContext(ProductContex);

  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState();
  const [selectedDates, setSelectedDates] = useState({startDate:"", endDate:""});

  useEffect(() => {
    axios
      .get("http://3.20.188.10/ciudades")
      .then(function (response) {
        setCities(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  //Obtener valor selecionado
  const showSelected = () => {
    let combo = document.getElementById("cities");
    let selected = combo.options[combo.selectedIndex].value;
    setSelectedCity(selected);
    console.log(selected);
  };

  const rangeDate = (value) =>{

    const start = moment(value[0]).format('YYYY-MM-DD');
    const end = moment(value[1]).format('YYYY-MM-DD');
    setSelectedDates({startDate:start, endDate:end})
   

  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Busca ofertas en hoteles, casas y mucho más
      </h2>
      <section className={styles.mainSection}>
        <CitiesSelect clase={"citiesSearch"} citySelect={showSelected} />
        <DatePicker range={rangeDate} />
        <button
          onClick={() => {
          
            if(selectedCity && selectedDates ){
              filterByDateCity(selectedCity,selectedDates)
              setSelectedDates("")
              
            }else{
              if(selectedCity){
              filterByCity(selectedCity) 
              setSelectedCity("")
            }
            if(selectedDates){
              filterByDate(selectedDates)
              setSelectedDates("")
            }
            }
                
          }}
          className={styles.btn}
        >
          {" "}
          Buscar
        </button>
      </section>
    </div>
  );
};

export default SearchFilter;
