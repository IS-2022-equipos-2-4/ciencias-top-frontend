// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from '../auth/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class PumapuntosService {
//   private readonly urlEndpoint:string = 'http://localhost:8080/api/pumapuntos';
//   private readonly httpHeaders = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });
//   private authorizationHeaders = new HttpHeaders({
//     Authorization: `Bearer ${this.authService.token}`,
//   });

//   constructor(
//     private httpClient: HttpClient,
//     public authService: AuthService) {}

//   getPumapuntos(idUsuario: number):Observable<number>{
//     return this.httpClient.get<number>(this.urlEndpoint + '/' + idUsuario,
//     {
//       headers: this.authorizationHeaders
//     });
//   }

//   update(pumapuntos: number, idUsuario: number): Observable<number>{
//     return this.httpClient.post<number>(
//       this.urlEndpoint + '/' + idUsuario + '/sumar/' + pumapuntos, {},
//       {
//         headers: this.authorizationHeaders
//       });
//   }
// }
