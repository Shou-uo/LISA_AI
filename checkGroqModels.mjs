import fetch from "node-fetch";

const GROQ_API_KEY = process.env.GROQ_API_KEY; // ⚠️ no pongas la clave acá hardcodeada

if (!GROQ_API_KEY) {
  console.error("❌ Falta la variable de entorno GROQ_API_KEY");
  process.exit(1);
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/models";

(async () => {
  try {
    const res = await fetch(GROQ_API_URL, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
    });

    const data = await res.json();
    console.log("✅ Modelos disponibles en tu cuenta Groq:");
    console.log(data);
  } catch (err) {
    console.error("Error al consultar Groq:", err);
  }
})();
