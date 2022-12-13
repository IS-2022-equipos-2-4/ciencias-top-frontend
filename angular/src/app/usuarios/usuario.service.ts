import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Usuario } from './usuario';
import { UsuarioDto } from './usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly urlEndpoint = 'http://localhost:8080/api/usuarios';
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

  public getUsuarios(): Observable<Usuario[]> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get<Usuario[]>(this.urlEndpoint, {
      headers: httpHeaders,
    });
  }

  public getUsuario(id: string): Observable<Usuario> {
    const usuario = this.httpClient.get<Usuario>(`${this.urlEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });

    return usuario;
  }

  public editarUsuario(
    usuario_id: number,
    usuario: UsuarioDto
  ): Observable<Usuario> {
    // hacer la llamada al endpoint para editar usuario con patch
    return this.httpClient.post<Usuario>(
      `${this.urlEndpoint}/${usuario_id}`,
      usuario,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.token}`,
        },
      }
    );
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
      Authorization: `Bearer ${this.authService.token}`,
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
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient
      .post<Usuario>(this.urlEndpoint, usuario, { headers: httpHeaders })
      .pipe(
        catchError((e) => {
          Swal.fire('Error al crear el usuario', e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }

  /**
   * Marca un usuario como inactivo
   * @param idUsuario ID del usuario a desactivar
   * @returns 
   */
  public deactivateUser(idUsuario: number): Observable<number>{
    return this.httpClient.post<number>(
      this.urlEndpoint + '/eliminar/' + idUsuario, {},
      {
        headers: this.authorizationHeaders
      });
  }

  /**
   * Regresa el saldo de puma puntos de un usuario
   * @param idUsuario ID del usuario a buscar
   * @returns 
   */
  public getPumapuntos(idUsuario: number):Observable<number>{
    const urlEndpoint = 'http://localhost:8080/api/pumapuntos';
    return this.httpClient.get<number>(
      urlEndpoint + '/' + idUsuario,
      {
        headers: this.authorizationHeaders
      });
  }

  /**
   * Actualiza los puma puntos de un usuario
   * @param idUsuario ID del usuario a editar
   * @returns 
   */
  public updatePP(pumapuntos: number, idUsuario: number): Observable<number>{
    const urlEndpoint = 'http://localhost:8080/api/pumapuntos';
    return this.httpClient.post<number>(
      urlEndpoint + '/' + idUsuario + '/sumar/' + pumapuntos, {},
      {
        headers: this.authorizationHeaders
      });
  }

  /**
   * Funcion que llama a la API para cambiar la contraseña
   * @param contrasena nueva contrasena
   * @returns any
   */
  public cambiarContrasena(contrasena: string): Observable<any>{
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`,
    });
    return this.httpClient.put( 
      this.urlEndpoint + '/cambiar-contrasena/' + contrasena,
      '',
      {
        headers : httpHeaders
      }).pipe(
        catchError((e) => {
          Swal.fire('Error al cambiar la contraseña', e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }
}
