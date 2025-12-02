import { Recomendacion } from "../types/Recomendacion";


export async function generateRecommendations(prompt: string): Promise<Recomendacion []> {
  const endpointUrl = 'http://localhost:9000/api/recommendations'; 
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Respuesta de la IA vacía o con error.');
    }

    const recommendations: Recomendacion [] = result.data;

    
    return recommendations;

  } catch (error) {
    console.error("Error al obtener o procesar las recomendaciones:", error);
    throw error;
  }
}