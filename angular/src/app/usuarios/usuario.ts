export class Usuario {
  id: number;
  nombre: string;
  correo: string;
  contraseña?: string;
  numInstitucional?: string;
  carrera?: string;
  telefono: string;
  activo?: boolean;
  esProveedor: boolean;
  esAdmin: boolean;
}
