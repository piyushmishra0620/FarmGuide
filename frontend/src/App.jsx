import './App.css'
import { Signup } from './pages/signup'
import {Login} from './pages/login'
import {Home} from './pages/home'
import {Bot} from './pages/bot'
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' replace />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Chat' element={<Bot/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
