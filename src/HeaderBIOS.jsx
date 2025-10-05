// src/HeaderBIOS.jsx (FINAL CON TAILWIND Y NAVEGACIÓN)

import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from "./assets/BIOSLOGOHIGHQUALITY.png";
function HeaderBIOS() {
    return (
        // PRUEBA DE FUEGO: Agregamos 'bg-red-700' para ver si Tailwind funciona
        <header className="fixed top-0 left-0 w-full h-[80px] z-[1000] bg-red-700 
                           border-b border-cyan-400 flex items-center justify-between px-5">

            <Link to="/">
                <img 
                    // CORRECCIÓN: Usa la variable 'logo' que importaste.
                    src={logo} 
                    alt="B.I.O.S. Logo High Quality" 
                    className="h-[40px] w-auto object-contain" 
                />
            </Link>
            {/* ... el resto del menú de navegación ... */}
        </header>
    );
}

export default HeaderBIOS;