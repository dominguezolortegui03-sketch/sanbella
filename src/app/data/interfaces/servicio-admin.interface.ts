export interface ServicioAdmin {
  id: number;
  nombre: string;
  categoria: string;
  tiempo: string;
  precio: string;
  estado: 'Habilitado' | 'Inhabilitado';
}