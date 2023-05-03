import {useState,useEffect} from 'react';
import { Carousel } from 'react-carousel-minimal';
import  styles from '../Carrusel/carrusel.module.css'

function Carrusel({img}) {

    
    const [imagenDta, setImagenDta] = useState([])

    useEffect(() => {     
       
        if(img){
            const arr =  img?.map((item) =>{        
                return {image:item.urlImagen}
              })
            setImagenDta(arr)
        }      


    }, [img])     
   
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    return (
        <div className={styles.carrusel}>
            {
                imagenDta.length > 0 && <div style={{ textAlign: "center" }}>
                <div style={{
                    padding: "0 20px"
                }}>
                    <Carousel
                        data={imagenDta}
                        time={2000}
                        width="850px"
                        height="500px"
                        captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={true}
                        captionPosition="bottom"
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={false}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "850px",
                            maxHeight: "500px",
                            margin: "40px auto",
                        }}
                    />
                </div>
            </div> 
            }
        </div>
    );
}

export default Carrusel;