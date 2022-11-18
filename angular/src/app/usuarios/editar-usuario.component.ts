import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './usuario';
import { UsuarioDto } from './usuario.dto';

import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  public cargarUsuario(): void {
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.usuarioService
          .getUsuario(id)
          .subscribe((usuario) => (this.usuario = usuario));
      }
    });
  }

  public editar(): void {
    const usuarioDto = new UsuarioDto();

    usuarioDto.nombre = this.usuario.nombre;
    usuarioDto.correo = this.usuario.correo;
    usuarioDto.telefono = this.usuario.telefono;
    usuarioDto.esProveedor = this.usuario.esProveedor;
    usuarioDto.esAdmin = this.usuario.esAdmin;

    console.log(usuarioDto);

    this.usuarioService
      .editarUsuario(this.usuario.id, usuarioDto)
      .subscribe((response) => this.router.navigate['/usuarios']);
  }
}
