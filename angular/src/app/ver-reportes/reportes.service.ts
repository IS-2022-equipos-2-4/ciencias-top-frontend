import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Usuario } from "../usuarios/usuario";

export class ReportesService {
    private readonly urlEndpoint = 'http://localhost:8080/api/';
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

    public getUsuariosCarrera(): Observable<Usuario[]>{
        return this.httpClient.get<Usuario[]>(
            this.urlEndpoint + "/usuarios/carrera",{
                headers : this.authorizationHeaders
            });
    }
    
}