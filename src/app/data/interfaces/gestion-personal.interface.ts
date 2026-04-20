export interface GestionPersonal {
  id: string;
  Nombre: string;
  Apellido: string;
  Rol: 'Estilista' | 'Recepcionista';
  TipoDocumento: string;
  NDocumento: string;
  correo: string;
  celular: string;
  Estado: 'Habilitado' | 'Inhabilitado';
  FechaRegistro: string;
}