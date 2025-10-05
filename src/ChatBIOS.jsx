// src/ChatBIOS.jsx (VERSIÓN FINAL Y SIN ERRORES)

import React, { useState, useRef, useEffect } from "react";

// Constantes de la API
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const LLAMACLOUD_API_URL = "https://api.cloud.llamaindex.ai/api/v1/pipelines/ce8bb0e6-efd7-4a0d-80e3-7b1a88386d63/retrieve"; // <--- Tu URL de la imagen
const LLAMACLOUD_API_KEY = import.meta.env.VITE_LLAMACLOUD_API_KEY
// Función para recuperar fragmentos de texto relevantes del índice de LlamaCloud
async function retrieveContextFromLlamaCloud(query) {
    // ... CÓDIGO PROPORCIONADO PREVIAMENTE ...
    // (Asegúrate de copiar aquí el fetch con LLAMACLOUD_API_URL y LLAMACLOUD_API_KEY)
    try {
        const response = await fetch(LLAMACLOUD_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LLAMACLOUD_API_KEY}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                top_k: 5
            }),
        });

        const data = await response.json();

        // ... (lógica para mapear y unir los nodos) ...
        const contextNodes = data.nodes || [];
        const contextText = contextNodes
            .map(node => node.text || node.node?.text)
            .filter(Boolean)
            .join('\n\n---\n\n');

        return contextText;

    } catch (error) {
        console.error("Error al recuperar contexto de LlamaCloud:", error);
        return null;
    }
  // Función principal que combina RAG (LlamaCloud) con Generación (Groq)
  async function getRagResponse(userQuery) {
      // ---------------------------------------------
      // 1. PASO RAG: RECUPERACIÓN (LlamaCloud)
      // ---------------------------------------------
      const context = await retrieveContextFromLlamaCloud(userQuery);

      if (!context) {
          // ... (Manejo de caso sin contexto) ...
          return "Lo siento, no pude encontrar información relevante sobre ese tema en nuestra base de datos de Biología Espacial.";
      }

      // ---------------------------------------------
      // 2. CONSTRUCCIÓN DEL PROMPT Y GENERACIÓN (Groq)
      // ---------------------------------------------
      // ... (Lógica para construir systemInstruction y userPrompt con el contexto) ...
      const systemInstruction = `Eres un asistente de Biología Espacial experto. Responde a la pregunta del usuario SÓLO basándote en el CONTEXTO proporcionado a continuación. Si la respuesta no está en el contexto, indica que no tienes esa información.`;
      const userPrompt = `CONTEXTO:\n---\n${context}\n---\n\nPREGUNTA DEL USUARIO: ${userQuery}`;

      const groqMessages = [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
      ];

      // ... (Llamada a la API de Groq) ...
      try {
          const groqResponse = await fetch(GROQ_API_URL, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${GROQ_API_KEY}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  model: 'llama-3.1-8b-instant', 
                  messages: groqMessages, // <--- ¡AQUÍ ESTÁ EL CAMBIO CLAVE!
                  temperature: 0.1, 
              }),
          });

          const data = await groqResponse.json();
          return data.choices[0].message.content;

      } catch (error) {
          // ... (Manejo de errores de Groq) ...
          console.error("Error al llamar a la API de Groq:", error);
          return "Lo siento, ocurrió un error en el servidor al generar la respuesta.";
      }
    function ChatBIOS() {
      // Definir la constante aquí para usarla, por ejemplo, en un useState
      const initialMessages = [ 
        {
          sender: "AI",
          text: "¡Hola! Soy Lisa, la experta de B.I.O.S., ¿en qué te puedo ayudar hoy?",
        },
      ];
  {
    sender: "AI",
    text; "¡Hola! Soy Lisa, la experta de B.I.O.S., ¿en qué te puedo ayudar hoy?",
      },
];

function ChatBIOS() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = 0;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Bloqueo de seguridad. Si esto sigue saltando, la variable no se está inyectando.
    if (!GROQ_API_KEY) {
      alert(
        "¡ERROR CRÍTICO! La clave 'VITE_GROQ_API_KEY' NO está configurada. Verifica Replit Secrets y REINICIA el Replit.",
      );
      return;
    }

    const userQuestion = input.trim();
    const newUserMessage = { sender: "User", text: userQuestion };

    // 1. Añadir el mensaje del usuario y un placeholder de 'cargando...'
    setMessages((prevMessages) => [
      { sender: "AI", text: "Buscando datos... (loading)" },
      newUserMessage,
      ...prevMessages,
    ]);
    setInput("");

    // 2. Definir el PROMPT y el SISTEMA para guiar a la IA
    const systemPrompt =
      "Eres Lisa, una IA experta en biología espacial y ciencia de la NASA. Responde de forma concisa, profesional, y citando la base científica relevante.";

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuestion }
        ],
        temperature: 0.7,
      })
 })
        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
          const aiResponseText = data.choices[0].message.content.trim();
          const newAIMessage = { sender: "AI", text: aiResponseText };

          setMessages(prevMessages => {
            const cleanMessages = prevMessages.filter(msg => msg.text !== 'Buscando datos... (loading)');
            return [newAIMessage, ...cleanMessages];
          });
        } else {
          const errorMessage = data.error ? `Error de Groq: ${data.error.message}` : 'Respuesta de API inválida.';
          throw new Error(errorMessage);
        }
      }
     catch (error) {
      console.error("Error al conectar con la API de Groq:", error);
      // Actualizar el placeholder con un mensaje de error
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.text === "Buscando datos... (loading)"
            ? {
                sender: "AI",
                text: `Error: No se pudo conectar con B.I.O.S. (${error.message || "Ver consola"})`,
              }
            : msg,
        ),
      );
    }
  };

  // ESTILOS Y COMPONENTES VISUALES
  const getMessageStyle = (sender) => ({
    backgroundColor: sender === "User" ? "#00ccff" : "#2c2c2c",
    color: sender === "User" ? "black" : "white",
    padding: "12px 18px",
    borderRadius: "20px",
    maxWidth: "85%",
    lineHeight: "1.4",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    borderTopRightRadius: sender === "User" ? "5px" : "20px",
    borderTopLeftRadius: sender === "User" ? "20px" : "5px",
  });

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#1a1a1a",
    color: "white",
    boxSizing: "border-box",
    marginRight: "10px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#00ccff",
    color: "black",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    // AJUSTE DE MARGEN: Mueve el chat 80px hacia abajo para no chocar con el Header fijo
    <div className="chat-container" style={{ marginTop: "80px" }}>
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              marginBottom: "10px",
              justifyContent: msg.sender === "User" ? "flex-end" : "flex-start",
            }}
          >
            <div style={getMessageStyle(msg.sender)}>
              <strong style={{ display: "block", marginBottom: "5px" }}>
                {msg.sender === "AI" ? "B.I.O.S." : "Tú"}
              </strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input" style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
  
