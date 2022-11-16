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

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  seleccion: string;
  busqueda: string;

  faDollar = faDollar;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faXMark = faXmark;
  faSquare = faSquare;

  constructor(private readonly usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  buscar(): void {
    if(!this.seleccion || this.seleccion=="undefined"){
      alert("No escogiste ningun parametro de busqueda. Te mostrare todos los Usuarios")
    }
    if(!this.busqueda){
      alert("No escribiste ninguna cadena para busqueda. Te mostrare todos los Usuarios")
    }
    if (this.seleccion && this.busqueda) {
      this.usuarioService
        .buscar(this.seleccion, this.busqueda)
        .subscribe((usuarios) => (this.usuarios = usuarios));
    } else {
      this.usuarioService
        .getUsuarios()
        .subscribe((usuarios) => (this.usuarios = usuarios));
    }
  }
}
