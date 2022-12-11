import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { ReportesService } from './reportes.service';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements OnInit {
  private usuariosCarrera: Usuario[]

  constructor(
    private readonly reportesService: ReportesService) 
    { }

  ngOnInit(): void {
    this.reportesService.getUsuariosCarrera().subscribe(
      (usuariosCarrera) => {
        this.usuariosCarrera = usuariosCarrera
      });
  }

}
