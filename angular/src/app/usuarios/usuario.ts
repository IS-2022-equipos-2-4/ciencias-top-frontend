export class Usuario {
  id: number;
  nombre: string;
  correo: string;
  contrasena?: string;
  numInstitucional?: string;
  carrera?: string;
  telefono: string;
  activo?: boolean;
  esProveedor: boolean =false;
  esAdmin: boolean = false;
  pumapuntos: number;
}
