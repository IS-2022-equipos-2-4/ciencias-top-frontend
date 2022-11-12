import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faEdit,
  faEye,
  faSquare,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];

  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faXMark = faXmark;
  faSquare = faSquare;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }
}
