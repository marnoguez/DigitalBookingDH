import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from ".//citiesSelect.module.css";

const CitiesSelect = ({ clase, citySelect }) => {
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState();

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

  
  return (
    <div>
      <select id="cities" onChange={citySelect}  className={styles[clase]}>
        <option defaultValue={true} value={""}>{" ¿A dónde vamos?"}</option>
        {cities.map((city) => {
          return (
            <option key={city.id} value={city.id}>
              {city.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CitiesSelect;
