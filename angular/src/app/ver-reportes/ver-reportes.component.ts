import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosMes } from './productosMes';
import { UsuariosPorCarrera } from './usuariosPorCarrera';
import { UsuariosRentasSemana } from './usuariosRentasSemana';
import { VerReportesService } from './ver-reportes.service';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements OnInit {
  productosMes: ProductosMes[];
  usuariosPorCarrera: UsuariosPorCarrera[];
  usuariosRentasSemana: UsuariosRentasSemana[];
  
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly verReportesService: VerReportesService) {}

    ngOnInit(): void {    
      this.verReportesService
        .getProductosMes()
        .subscribe((productosMes) => {
          this.productosMes = productosMes;
        })

      this.verReportesService
        .getUsuariosPorCarrera()
        .subscribe((usuariosCarrera) => {
          this.usuariosPorCarrera = usuariosCarrera;
        })

      this.verReportesService
        .getUsuariosRentasSemanal()
        .subscribe((usuariosRentasSemana) => {
          this.usuariosRentasSemana = usuariosRentasSemana;
        })
    }
}
