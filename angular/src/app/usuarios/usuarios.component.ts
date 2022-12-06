import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faDollar,
  faEdit,
  faSquare,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { PumapuntosService } from '../puma-puntos/puma-puntos.service';
import { EliminarUsuarioService } from '../eliminar-usuario/eliminar-usuario.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  busquedaEnCriterio: string;
  pumapuntos: number;

  criterio = 'nombre';
  faDollar = faDollar;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faXMark = faXmark;
  faSquare = faSquare;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly usuarioService: UsuarioService, 
    private readonly pumaService: PumapuntosService, 
    private readonly eliminarUsuarioSVC: EliminarUsuarioService) {}

  ngOnInit(): void {    
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => {
        this.usuarios = usuarios;

        this.usuarios.forEach(u => {
          this.pumaService
            .getPumapuntos(u.id)
            .subscribe((pumapuntos) => (u.pumapuntos = pumapuntos))
        });
      })
  }

  /**
   * Hace una búsqueda en la base de datos para desplegar a los usuarios que correspondan a un criterio, 
   * incluso si no hay nadie que lo cumpla.
   * En caso de que uno o ambos valores de búsqueda estén vacíos, regresa la lista de todos los usuarios.
   */
  buscar(): void {
    if (this.busquedaEnCriterio && this.criterio) {
      this.usuarioService
        .buscar(this.criterio, this.busquedaEnCriterio)
        .subscribe((usuarios) => (this.usuarios = usuarios));
    } else if (!this.busquedaEnCriterio) {
      this.usuarioService
        .getUsuarios()
        .subscribe((usuarios) => (this.usuarios = usuarios));
    }
  }

  public sumarPP(id:number, pp:number):void{

  }

  /**
   * Muestra en pantalla una ventana de confirmación al querer eliminar un usuario.
   * Opción seleccionada por defecto para cancelar.
   * Contador de 5 segundos 
   * @param id ID usuario a eliminar
   */
   public eliminar(id:number):void{       
    let time_wait = 5000;
    swal.fire({
      toast:true,
      title: "¿Deseas eliminar al usuario?",
      icon: "warning",      
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#ff0055",
      cancelButtonColor: "#999999",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
      timer: time_wait,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    }).then((result) => {
      if (result.isConfirmed){        
        this.eliminarUsuario(id);
      } 
    });
  }

  /**
   * Recibe un ID de un usuario para eliminarlo. 
   * Envía el ID del solicitante de la transacción.
   * @param idUsuario ID del usuario a eliminar
   */
  private eliminarUsuario(idUsuario:number): void { 
    let usrString = sessionStorage.getItem('usuario');
    let usrObj = JSON.parse(usrString);
    let requester_ID = usrObj.id;   
    this.eliminarUsuarioSVC.deactivateUser(idUsuario,requester_ID).subscribe(
      (response) => {
        this.router.navigate(['/usuarios']);
        swal.fire(
          '¡Usuario Eliminado!',
          `El usuario con ID ${idUsuario} se ha eliminado`,
          'success' 
        );
        setTimeout(function(){
          window.location.reload();
        }, 1500);
      },
      (err) => {
        swal.fire(`Error ${err.status}`, err.error.message, 'error')
      }
    )
  }

  
}



