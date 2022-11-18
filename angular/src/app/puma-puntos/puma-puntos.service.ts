import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly urlEndpoint:string = 'http://localhost:8080/api/pumapuntos/1/sumar/';
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getPumapuntos():Observable<number>{
    return this.httpClient.get<number>(this.urlEndpoint);
  }

  update(pumapuntos): Observable<number>{
    return this.httpClient.post<number>(this.urlEndpoint + pumapuntos,{headers: this.httpHeaders})
  }
}
