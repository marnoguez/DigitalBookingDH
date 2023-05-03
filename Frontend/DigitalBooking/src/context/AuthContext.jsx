import { createContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigator = useNavigate();

  //Informacion del usario
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [isLogged, setIsLogged] = useState(false);

  const loginFunction = (email, password, isInBooking, prevPath) => {
    axios
      .post("http://3.20.188.10/auth/login", {
        username: email,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem("JWT", JSON.stringify(response.data.token));
          localStorage.setItem(
            "userData",
            JSON.stringify({
              email: response?.data?.user?.email,
              name: response?.data?.user?.firstName,
              lastName: response?.data?.user?.lastName,
              roleId: response?.data?.user?.role?.id,
            })
            
          );
          setUserData({
            name: response.data.user?.firstName,
            lastName: response.data.user?.lastName,
            email: response.data.user?.email,
            roleId: response?.data?.user?.role?.id
          });
          setIsLogged(true)
          navigator(isInBooking ? prevPath : "/Home");
        }
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Por favor verifique sus credenciales e intente nuevamente.",
          confirmButtonText: "OK",
        });
      });
  };

  const registerFunction = (email, password, firstName, lastName) => {
    axios
      .post("http://3.20.188.10/auth/register", {
        email,
        password,
        firstName,
        lastName,
        role: { nombre: "USER" },
      })
      .then(function (response) {
        if (response.status === 202) {
          Swal.fire({
            icon: "success",
            title: "Cuenta registrada correctamente.",
            text: "Por favor inicie sesión a continuacion con sus credenciales.",
            confirmButtonText: "OK",
          }).then(function (result) {
            if (result.isConfirmed) {
              navigator("/Login");
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const userRefresh = () => {
    axios
      .post(
        "http://3.20.188.10/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const data = {
    userData,
    setUserData,
    isLogged,
    setIsLogged,
    loginFunction,
    registerFunction,
    userRefresh,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
