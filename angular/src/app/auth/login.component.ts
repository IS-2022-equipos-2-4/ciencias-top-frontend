import { Component, OnInit } from '@angular/core';
import { Usuario } from './../usuarios/usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(public authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/productos']);
    }
  }

  login(){
      if(this.usuario.numInstitucional == null || this.usuario.contrasena == null){
        Swal.fire('Error Login', 'No. institucional o password vacías', 'error');
        return;
      }
      
      this.authService.login(this.usuario).subscribe(response => {

        this.authService.guardarUsuario(response.access_token);

        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;

        this.router.navigate(['/productos']);
        Swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión correctamente`, 'success');
      },
      err => {
        if(err.status == 400){
          Swal.fire('Error Login', 'No. institucional o clave incorrectas', 'error');
        }
      }
      );
  }

  logout(){
    this.authService.logout();
  }
}
