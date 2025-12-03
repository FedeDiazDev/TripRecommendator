import { GoogleGenAI } from "@google/genai";
import { Type } from '@google/genai';
import { Request, Response } from 'express';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = "gemini-2.5-flash";


const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    destinos: {
      type: Type.ARRAY,
      description: "Una lista de 3 a 4 ciudades o destinos que cumplen con la descripción del usuario.",
      items: {
        type: Type.OBJECT,
        properties: {
          nombre: {
            type: Type.STRING,
            description: "El nombre de la ciudad o destino sugerido."
          },
          latitud: {
            type: Type.NUMBER,
            description: "La coordenada de latitud central de la ciudad (en grados decimales)."
          },
          longitud: {
            type: Type.NUMBER,
            description: "La coordenada de longitud central de la ciudad (en grados decimales)."
          },
          descripcion: {
            type: Type.STRING,
            description: "Una breve descripción de 1-2 frases sobre la ciudad y por qué fue seleccionada."
          },
          notaFinal: {
            type: Type.NUMBER,
            description: "Una puntuación del 1 al 10 que indica qué tan bien el destino cumple con la solicitud del usuario."
          },
        },
        required: ["nombre", "latitud", "longitud", "descripcion"],
      },
    },
  },
  required: ["destinos"],
};


export async function generateRecommendations(req: Request, res: Response) {
  const userPrompt: string = req.body.prompt;

  if (!userPrompt) {
    return res.status(400).json({ success: false, error: "El campo 'prompt' es obligatorio." });
  }

  try {
    const systemInstruction = `
# ROL
Eres un experto asesor de viajes con amplio conocimiento en destinos turísticos mundiales, geografía, cultura y experiencias de viaje.

# OBJETIVO
Analizar la solicitud del usuario y recomendar los 3-4 destinos que mejor se ajusten a sus preferencias, intereses y necesidades de viaje.

# INSTRUCCIONES
1. **Análisis**: Interpreta cuidadosamente la descripción del usuario, identificando:
   - Tipo de viaje (aventura, relax, cultural, gastronómico, etc.)
   - Preferencias climáticas o estacionales
   - Presupuesto implícito
   - Duración estimada del viaje
   - Restricciones o requisitos especiales

2. **Selección de destinos**: Elige destinos que:
   - Cumplan directamente con los criterios del usuario
   - Sean diversos entre sí (no recomendar ciudades muy similares)
   - Sean accesibles y seguros para turistas
   - Ofrezcan experiencias memorables

3. **Coordenadas**: Proporciona las coordenadas geográficas EXACTAS (latitud y longitud en grados decimales) del centro de cada ciudad o punto de interés principal.

4. **Puntuación**: Evalúa cada destino del 1 al 10 según qué tan bien cumple con la solicitud específica del usuario.

# FORMATO DE RESPUESTA
- Responde ÚNICAMENTE con un objeto JSON válido
- NO incluyas texto explicativo, comentarios, Markdown ni caracteres fuera del JSON
- Sigue estrictamente el esquema proporcionado

# CALIDAD
- Sé preciso con los datos geográficos
- Escribe descripciones concisas pero informativas (1-2 oraciones)
- Prioriza destinos que realmente destaquen para el tipo de viaje solicitado
`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: recommendationSchema,
      },
    });
    if (!response.text) {
      return res.status(500).json({
        success: false,
        error:
          "La IA no devolvió texto. Intenta nuevamente o revisa la configuración.",
      });
    }
    const jsonText = response.text.trim();


    const recommendations = JSON.parse(jsonText);


    return res.json({ success: true, data: recommendations });

  } catch (error) {
    console.error("Error al generar o parsear las recomendaciones:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud de la IA.",
      detalleTecnico: error instanceof Error ? error.message : "Error desconocido."
    });
  }
}