export interface Recomendacion  {
  nombre: string;
  categoria: string;
  descripcionCorta: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  notaFinal?: number;
}