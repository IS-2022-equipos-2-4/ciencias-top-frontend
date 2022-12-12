import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-usuarios',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  
  usuario :Usuario;
  pumapuntos: number;

  faListUl=faListUl;
  faCheck=faCheck;
  faDollar=faDollar;
  faEdit=faEdit;
  faSquare=faSquare;
  faTrashAlt=faTrashAlt;
  faXmark=faXmark;


  constructor(private readonly authService: AuthService, 
    private usuarioService: UsuarioService, 
    private readonly pumaService: PumapuntosService) { }

  ngOnInit(): void {

    const id=this.authService.getId();

    this.usuarioService.getPerfil()
        .subscribe((usuario) => {
         
        this.usuario =usuario;
        
        this.pumaService.getPumapuntos(usuario.id).
        subscribe((pumapuntos) => (usuario.pumapuntos=pumapuntos))
        /*this.usuario.forEach(u => {
          this.pumaService
          .getPumapuntos(u.id)
          .subscribe((pumapuntos) => (u.pumapuntos = pumapuntos))
        })*/
        
            //.subscribe((pumapuntos) => (usuario.pumapuntos = pumapuntos));
        
      });
    }



}
