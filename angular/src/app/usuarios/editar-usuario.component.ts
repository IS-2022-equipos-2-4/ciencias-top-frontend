import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}
}
