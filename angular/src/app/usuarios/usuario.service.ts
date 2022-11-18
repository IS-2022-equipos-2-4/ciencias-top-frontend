import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlEndpoint);
  }

  public getUsuario(id: string): Observable<Usuario> {
    const usuario = this.httpClient.get<Usuario>(`${this.urlEndpoint}/${id}`);

    return usuario;
  }

  public editarUsuario(usuario: UsuarioDto): Observable<Usuario> {
    // hacer la llamada al endpoint para editar usuario con patch
    return this.httpClient.patch<Usuario>(this.urlEndpoint, this.httpHeaders);
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
}
