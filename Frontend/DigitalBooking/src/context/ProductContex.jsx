import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProductContex = createContext();

const ProductContexProvider = ({ children }) => {
  //Todos los producto
  const [products, setProducts] = useState([]);

  //Producto selecionado
  const [selectedData, setSelectedData] = useState([]);

  const {isLogged } =  useContext(AuthContext);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("JWT"))){
      const url = "http://3.20.188.10/productos";
      axios
        .get(url)
        .then(function (response) {
          setProducts(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

    }else{
    const url = "http://3.20.188.10/productos/random";
    axios
      .get(url)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
  }, [isLogged])

  //Funcion para la descripcion
  const description = (id) => {
    axios
      .get(`http://3.20.188.10/productos/id/${id}`)
      .then(function (response) {
        setSelectedData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const filterByCategoria = (id) => {
    axios
      .get(`http://3.20.188.10/productos?categoria=${id}`)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const filterByCity = (cityId) => {
    axios
      .get(`http://3.20.188.10/productos?ciudad=${cityId}`)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };


  const filterByDate = (dates) => {    
       
    axios
      .get(`http://3.20.188.10/productos?checkIn=${dates.startDate}&checkOut=${dates.endDate}`)
      .then(function (response) {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  };

  const filterByDateCity= (city,dates) => {   
       
    axios
      .get(`http://3.20.188.10/productos?city=${city}&checkIn=${dates.startDate}&checkOut=${dates.endDate}`)
      .then(function (response) {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  };

/* 
  const updateProducts = () => {
    axios.put('http://3.20.188.10/productos')
      .then(
        function (response) {
          console.log(response.data);
        })
      .catch(function (error) {
          console.log(error);
      })
    }

  const deleteProducts = (id) => {
    axios.delete(`http://3.20.188.10/productos/id/${id}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    }
*/

  const data = {
    products,
    setProducts,
    description,
    selectedData,
    filterByCategoria,
    filterByCity,
    filterByDate,
    filterByDateCity,
/*
    updateProducts,
    deleteProducts 
*/
  };

  return (
    <ProductContex.Provider value={data}>{children}</ProductContex.Provider>
  );
};

export default ProductContexProvider;
