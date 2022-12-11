import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { ProductosMes } from './productosMes';
import { UsuariosPorCarrera } from './usuariosPorCarrera';
import { UsuariosRentasSemana } from './usuariosRentasSemana';

@Injectable({
  providedIn: 'root',
})
export class VerReportesService {
  private readonly urlEndpointUsuarios = 'http://localhost:8080/api/usuarios';
  private readonly urlEndpointProductos = 'http://localhost:8080/api/productos';
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private authorizationHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.authService.token}`,
  });

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  /**
   * Metodo que despliega una tabla para saber cuales productos han sido los mas rentados en el mes.
   * @returns la lista de los productos mas rentados del mes.
   */
  public getProductosMes(): Observable<ProductosMes[]> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get<ProductosMes[]>(
      `${this.urlEndpointProductos}/top`,
      {
        headers: httpHeaders,
      }
    );
  }

  /**
   * Metodo que despliega una tabla para saber la cantidad de usuarios activos por carrera.
   * @returns la lista de usuarios activos en cada carrera.
   */
   public getUsuariosPorCarrera(): Observable<UsuariosPorCarrera[]> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get<UsuariosPorCarrera[]>(
      `${this.urlEndpointUsuarios}/carrera`,
      {
        headers: httpHeaders,
      }
    );
  }

  /**
   * Metodo que despliega una tabla para saber que usuarios tienen la mayor cantidad de rentas en la semana.
   * @returns la lista de usuarios con mas rentas en la semana.
   */
   public getUsuariosRentasSemanal(): Observable<UsuariosRentasSemana[]> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get<UsuariosRentasSemana[]>(
      `${this.urlEndpointUsuarios}/rentas`,
      {
        headers: httpHeaders,
      }
    );
  }
}