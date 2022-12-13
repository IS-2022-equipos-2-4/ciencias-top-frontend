import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nuevaContrasena: string;
  confirmacionContrasena: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }

  public limpiar(){
    this.nuevaContrasena = this.confirmacionContrasena = undefined
  }

  /**
   * modificarContrasena
   */
  public modificarContrasena() {

    if (this.nuevaContrasena == undefined || 
      this.confirmacionContrasena == undefined) {
      Swal.fire("Error","No ingresaste la nueva contraseña",'error')

    } else {
      const valid = this.nuevaContrasena == this.confirmacionContrasena;

      if (valid){
        this.usuarioService
        .cambiarContrasena(this.nuevaContrasena)
        .subscribe(() => {
          // cerramos sesión
          this.usuarioService.authService.logout();
  
          // redirigimos a la pantalla de iniciar sesion
          this.router.navigate(['/login']);
      });

      } else
        Swal.fire("Error","Las contraseñas no coinciden",'error')
    }
    this.limpiar();
  }

}
