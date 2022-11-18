import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from './puma-puntos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './sumar-puma-puntos.component.html',
  styleUrls: ['./sumar-puma-puntos.component.css'],
})
export class SumarPumaPuntosComponent implements OnInit {

  pumapuntos = 0;

  constructor(
    private usuarioService: UsuarioService,     
    private router: Router
    ) {}

  ngOnInit(): void {}


  public update(): void {
    this.usuarioService.update(this.pumapuntos).subscribe(
      Response => this.router.navigate(['/api/pumapuntos'])
    )
  }

  public sumar(): void {
    console.log(this.pumapuntos);
  }

  public restar(): void {
    console.log(this.pumapuntos);
  }
}
