import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { PumapuntosService} from './puma-puntos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './sumar-puma-puntos.component.html',
  styleUrls: ['./sumar-puma-puntos.component.css'],
})
export class SumarPumaPuntosComponent implements OnInit {

  pumapuntos = 0;
  idUsuario: number;

  constructor(
    private pumaService: PumapuntosService,     
    private router: Router,
    private activateRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getId();
  }


  public getId(): void {
    this.activateRoute.params.subscribe((params) => {
      this.idUsuario = params['id'];
    });
  }

  public sumar(): void {
    this.pumaService.update(this.pumapuntos,this.idUsuario).subscribe(
      (response) => {
        this.router.navigate(['/usuarios']);
        swal.fire(
          '¡Pumapuntos sumados!',
          `Se le han sumado ${this.pumapuntos} pumapuntos al usuario con ID ${this.idUsuario}!`,
          'success'
        );
      },
      (err) => swal.fire(`Error ${err.status}`, err.error.message, 'error')
    )
  }

  public restar(): void {
    this.pumaService.update(this.pumapuntos * -1,this.idUsuario).subscribe(
      (response) => {
        this.router.navigate(['/usuarios']);
        swal.fire(
          '¡Pumapuntos restados!',
          `Se le han restado ${this.pumapuntos} pumapuntos al usuario con id ${this.idUsuario}!`,
          'success'
        );
        
      },
      (err) => {
        swal.fire(`Error ${err.status}`, err.error.message, 'error')}
    )
  }
}
