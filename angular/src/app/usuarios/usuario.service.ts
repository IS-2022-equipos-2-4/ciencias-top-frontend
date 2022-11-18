import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './usuario';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly urlEndpoint = 'http://localhost:8080/api/usuarios';
  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlEndpoint);
  }

  /**
   * Metodo que busca usuarios en la base de datos por medio de un criterio y algo que buscar.
   * @param criterio por que vamos a buscar (correo, nombre, numero, etc.)
   * @param busquedaEnCriterio el texto que queremos verificar con el criterio dado
   * @returns la lista de usuarios que cumplan con la busqueda con un criterio dado.
   */
  public buscar(criterio: string, busquedaEnCriterio: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(
      this.urlEndpoint + '/' + criterio + '/' + busquedaEnCriterio
    );
  }
  
  public crear(usuario: Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.urlEndpoint, usuario,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire('Error al crear el usuario', e.error.mensaje, 'error');
        return throwError( () => e);
      })
    )
  }

}
