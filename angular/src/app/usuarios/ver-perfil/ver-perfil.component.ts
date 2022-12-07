import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { PumapuntosService } from '../../puma-puntos/puma-puntos.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  
  usuario:Usuario;
  pumapuntos: number;

  constructor(private readonly usuarioService: UsuarioService, 
    private readonly pumaService: PumapuntosService) { }

  ngOnInit(): void {

    this.usuarioService
      .getUsuario(insitucional => {
        insitucional = this.usuario.numInstitucional;
      })

      .subscribe((usuario) => {
        this.usuario = usuario;

        this.usuario.pumapuntos = this.pumaService
            .getPumapuntos(usuario.id)
            //.subscribe((pumapuntos) => (usuario.pumapuntos = pumapuntos));
        
      })
  }

}
