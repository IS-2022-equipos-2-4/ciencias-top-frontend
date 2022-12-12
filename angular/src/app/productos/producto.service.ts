import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { catchError, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Ejemplar } from './ejemplar';
import { EjemplarDto } from './ejemplar.dto';
import { Producto } from './producto';
import { ProductoDto } from './producto.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly urlEndpoint = 'http://localhost:8080/api/productos';

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  public getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.urlEndpoint, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });
  }

  public getProducto(id: string): Observable<Producto> {
    const producto = this.httpClient.get<Producto>(
      `${this.urlEndpoint}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );

    return producto;
  }

  public buscar_nombre(busqueda: string): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(
      `${this.urlEndpoint}/nombre/${busqueda}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
  }

  public buscar_codigo(busqueda: string): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(
      `${this.urlEndpoint}/codigo/${busqueda}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
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

  public rentar(producto: Producto): Observable<Ejemplar> {
    return this.httpClient
      .post<Ejemplar>(`${this.urlEndpoint}/${producto.id}/rentar`, undefined, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .pipe(
        catchError((e) => {
          e = e.error?.status && e.error?.message ? e.error : e;
          swal.fire(String(e.status), e.message, 'error');
          return throwError(() => e);
        })
      );
  }

  public getEjemplares(idProducto: number): Observable<EjemplarDto[]> {
    return this.httpClient
      .get<EjemplarDto[]>(`${this.urlEndpoint}/${idProducto}/ejemplares`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .pipe(
        catchError((e) => {
          e = e.error?.status && e.error?.message ? e.error : e;
          swal.fire(String(e.status), e.message, 'error');
          return throwError(() => e);
        })
      );
  }

  public devolverEjemplar(idEjemplar: number): Observable<any> {
    return this.httpClient
      .post<EjemplarDto[]>(
        `${this.urlEndpoint}/ejemplares/${idEjemplar}/devolver`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .pipe(
        catchError((e) => {
          e = e.error?.status && e.error?.message ? e.error : e;
          swal.fire(String(e.status), e.message, 'error');
          return throwError(() => e);
        })
      );
  }
  public eliminarProducto(idProducto: number): Observable<any> {
    return this.httpClient
      .delete(`${this.urlEndpoint}/${idProducto}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`
        },
      }
      )
      .pipe(
        catchError((e) => {
          swal.fire(String(e.status), e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }
}
