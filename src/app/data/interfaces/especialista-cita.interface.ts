export interface EspecialistaCita {
  id: number;
  cliente: string;      // Nombre del cliente para el especialista
  servicio: string;
  fecha: string;        // Fecha programada (YYYY-MM-DD)
  hora: string;         // Hora programada
  estado: 'Pendiente' |'En Proceso' | 'Finalizado'  ;
  statusLabel: string;  // 'Pendiente', 'En Proceso', 'Finalizado'
  fechaInicio?: string; // Seteado al dar "Iniciar"
  fechaFin?: string;    // Seteado al dar "Finalizar"
  evidencias?: string[]; // Array de imágenes en Base64
}