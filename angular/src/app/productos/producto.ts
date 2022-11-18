import { Usuario } from '../usuarios/usuario';

export class Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  costo: number;
  stock: number;
  limitePrestamo: number;
  proveedor: Usuario;
}
