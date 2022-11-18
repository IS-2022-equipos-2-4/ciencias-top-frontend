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


  public update(tmp): void {
    this.usuarioService.update(tmp).subscribe(
      Response => this.router.navigate(['/usuarios'])
    )
  }

  public sumar(): void {
    this.update(this.pumapuntos);
  }

  public restar(): void {
    this.update(-1 * this.pumapuntos);
  }
}
