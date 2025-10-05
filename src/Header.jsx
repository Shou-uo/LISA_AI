// src/Header.jsx (USANDO ICONO Header.png Y TEXTO BIOS.png)

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
    fontSize: '1.1em',
  };

  const headerContainerStyle = {
    backgroundColor: 'transparent',
    padding: '20px',
    display: 'flex',
    // Separa el logo (izquierda) de la navegación (derecha)
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };

  const navBarStyle = {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'flex-end', 
    width: '100%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
  };

  const logoGroupStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  // Estilo para la imagen del texto "B.I.O.S."
  const biosTextLogoStyle = {
      height: '35px', // Ajusta esta altura si el texto no se alinea con el icono
      marginLeft: '10px', 
  };

  return (
    <>
      <header style={headerContainerStyle}>

        {/* GRUPO DE LOGO (IZQUIERDA) */}
        <div style={logoGroupStyle}>

          {/* 1. IMAGEN DEL ICONO DEL LOGO */}
          <img
            src="/Header.png" // 💡 RUTA DEL ICONO CORREGIDA
            alt="B.I.O.S. Icono"
            style={{ height: '50px' }} 
          />

          {/* 2. IMAGEN DEL TEXTO B.I.O.S. */}
          <img
            src="/BIOS.png" // 💡 RUTA DEL TEXTO CORREGIDA
            alt="B.I.O.S. Texto"
            style={biosTextLogoStyle} 
          />
        </div>

        {/* Espacio vacío para que justifyContent: 'space-between' funcione */}
        <div /> 
      </header>

      {/* BARRA DE NAVEGACIÓN INFERIOR (Enlaces Alineados a la Derecha) */}
      <div style={navBarStyle}>
        <nav>
          <Link to="/" style={linkStyle}>Chat</Link>
          <Link to="/faq" style={linkStyle}>FAQ</Link>
          <Link to="/about" style={linkStyle}>Sobre Nosotros</Link>
        </nav>
      </div>
    </>
  );
}

export default Header;