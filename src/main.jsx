// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatBIOS from './ChatBIOS.jsx' // Asegúrate que la ruta sea correcta
import './index.css' // Importa los estilos globales (incluido el fondo negro)

// 💡 CLAVE: Busca el elemento con ID 'root' y lo renderiza.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatBIOS />
  </React.StrictMode>,
)