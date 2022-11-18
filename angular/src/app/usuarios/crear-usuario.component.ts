import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLadderWater } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  titulo: string = "Añadir usuario";
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}
  

  public crear():void{
    this.usuarioService.crear(this.usuario).subscribe(usurio =>
      {
        this.router.navigate(['/usuarios'])
        swal.fire('Nuevo Usuario', `Usuario ${this.usuario.numInstitucional} creado con éxito`, 'success')
      }
    )
  }
}
