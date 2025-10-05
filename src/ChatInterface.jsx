// src/ChatInterface.jsx (DISEÑO DEL WIDGET)

import React from 'react';

// Recibimos los nuevos props de estado y toggle
function ChatInterface({ consulta, setConsulta, enviarConsulta, respuestaIA, loading, isChatOpen, toggleChat }) {

  // -----------------------------------------------------
  // ESTILOS CLAVE PARA EL WIDGET FLOTANTE
  // -----------------------------------------------------
  const widgetContainerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    backgroundColor: 'white',
    // Animación de tamaño
    transition: 'width 0.3s ease, height 0.3s ease', 

    // Tamaños condicionales:
    width: isChatOpen ? '350px' : '60px', 
    height: isChatOpen ? '500px' : '60px',
    overflow: 'hidden', // Oculta el contenido cuando está cerrado
  };

  const chatContentStyle = {
    padding: '20px',
    display: isChatOpen ? 'block' : 'none',
  };

  const chatButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: isChatOpen ? '#aaa' : '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    position: 'absolute',
    bottom: 0,
    right: 0,
  };

  // -----------------------------------------------------
  // RENDERIZADO DEL WIDGET
  // -----------------------------------------------------

  return (
    <div style={widgetContainerStyle}>

      {/* Botón/Icono para Abrir/Cerrar */}
      <button onClick={toggleChat} style={chatButtonStyle}>
        {isChatOpen ? '✖' : '💬'} {/* Muestra X si está abierto, Chat si está cerrado */}
      </button>

      {/* Contenido Completo del Chat (SOLO visible si isChatOpen es true) */}
      <div style={chatContentStyle}>

        {/* Título y Presentación */}
        <h1>B.I.O.S. (Base de Información Orbital y Sintética)</h1>
        <p>Soy Lisa, la experta en Biología Espacial que trabaja para B.I.O.S. Pregúntame sobre exobiología, vida en Marte o las implicaciones de la microgravedad.</p>

        {/* Área de entrada */}
        <textarea
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Escribe tu consulta aquí..."
          rows="4"
          style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none', marginTop: '10px' }}
          disabled={loading}
        />

        {/* Botón de Enviar */}
        <button
          onClick={enviarConsulta}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#aaa' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: '10px'
          }}
        >
          {loading ? 'Analizando...' : 'Enviar Consulta'}
        </button>

        {/* Visualización de la respuesta (con scroll) */}
        <div className="respuesta-ia" style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
          <h3>Respuesta de Lisa:</h3>
          <p style={{ 
              whiteSpace: 'pre-wrap', 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '5px',
              maxHeight: '150px', // Altura reducida para el widget
              overflowY: 'auto',
              wordBreak: 'break-word',
              fontSize: '14px'
          }}>
            {respuestaIA}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;