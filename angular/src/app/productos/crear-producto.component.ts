import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';

import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductosComponent implements OnInit {
  
  //aqui comentamos titulo porque literal aunque en teoria si lo detecta para la vista sigue siendo texto y no variable 
  //titulo: string ="Agregar Producto"

  producto: Producto=new Producto()

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {}

  public crearProducto():void{
    this.productoService.crearProducto(this.producto).subscribe(producto =>
     {
      Response => this.router.navigate(['/productos']) 
      swal.fire('Producto agregado',`Producto ${this.producto.nombre} creado con exito`,'success');
    }
    )
  }
}
