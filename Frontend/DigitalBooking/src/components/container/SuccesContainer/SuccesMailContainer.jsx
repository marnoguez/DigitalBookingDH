import React from 'react'
import SuccesAlert from '../../utils/SuccesAlert/SuccesAlert'

const SuccesMailContainer = (props) => {
    return (
        <div>
            <SuccesAlert
                title="¡Cuenta confirmada!"
                texto="Haga click en el siguiente link para ir al LogIn"
                aText="http://127.0.0.1:5173/Login"
                link="http://127.0.0.1:5173/Login"
            />
        </div>
    )
}

export default SuccesMailContainer