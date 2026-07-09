import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
   <>
   <BrowserRouter>
       <Navbar/>
    <div className='container mt-4'>
       <Routes>
      <Route path="/" element = { <Home/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      <Route path="/signup" element = {<Signup/>}></Route>
   </Routes>
    </div>
   </BrowserRouter>
   </>
  )
}

export default App
