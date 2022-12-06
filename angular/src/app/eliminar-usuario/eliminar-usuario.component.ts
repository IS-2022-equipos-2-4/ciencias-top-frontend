import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EliminarUsuarioService } from './eliminar-usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  idUsuario: number;

  constructor(
    private eliminarUsuarioSVC: EliminarUsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getId();
  }

  public getId(): void {
    this.activateRoute.params.subscribe((params) => {
      this.idUsuario = params['id'];
    });
  }

}
