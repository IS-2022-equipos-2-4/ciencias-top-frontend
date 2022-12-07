import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from './producto';
import { ProductoDto } from './producto.dto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = new Producto();

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
  }

  public cargarProducto(): void {
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService
          .getProducto(id)
          .subscribe((producto) => (this.producto = producto));
      }
    });
  }

  public editar(): void {
    const productoDto = new ProductoDto();

    productoDto.codigo = this.producto.codigo;
    productoDto.nombre = this.producto.nombre;
    productoDto.descripcion = this.producto.descripcion;
    productoDto.costo = this.producto.costo;
    productoDto.stock = this.producto.stock;
    productoDto.limitePrestamo = this.producto.limitePrestamo;

    this.productoService.editarProducto(this.producto.id, productoDto).subscribe(
      (response) => {
        this.router.navigate(['/productos']);
        Swal.fire(
          'Producto editado',
          `Producto ${this.producto.nombre} editado con éxito`,
          'success'
        );
      },
      (err) => Swal.fire(`Error ${err.error.status}`, err.error.message, 'error')
    );
  }
}
