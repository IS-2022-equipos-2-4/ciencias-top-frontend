import { Component, OnInit } from '@angular/core';

import { ProductoService } from './producto.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductosComponent implements OnInit {
  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {}
}
