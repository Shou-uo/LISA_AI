// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBIOS from './HeaderBIOS'; // Tu header con los botones de navegación
import ChatBIOS from './ChatBIOS';     // La página principal del chat
import AboutUs from './AboutUs';       // Tu página About Us
import FAQ from './FAQ';               // Tu página FAQ

function App() {
  return (
    <div className="min-h-screen bg-gray-900"> {/* Contenedor global con fondo */}

      <HeaderBIOS /> {/* El header va en todas las páginas */}

      {/* Define las áreas donde cambian las páginas (rutas) */}
      <main className="pt-[80px]"> {/* Deja espacio para el header fijo (80px) */}
        <Routes>
          <Route path="/" element={<ChatBIOS />} />      {/* Página principal */}
          <Route path="/about" element={<AboutUs />} />  {/* Ruta de About Us */}
          <Route path="/faq" element={<FAQ />} />        {/* Ruta de FAQ */}
          {/* Puedes agregar rutas para el login, el dashboard, etc. */}
        </Routes>
      </main>

    </div>
  );
}

export default App;