export interface SeguimientoAdmin {
  id: string;
  cliente: string;
  servicio: string;
  fechaRegistro: string;
  fechaCita: string;
  horaCita: string;
  especialista: string;
  estado: 'Pendiente' | 'Completado' | 'Cancelado' | 'Inhabilitado';
}