import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

app.get("/", (req, res) => {
  res.send("🚀 Servidor NASA Bio-AI activo!");
});

app.post("/api/query", async (req, res) => {
  try {
    const { prompt } = req.body;

    const systemPrompt = "Sos un experto en biología espacial de la NASA.";
    const fullPrompt = `${systemPrompt}\n\nPregunta: ${prompt}\n\nRespuesta:`;

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      })
    });

    const responseText = await response.text();
    console.log("Respuesta de Hugging Face:", responseText);

    if (!response.ok) {
      console.error("Error HTTP:", response.status, responseText);
      res.status(500).json({ error: `Error del modelo: ${responseText}` });
      return;
    }

    const data = JSON.parse(responseText);
    
    if (data.error) {
      console.error("Error de Hugging Face:", data.error);
      res.status(500).json({ error: data.error });
      return;
    }

    const respuesta = data[0]?.generated_text || data.generated_text || "No se pudo generar una respuesta.";
    res.json({ result: respuesta });

  } catch (error) {
    console.error("Error al consultar el modelo:", error);
    res.status(500).json({ error: "Error al procesar la consulta." });
  }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor NASA Bio-AI escuchando en el puerto ${PORT}`);
});
