/// src/ChatBIOS.jsx (VERSIÓN FINAL CON CONEXIÓN GROQ Y CORRECCIÓN DE DISEÑO)

import React, { useState, useRef, useEffect } from 'react';

// Constantes de la API
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'; 
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

// Mensajes iniciales
const initialMessages = [
  { sender: 'AI', text: '¡Hola! Soy Lisa, la experta de B.I.O.S., ¿en qué te puedo ayudar hoy?' },
];

function ChatBIOS() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = 0; 
    }
  }, [messages]);

  const handleSend = async () => { 
    if (input.trim() === '') return;

    if (!GROQ_API_KEY) {
        alert("¡ERROR CRÍTICO! La clave 'VITE_GROQ_API_KEY' NO está configurada en Replit Secrets. Por favor, configura y reinicia.");
        return;
    }

    const userQuestion = input.trim();
    const newUserMessage = { sender: 'User', text: userQuestion };

    // 1. Añadir el mensaje del usuario y un placeholder de 'cargando...'
    setMessages(prevMessages => [{ sender: 'AI', text: 'Buscando datos... (loading)' }, newUserMessage, ...prevMessages]);
    setInput('');

    const systemPrompt = "Eres LISA, IA de el grupo BIOS, una experta en biología espacial y ciencia de la NASA. Responde de forma concisa, profesional, y citando la base científica relevante si es posible.";

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}` 
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b", 
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuestion }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const aiResponseText = data.choices[0].message.content.trim();
        const newAIMessage = { sender: 'AI', text: aiResponseText };

        setMessages(prevMessages => {
            const cleanMessages = prevMessages.filter(msg => msg.text !== 'Buscando datos... (loading)');
            return [newAIMessage, ...cleanMessages];
        });

      } else {
        const errorMessage = data.error ? `Error de Groq: ${data.error.message}` : 'Respuesta de API inválida.';
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error("Error al conectar con la API de Groq:", error);
      setMessages(prevMessages => prevMessages.map(msg => 
          msg.text === 'Buscando datos... (loading)' ? { sender: 'AI', text: `Error: No se pudo conectar con B.I.O.S. (${error.message || 'Ver consola'})` } : msg
      ));
    }
  };

  // ESTILOS Y COMPONENTES VISUALES
  const getMessageStyle = (sender) => ({
    backgroundColor: sender === 'User' ? '#00ccff' : '#2c2c2c', 
    color: sender === 'User' ? 'black' : 'white', 
    padding: '12px 18px',
    borderRadius: '20px', 
    maxWidth: '85%',
    lineHeight: '1.4',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    borderTopRightRadius: sender === 'User' ? '5px' : '20px', 
    borderTopLeftRadius: sender === 'User' ? '20px' : '5px',
  });

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #555',
    backgroundColor: '#1a1a1a',
    color: 'white',
    boxSizing: 'border-box',
    marginRight: '10px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#00ccff', 
    color: 'black',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };


  return (
    // 💡 AÑADIDO: CORRECCIÓN DE DISEÑO para bajar el chat bajo el header fijo
    <div className="chat-container" style={{ marginTop: '80px' }}>
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div key={index} style={{ 
              width: '100%', 
              display: 'flex', 
              marginBottom: '10px',
              justifyContent: msg.sender === 'User' ? 'flex-end' : 'flex-start' 
            }}
          >
            <div style={getMessageStyle(msg.sender)}>
              <strong style={{ display: 'block', marginBottom: '5px' }}>
                {msg.sender === 'AI' ? 'B.I.O.S.' : 'Tú'}
              </strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input" style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Haz una pregunta a B.I.O.S. (ej: ¿Cultivos en el espacio?)"
          style={inputStyle}
        />
        <button onClick={handleSend} style={buttonStyle}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatBIOS;