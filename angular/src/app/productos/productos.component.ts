import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faShoppingCart,
  faEdit,
  faSquare,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[];

  faShoppingCart = faShoppingCart;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faXMark = faXmark;
  faSquare = faSquare;

  constructor(private readonly productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService
      .getProductos()
      .subscribe((productos) => (this.productos = productos));
  }
}
