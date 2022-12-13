import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PumapuntosService {
  private readonly urlEndpoint:string = 'http://localhost:8080/api/pumapuntos';

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService) {}

  getPumapuntos(idUsuario: number):Observable<number>{
    return this.httpClient.get<number>(this.urlEndpoint + '/' + idUsuario,
    {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });
  }

  update(pumapuntos: number, idUsuario: number): Observable<number>{
    return this.httpClient.post<number>(
      this.urlEndpoint + '/' + idUsuario + '/sumar/' + pumapuntos, {},
      {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
  }
}
