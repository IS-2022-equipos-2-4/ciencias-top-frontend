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

  public eliminar(id:number):void{       
    let time_wait = 5000;
    swal.fire({
      toast:true,
      title: "¿Deseas eliminar este producto",
      icon: "warning",      
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#ff0055",
      cancelButtonColor: "#999999",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
      timer: time_wait,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    }).then((result) => {
      if (result.isConfirmed){        
        this.eliminarProducto(id);
      } 
    });
  }

  /**
   * Recibe un ID de un producto para eliminarlo
   * @param idUsuario ID del producto a eliminar
   */
  private eliminarProducto(idProducto:number): void {     
    this.productoService.eliminarProducto(idProducto).subscribe(
      (response) => {
        swal.fire(
          '¡Producto eliminado!',
          `El producto con ID ${idProducto} se ha eliminado`,
          'success' 
        ).then(() => {
          window.location.reload();
        });
        
      },
      (err) => {
        swal.fire(`Error ${err.status}`, err.error.message, 'error')
      }
    )
  }


  
}
