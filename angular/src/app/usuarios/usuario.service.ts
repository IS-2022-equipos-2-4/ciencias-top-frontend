import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly urlEndpoint = 'http://localhost:8080/api/usuarios';

  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}

  public getUsuarios(): Observable<Usuario[]> {
    const httpHeaders = new HttpHeaders({
      'Authorization':  `Bearer ${this.authService.token}`
    });

    return this.httpClient.get<Usuario[]>(this.urlEndpoint, {
      headers: httpHeaders,
    });
  }

  /**
   * Metodo que busca usuarios en la base de datos por medio de un criterio y algo que buscar.
   * @param criterio por que vamos a buscar (correo, nombre, numero, etc.)
   * @param busquedaEnCriterio el texto que queremos verificar con el criterio dado
   * @returns la lista de usuarios que cumplan con la busqueda con un criterio dado.
   */
  public buscar(
    criterio: string,
    busquedaEnCriterio: string
  ): Observable<Usuario[]> {
    const httpHeaders = new HttpHeaders({
      'Authorization':  `Bearer ${this.authService.token}`
    });

    return this.httpClient.get<Usuario[]>(
      `${this.urlEndpoint}/${criterio}/${busquedaEnCriterio}`,
      {
        headers: httpHeaders,
      }
    );
  }

  public crear(usuario: Usuario): Observable<Usuario> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${this.authService.token}`
    });

    console.log(httpHeaders)
    return this.httpClient
      .post<Usuario>(this.urlEndpoint, usuario, { headers: httpHeaders })
      .pipe(
        catchError((e) => {
          Swal.fire('Error al crear el usuario', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }
}
