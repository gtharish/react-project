import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import App from './App.jsx'
import NoteState from './context/noteState.jsx';


import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
 
    <NoteState>
    <App />
    <Analytics/>
    </NoteState>

)
