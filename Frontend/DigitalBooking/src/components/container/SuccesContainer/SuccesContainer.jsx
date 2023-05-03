import React from 'react'
import SuccesAlert from '../../utils/SuccesAlert/SuccesAlert'

const SuccesContainer = () => {
    return (
        <div>
            <SuccesAlert 
                title="¡Muchas Gracias!"
                texto="Su reserva se ha realizado con éxito."
                paragraph="En unos minutos le llegará los datos de la reserva al mail"
            />
        </div>
    )
}

export default SuccesContainer