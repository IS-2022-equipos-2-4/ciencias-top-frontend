import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EliminarUsuarioService } from './eliminar-usuario.service';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  idUsuario: number;

  constructor(
    private eliminarUsuarioService: EliminarUsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getId();
  }

  public getId(): void {
    this.activateRoute.params.subscribe((params) => {
      this.idUsuario = params['id'];
    });
  }

  public confirmarEliminar(): void {
    // const options = {
    //   title: "¿Deseas eliminar al usuario?",
    //   type: "info",      
    //   showCancelButton: true,
    //   confirmButtonText: "Eliminar",
    //   confirmButtonColor: "#ff0055",
    //   cancelButtonColor: "#999999",
    //   reverseButtons: true,
    //   focusConfirm: false,
    //   focusCancel: true
    // } as SweetAlertOptions;
    //toDo: if click on confirmar    
    // this.eliminarUsuario();
    swal.fire({
      title: "¿Deseas eliminar al usuario?",
      icon: "warning",      
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#ff0055",
      cancelButtonColor: "#999999",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true
    });
      
  }
  
  // public confirmarEliminar(): void {
  //   //toDo: if click on confirmar    
  //   // this.eliminarUsuario();
  //   swal.fire({
  //     toast:true,
  //     title: "¿Deseas eliminar al usuario?",
  //     type: "info",      
  //     showCancelButton: true,
  //     confirmButtonText: "Eliminar",
  //     confirmButtonColor: "#ff0055",
  //     cancelButtonColor: "#999999",
  //     reverseButtons: true,
  //     focusConfirm: false,
  //     focusCancel: true,
  //     timer: 3000,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer)
  //       toast.addEventListener('mouseleave', Swal.resumeTimer)
  //     }
  //   }).then(function(isConfirm){
  //     if (isConfirm){
  //       this.eliminarUsuario();
  //     } else {
  //       swal("Cancelado", "No se ha eliminado ningún usuario");
  //     }
  //   });
  // }   

  public eliminarUsuario(): void {
    this.eliminarUsuarioService.deactivateUser(this.idUsuario).subscribe(
      (response) => {
        this.router.navigate(['/usuarios']);
        swal.fire(
          '¡Usuario Eliminado!',
          `El usuario con ID ${this.idUsuario} se ha eliminado`,
          'success' 
        );
      },
      (err) => {
        swal.fire(`Error ${err.status}`, err.error.message, 'error')
      }
    )
  }

}
