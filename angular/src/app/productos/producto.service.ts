import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly urlEndpoint = 'http://localhost:8080/api/productos';
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  public getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.urlEndpoint);
  }

  public crearProducto(producto: Producto): Observable<Producto>{
    return this.httpClient.post<Producto>(this.urlEndpoint,producto,{headers: this.httpHeaders});
  }
}
