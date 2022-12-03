import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { catchError, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Producto } from './producto';
import { ProductoDto } from './producto.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly urlEndpoint = 'http://localhost:8080/api/productos';
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

  public getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.urlEndpoint, {
      headers: this.authorizationHeaders,
    });
  }

  public getProducto(id: string): Observable<Producto> {
    const producto = this.httpClient.get<Producto>(`${this.urlEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });

    return producto;
  }

  public buscar_nombre(busqueda: string): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(
      `${this.urlEndpoint}/nombre/${busqueda}`,
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  public buscar_codigo(busqueda: string): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(
      `${this.urlEndpoint}/codigo/${busqueda}`,
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  public crearProducto(producto: Producto): Observable<Producto> {
    return this.httpClient
      .post<Producto>(
        `${this.urlEndpoint}/${this.authService.getId()}`,
        producto,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .pipe(
        catchError((e) => {
          swal.fire(e.error.status, e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }

  public editarProducto(
    producto_id: number,
    producto: ProductoDto
  ): Observable<Producto> {
    console.log(producto);
    return this.httpClient.post<Producto>(
      `${this.urlEndpoint}/editar/${producto_id}`,
      producto,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }

  public tieneAcceso(producto: Producto): boolean {
    return (
      this.authService.esAdmin() ||
      this.authService.usuario.id == producto.proveedor.id
    );
  }

  public puedeCrear(): boolean {
    return this.authService.esAdmin() || this.authService.esProveedor();
  }

  public estaAutenticado(): boolean {
    return this.authService.isAuthenticated();
  }
}
