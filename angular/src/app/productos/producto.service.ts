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

  public buscarPorNombre(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.urlEndpoint + "/");
  }

  public buscar_id(busqueda: string): Observable<Producto[]>{
    if( this.httpClient.get<Producto[]>(this.urlEndpoint + '/' + busqueda) ){
      alert("vacio")
    }
    console.log(typeof(this.httpClient.get<Producto[]>(this.urlEndpoint + '/' + busqueda)))
    let list: Array<object> = [ this.httpClient.get<Producto[]>(this.urlEndpoint + '/' + busqueda)];
    
    return this.httpClient.get<Producto[]>(this.urlEndpoint + '/' + busqueda);
  }

  public buscar_nombre(busqueda: string): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.urlEndpoint + "/nombre/" + busqueda);
  }

  public buscar_codigo(busqueda: string): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.urlEndpoint + "/codigo/" + busqueda);
  }
}
