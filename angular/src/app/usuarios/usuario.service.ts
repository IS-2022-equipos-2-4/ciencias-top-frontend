import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './usuario';
import { UsuarioDto } from './usuario.dto';

import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

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

  public getUsuario(id: string): Observable<Usuario> {
    const usuario = this.httpClient.get<Usuario>(`${this.urlEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlc0FkbWluIjp0cnVlLCJ1c2VyX25hbWUiOiI0MTcwMzQwNTIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiY29ycmVvIjoibWlhbm9yc2lAY2llbmNpYXMudW5hbS5teCIsIm51bUluc3RpdHVjaW9uYWwiOiI0MTcwMzQwNTIiLCJpZCI6MSwiZXhwIjoxNjY4NzUyMTgxLCJub21icmUiOiJNaWd1ZWwgw4FuZ2VsIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiIsIlJPTEVfUFJPVklERVIiXSwianRpIjoiYWRmMzc0ZTYtZGE0Yi00YjgzLWFhZTMtZjY0NzFkNmY0ZjIwIiwiY2xpZW50X2lkIjoiYW5ndWxhcmFwcCIsImVzUHJvdmVlZG9yIjp0cnVlfQ.qUBp_dZop9-bvrbUHWtWM_WotUnmczZWRfiF1FPNIZmbA559PuR4K_soVsQztGZNPPcO1Kzz8VLIo6eHkGs0_GWf5exkiuEunpra7T7mm29rGKogxtjkOB65OakeqAUuBXMSFMaIebNZys_uJBo9XM4ij49pm6pSqI4Ji1OVg2GnOpI4ijdWP74hCl4oYWRTYdOw1T6lz4_gYqhhbwb3CObCC9JNds2zgiQxn_bh4uGKWfE6tlEmwQY4h9Xdo3lGCIj4-PrLFdzUGMf5FMpc-2CScW6dy82A76nvCHR3pENI42SI49TV2c4MsuqCKUOtCmwCxKmQtmUzSj4h7c1ayg`,
      },
    });

    return usuario;
  }

  public editarUsuario(
    usuario_id: number,
    usuario: UsuarioDto
  ): Observable<Usuario> {
    // hacer la llamada al endpoint para editar usuario con patch
    console.log(usuario)
    return this.httpClient.post<Usuario>(
      `${this.urlEndpoint}/${usuario_id}`,
      usuario,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlc0FkbWluIjp0cnVlLCJ1c2VyX25hbWUiOiI0MTcwMzQwNTIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiY29ycmVvIjoibWlhbm9yc2lAY2llbmNpYXMudW5hbS5teCIsIm51bUluc3RpdHVjaW9uYWwiOiI0MTcwMzQwNTIiLCJpZCI6MSwiZXhwIjoxNjY4NzUyMTgxLCJub21icmUiOiJNaWd1ZWwgw4FuZ2VsIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiIsIlJPTEVfUFJPVklERVIiXSwianRpIjoiYWRmMzc0ZTYtZGE0Yi00YjgzLWFhZTMtZjY0NzFkNmY0ZjIwIiwiY2xpZW50X2lkIjoiYW5ndWxhcmFwcCIsImVzUHJvdmVlZG9yIjp0cnVlfQ.qUBp_dZop9-bvrbUHWtWM_WotUnmczZWRfiF1FPNIZmbA559PuR4K_soVsQztGZNPPcO1Kzz8VLIo6eHkGs0_GWf5exkiuEunpra7T7mm29rGKogxtjkOB65OakeqAUuBXMSFMaIebNZys_uJBo9XM4ij49pm6pSqI4Ji1OVg2GnOpI4ijdWP74hCl4oYWRTYdOw1T6lz4_gYqhhbwb3CObCC9JNds2zgiQxn_bh4uGKWfE6tlEmwQY4h9Xdo3lGCIj4-PrLFdzUGMf5FMpc-2CScW6dy82A76nvCHR3pENI42SI49TV2c4MsuqCKUOtCmwCxKmQtmUzSj4h7c1ayg`,
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
