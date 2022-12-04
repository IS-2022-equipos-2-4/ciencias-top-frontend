import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historial } from './historial';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private authorizationHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.authService.token}`,
  });
  private urlEndpoint:string = 'http://localhost:8080/api/productos/productos-rentados';
  
  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) { }

    

  getHistProdRent(): Observable<Historial[]>{
    return this.http.get<Historial[]>(this.urlEndpoint, 
      {
        headers: this.authorizationHeaders,
      }
    );
  }
}
