import React from 'react'

const SuccesMail = () => {
    return (
        <div>
            <div className={styles.succesCard}>
            <img className={styles.imgSucces} src="https://productosc3g5.s3.us-east-2.amazonaws.com/iconos/check.svg" alt="check" />
            <h1 className={styles.titleSucces}>{props.title}</h1>
            <h4 className={styles.textSucces}>{props.texto}</h4>
            <p className={styles.pSucces}>{props.paragraph}</p>
            <Link to="/"><button className={styles.btnSucces}>Ok</button></Link>
        </div>
        </div>
    )
}

export default SuccesMail