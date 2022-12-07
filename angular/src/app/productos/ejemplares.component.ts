import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faRepeat, faXmark } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

import { AuthService } from '../auth/auth.service';
import { EjemplarDto } from './ejemplar.dto';
import { Producto } from './producto';

import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './ejemplares.component.html',
  styleUrls: ['./ejemplares.component.css'],
})
export class EjemplaresComponent implements OnInit {
  idProducto: number;
  producto: Producto = new Producto();
  ejemplares: EjemplarDto[];

  faCheck = faCheck;
  faXMark = faXmark;
  faRepeat = faRepeat;

  constructor(
    private readonly productoService: ProductoService,
    public authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.idProducto = Number(params['id']);
    });

    this.productoService
      .getProductos()
      .subscribe(
        (productos) =>
          (this.producto = productos.find(
            (producto) => (producto.id = this.idProducto)
          ))
      );

    this.productoService
      .getEjemplares(this.idProducto)
      .subscribe(
        (ejemplares) =>
          (this.ejemplares = ejemplares
            .filter((ejemplar) => ejemplar.rentado)
            .sort((a, b) => a.idEjemplar - b.idEjemplar))
      );
  }

  devolver(idEjemplar: number): void {
    this.productoService
      .devolverEjemplar(idEjemplar)
      .subscribe(({ devolucionTardia }) => {
        this.ngOnInit();
        swal.fire(
          'Ejemplar devuelto',
          `Se ha devuelto el ejemplar ${idEjemplar} ${
            devolucionTardia ? 'tarde' : 'a tiempo'
          }`,
          'success'
        );
      });
  }
}
