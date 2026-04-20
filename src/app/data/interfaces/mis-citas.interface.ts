export interface MisCitas {
  id: number;
  usuarioId?: number; // Importante para saber de quién es la cita
  status: 'pending' | 'completed' | 'cancelled';
  statusLabel: string;
  categoria: string;
  servicio: string;
  personal: string;
  fecha: string;
  tolerancia: number;
  tiempo: number;  // Duración en minutos
  precio: number;  // Costo del servicio
}