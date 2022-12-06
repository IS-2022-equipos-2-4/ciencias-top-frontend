import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EliminarUsuarioService {
  private readonly urlEndpoint:string = 'http://localhost:8080/api/usuarios/eliminar';
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private authorizationHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.authService.token}`,
  });

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService) {}

  deactivateUser(idUsuario: number,requester_ID: number): Observable<number>{
    return this.httpClient.post<number>(
      this.urlEndpoint + '/' + idUsuario + '+' + requester_ID, {},
      {
        headers: this.authorizationHeaders
      });
  }
}
