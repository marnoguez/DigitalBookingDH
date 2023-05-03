import  React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './listImages.module.css'


export default function StandardImageList({img}) {

    return (
        <div>
            <ImageList sx={{ width: 1200, height: "auto"}} cols={3} gap={10} >
                {img?.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            className={styles.imageList}
                            style={{borderRadius: "5%"}}
                            src={`${item.urlImagen}`}
                            alt="imagenes del hotel"
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}