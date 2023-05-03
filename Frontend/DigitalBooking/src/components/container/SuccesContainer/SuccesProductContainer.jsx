import React from 'react'
import SuccesAlert from '../../utils/SuccesAlert/SuccesAlert'

const SuccesContainer = (props) => {
    return (
        <div>
            <SuccesAlert 
                title=""
                texto="La propiedad se ha creado con éxito."
                paragraph=""
            />
        </div>
    )
}

export default SuccesContainer