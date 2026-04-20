// data/interfaces/servicio.interface.ts
export interface Servicio {
  id?: number; // El ID suele venir del back
  title: string;
  desc: string;
  price: number;
  img: string;
  categoria?: string;
  duracion?: number; // Ejemplo: 60 min
}