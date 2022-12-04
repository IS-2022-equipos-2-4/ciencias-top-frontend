import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faEdit,
  faShoppingCart,
  faSquare,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  seleccion: string;
  busqueda: string;

  faShoppingCart = faShoppingCart;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faXMark = faXmark;
  faSquare = faSquare;

  constructor(
    private readonly productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((productos) => (this.productos = productos));
  }

  buscar(): void {
    if (!this.seleccion || this.seleccion == 'undefined') {
      alert(
        'No escogiste ningun parametro de busqueda. Te mostrare todos los Productos'
      );
    }
    if (!this.busqueda) {
      alert(
        'No escribiste ninguna cadena para busqueda. Te mostrare todos los Productos'
      );
    }
    if (this.seleccion && this.busqueda) {
      switch (this.seleccion) {
        case 'nombre':
          this.productoService
            .buscar_nombre(this.busqueda)
            .subscribe((productos) => (this.productos = productos));
          break;
        case 'codigo':
          this.productoService
            .buscar_codigo(this.busqueda)
            .subscribe((productos) => (this.productos = productos));
          break;
      }
    } else {
      this.productoService
        .getProductos()
        .subscribe((productos) => (this.productos = productos));
    }
  }

  tieneAcceso(producto: Producto): boolean {
    return this.productoService.tieneAcceso(producto);
  }

  puedeCrear(): boolean {
    return this.productoService.puedeCrear();
  }

  estaAutenticado(): boolean {
    return this.productoService.estaAutenticado();
  }

  rentar(producto: Producto): void {
    this.productoService.rentar(producto).subscribe((ejemplar) => {
      this.ngOnInit();
      swal.fire(
        'Producto rentado',
        `Has rentado el ejemplar ${ejemplar.idEjemplar}`,
        'success'
      );
    });
  }
}
