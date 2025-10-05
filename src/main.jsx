// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa los componentes de tu aplicación
import HeaderBIOS from './HeaderBIOS.jsx';
import ChatBIOS from './ChatBIOS.jsx';
import AboutUs from './AboutUs.jsx';
// Importa los estilos de Tailwind
import './index.css';

// 1. EL COMPONENTE APP: Contiene el Header y las Rutas
function App() {
  return (
    <BrowserRouter>
      {/* 💡 El Header va fuera de <Routes> para que se muestre siempre */}
      <HeaderBIOS /> 

      <Routes>
        {/* Ruta principal: Muestra el chat de LISA */}
        <Route path="/" element={<ChatBIOS />} />

        {/* Ruta secundaria: Muestra el diseño AboutUs de Anima */}
        <Route path="/about" element={<AboutUs />} />

        {/* Puedes añadir más rutas aquí, como /faq */}
      </Routes>
    </BrowserRouter>
  );
}

// 2. MONTAJE: Renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
