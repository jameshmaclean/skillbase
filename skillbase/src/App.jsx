import './App.css'
import { BrowserRouter} from 'react-router-dom'
import { UserContextProvider } from './contexts/userContext'
import Header from './components/Header/Header'
import Rotas from './routes/rotas'

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          <Rotas />
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
