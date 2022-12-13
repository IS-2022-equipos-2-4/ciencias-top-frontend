import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { faListUl } from '@fortawesome/free-solid-svg-icons';
import {
    faCheck,
    faDollar,
    faEdit,
    faSquare,
    faTrashAlt,
    faXmark,
    faListUl,
  } from '@fortawesome/free-solid-svg-icons';

//import { listUl } from '@fortawesome/fa-solid fa-list-ul';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { PumapuntosService } from '../../puma-puntos/puma-puntos.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  
  usuario :Usuario;
  pumapuntos: number;

  nuevaContrasena: string;
  confirmacionContrasena: string;

  @ViewChild('btnCerrar') btnCerrar : ElementRef;

  faListUl=faListUl;
  faCheck=faCheck;
  faDollar=faDollar;
  faEdit=faEdit;
  faSquare=faSquare;
  faTrashAlt=faTrashAlt;
  faXmark=faXmark;


  constructor(private readonly authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService, 
    private readonly pumaService: PumapuntosService) { }

  ngOnInit(): void {

    const id=this.authService.getId();

    this.usuarioService.getPerfil()
        .subscribe((usuario) => {
         
        this.usuario =usuario;
        
        this.pumaService.getPumapuntos(usuario.id).
        subscribe((pumapuntos) => (usuario.pumapuntos=pumapuntos))
        
      });
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
          this.btnCerrar.nativeElement.click();
      });

      } else
        Swal.fire("Error","Las contraseñas no coinciden",'error')
    }
    this.limpiar();
  }
}
