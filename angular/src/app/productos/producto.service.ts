import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Producto } from './producto';

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
    return this.httpClient.get<Producto[]>(this.urlEndpoint);
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

  public tieneAcceso(producto: Producto): boolean {
    return (
      this.authService.esAdmin() ||
      this.authService.usuario.id == producto.proveedor.id
    );
  }

  public puedeCrear(): boolean {
    return this.authService.esAdmin() || this.authService.esProveedor();
  }
}
