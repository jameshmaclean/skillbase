import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Cadastro from '../pages/cadastro'
import Home from '../pages/home'
function RotasPrivadas() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastrar' element={<Cadastro />} />
                <Route path='/inicio' element={<Home />} />
                <Route path="*" element={<h1>404 - Page Not Found!</h1>} />
            </Routes>
        </>
    )
}

export default RotasPrivadas