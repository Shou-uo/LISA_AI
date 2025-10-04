import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("🚀 Servidor NASA Bio-AI activo!");
});

app.post("/api/query", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Sos un experto en biología espacial de la NASA." },
        { role: "user", content: prompt }
      ]
    });

    const respuesta = completion.choices[0].message.content;
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
