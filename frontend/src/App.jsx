import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

//import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import NavBar from './NavBar'
import Analytics from './Analytics'
import About from './About';


function App() {

  return (
    <>
    <BrowserRouter>
   <Routes>
   <Route path="/" element={<Register/>}></Route>
   <Route path='/About' element={<About/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/NavBar' element={<NavBar/>}></Route>
    <Route path="/analytics" element={<Analytics />}
     />


   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
