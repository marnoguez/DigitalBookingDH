import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import styles from './/deleteButton.module.css'
import axios from "axios";
import Swal from "sweetalert2";

const DeleteButton = ({deleteBtn, id}) => {

    const deleteProduct = (id) =>{
       
        console.log(id);
        axios
        .delete(`http://3.20.188.10/productos/id/${id}`, {
         
        })
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Producto eliminado correctamente",
              text: "Presione ok para continuar",
              confirmButtonText: "OK",
            }).then(function (result) {
              if (result.isConfirmed) {
                window.location.href = window.location.href;
              }
            });
          }
        })
        .catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Producto no se pudo eliminar",
                text: "El producto a eliminar tiene reservas activas",
                confirmButtonText: "OK",
              })
          console.log(error);
        });

    }



    return (
        <div>
            <button onClick={() => {deleteProduct(id)} } className={styles[deleteBtn]}><FaTrashAlt/></button>
        </div>
    )
}

export default DeleteButton