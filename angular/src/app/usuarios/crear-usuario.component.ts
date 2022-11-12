import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}
}
