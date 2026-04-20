export interface GestionCliente {
  id: string;
  Nombre: string;
  Apellido: string;
  TipoDocumento: string;
  NDocumento: string;
  correo: string;
  celular: string;
  Estado: 'Habilitado' | 'Inhabilitado';
}