import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'; // <--- AÑADIDO
import { fileURLToPath } from 'url'; // <--- AÑADIDO

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;


app.post("/api/query", async (req, res) => {
  // ... (Tu lógica de API de Groq, que es correcta) ...
  try {
    const { prompt } = req.body;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Eres Lisa, una experta en biología espacial de la NASA que trabaja para la agencia B.I.O.S. Tienes PROHIBIDO usar cualquier otro nombre, como Alexei. Es CRÍTICO que SIEMPRE comiences tu respuesta diciendo: 'Hola. Soy Lisa, la experta de B.I.O.S, responde de manera respetuosa y cordial; ya que sacas tus datasets de la NASA.'." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error de Groq:", data.error);
      res.status(500).json({ error: data.error.message || "Error al consultar el modelo" });
      return;
    }

    const respuesta = data.choices[0]?.message?.content || "No se pudo generar una respuesta.";
    res.json({ result: respuesta });

  } catch (error) {
    console.error("Error al consultar el modelo:", error);
    res.status(500).json({ error: "Error al procesar la consulta." });
  }
});


// --- CÓDIGO CLAVE PARA RESOLVER EADDRINUSE y CANNOT GET / ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Servir los archivos estáticos de la carpeta 'dist' (Frontend Build)
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Ruta de reserva para que el routing de React funcione
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- FIN DEL BLOQUE CLAVE ---


const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor NASA Bio-AI escuchando en el puerto ${PORT}`);
});