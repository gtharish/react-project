import React from 'react'
import './App.css'
import {Router,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";

function App() {
  return (
   <>
    <Navbar/>
    <Home/>
    {/* <Router>
    
   </Router> */}
   </>
  )
}

export default App
