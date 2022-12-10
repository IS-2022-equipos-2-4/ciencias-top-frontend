import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faEdit,
  faShoppingCart,
  faSquare,
  faTrashAlt,
  faXmark,
  faRepeat,
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
  faRepeat = faRepeat;

  constructor(
    private readonly productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe(
        (productos) => (this.productos = productos.sort((a, b) => a.id - b.id))
      );
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

  esAdmin(): boolean {
    return this.authService.esAdmin();
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
  eliminarProducto(idProducto : any):void{
    swal.fire({
      title: '¿Estas seguro?',
      text: `No podras deshacer este cambio`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar Producto'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(idProducto).subscribe((ejemplar) => {
          this.productos = this.productos.filter(prod => prod != idProducto);
        swal.fire(
          `Producto ${ejemplar.idProducto} eliminado$ `,
          'Exito'
        )
        })
      } 
    })
  }
}
