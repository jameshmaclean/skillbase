
import { UserContext } from '../contexts/userContext'
import RotasPublicas from './rotasPublicas'
import { useContext, useEffect } from 'react'
import RotasPrivadas from './rotasPrivadas'


function Rotas() {
    const { user } = useContext(UserContext)
    useEffect(() => {
      console.log("USER ROTAS", user);
    }, [])
    
    return (
        <>
            {user == null ? <RotasPublicas /> : <RotasPrivadas/>}
        </>
    )
}

export default Rotas