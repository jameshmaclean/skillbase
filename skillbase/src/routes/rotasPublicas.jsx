import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Cadastro from '../pages/cadastro'
function RotasPublicas() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastrar' element={<Cadastro />} />
                <Route path="*" element={<h1 style={{color:"black"}}>404 - Page Not Found!</h1>} />
            </Routes>
        </>
    )
}

export default RotasPublicas