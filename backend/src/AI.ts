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
    const systemInstruction = `Eres un asistente experto en viajes y turismo. Tu única tarea es ofrecer las 3 mejores recomendaciones de lugares para visitar basándote en la descripción del usuario. **Para cada lugar, DEBES buscar y proporcionar las coordenadas exactas de latitud y longitud.** Debes responder SIEMPRE en formato JSON, siguiendo estrictamente el esquema proporcionado. No añadas texto explicativo, Markdown, o cualquier otro carácter fuera del bloque JSON.`;

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