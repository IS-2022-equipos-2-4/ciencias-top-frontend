import { ItemProducto } from "../item-producto/item-producto";
import { Usuario } from "../usuarios/usuario";

export class Historial {
    idRenta: number;
    usuario : Usuario;
    itemProducto: ItemProducto;
    fechaRenta: string;
    fechaDevolucion: string;
    devuelto: boolean;
}
