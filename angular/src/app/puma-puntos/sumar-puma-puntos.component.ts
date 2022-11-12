import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './puma-puntos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './sumar-puma-puntos.component.html',
  styleUrls: ['./sumar-puma-puntos.component.css'],
})
export class SumarPumaPuntosComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}
}
