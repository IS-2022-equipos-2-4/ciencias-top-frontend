import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faDollar,
  faEdit,
  faSquare,
  faTrashAlt,
  faXmark,
  faListUl,
} from '@fortawesome/free-solid-svg-icons';


import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { PumapuntosService } from '../puma-puntos/puma-puntos.service';

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
  faListUl = faListUl;

  constructor(private readonly usuarioService: UsuarioService, 
    private readonly pumaService: PumapuntosService) {}

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
   * Hace una busqueda en la base de datos para desplegar a los usuarios que correspondan a un criterio, incluso si no hay nadie que lo cumpla.
   * En caso de que uno o ambos valores de busqueda esten vacios, regresa la lista de todos los usuarios.
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
}
