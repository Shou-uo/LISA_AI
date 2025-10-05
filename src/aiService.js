// src/aiService.js

/**
 * Simula la respuesta de la IA sin depender de una API.
 * @param {string} userQuestion - La pregunta del usuario.
 * @returns {string} La respuesta simulada de la IA.
 */
export const getAIResponseSimulated = (userQuestion) => {
    // Esta es tu lógica de simulación inmutable y aislada.
    const response = `Analizando: "${userQuestion}". La vida en Marte presenta retos fascinantes: la baja gravedad afecta la densidad ósea y muscular, la radiación solar es intensa sin un campo magnético protector.`;
    return response;
};

export const getAIResponseGroq = async (userQuestion) => {
    const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY; 

    if (!GROQ_API_KEY) {
        throw new Error("Clave de API de Groq no configurada. Usa la versión simulada.");
    }

    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'; 
    const systemPrompt = "Eres B.I.O.S., un experto en biología espacial y ciencia de la NASA. Responde de forma concisa, profesional, y citando la base científica relevante.";

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}` 
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", 
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuestion }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error(data.error?.message || 'Respuesta de API inválida.');
    }
};