import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../productos/producto';
import { Usuario } from '../usuarios/usuario';
import { ProductosMes } from './productosMes';
import { UsuarioDevolTardiasDTO } from './usuariosDevolTardias.dto';
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
   * Metodo que busca usuarios en la base de datos por medio de un criterio y algo que buscar.
   * @returns la lista de usuarios que cumplan con la busqueda con un criterio dado.
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
   * Metodo que busca usuarios en la base de datos por medio de un criterio y algo que buscar.
   * @returns la lista de usuarios que cumplan con la busqueda con un criterio dado.
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
   * Metodo que busca usuarios en la base de datos por medio de un criterio y algo que buscar.
   * @returns la lista de usuarios que cumplan con la busqueda con un criterio dado.
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

  /**
   * Metodo que realiza una llamada a la API para obtener los usuarios con
   * mas devoluciones tardias
   * @returns Usuarios con mas devoluciones tardías
   */
  public getUsuariosConMasDevolucionesTardias(): Observable<UsuarioDevolTardiasDTO[]>{
    return this.httpClient.get<UsuarioDevolTardiasDTO[]>(
      `${this.urlEndpointUsuarios}/reporte/devoluciones-tardias`,
      {
        headers: this.authorizationHeaders,
      });
  }

  /**
   * Metodo que realiza una llamada a la API para obtener la cantidad
   * de cuenta inactivas
   * @returns Cantidad de cuentas inactivas
   */
  public getNumInactivos(): Observable<number>{
    return this.httpClient.get<number>(
      `${this.urlEndpointUsuarios}/reporte/inactivos`,
      {
        headers: this.authorizationHeaders,
      });
  }

  /**
   * Metodo que realiza una llamada a la API para obtener 
   * los productos con menor costo
   * @returns Productos de menor costo
   */
  public getProductosMenorCosto(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(
      `${this.urlEndpointProductos}/reporte/menor-costo`,
      {
        headers: this.authorizationHeaders,
      }
    );
  }
}