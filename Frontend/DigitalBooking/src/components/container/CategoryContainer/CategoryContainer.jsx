import { useState, useEffect } from "react";
import dataCategorias from "../../../staticData/categoria.json";
import { CategoryCard } from "../../pure/CategoryCard/CategoryCard";
import styles from ".//categoryContainer.module.css";
import axios from "axios";

const CategoryContainer = () => {
  const [dataCategoria, setDataCategoria] = useState([]);

  useEffect(() => {
    const url = "http://3.20.188.10/categorias";
    axios
      .get(url)
      .then(function (response) {
        setDataCategoria(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Buscar por tipo de alojamiento</h3>
      <section className={styles.sectionMain}>
        {dataCategoria.map((data) => {
          return (
            <CategoryCard
              key={data.id}
              id={data.id}
              img={data.imagen.urlImagen}
              name={data.titulo}
              number={data.descripcion}
            ></CategoryCard>
          );
        })}
      </section>
    </div>
  );
};

export default CategoryContainer;
