import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Historial } from './historial';
import { HistorialService } from './historial.service';

@Component({
  selector: 'app-histo-prod-rent',
  templateUrl: './histo-prod-rent.component.html',
  styleUrls: ['./histo-prod-rent.component.css']
})
export class HistoProdRentComponent implements OnInit {

  historial: Historial[];
  estado: string;

  constructor(
    private histoSvc: HistorialService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.histoSvc.getHistProdRent().subscribe(
      (historial) => (this.historial = historial)
    );
  }

  tieneAcceso(h: Historial): string {
    if(h.devuelto != true){
      return "Aun no se ha devuelto";
    } else {
      return "Devuelto";
    }
  }

  devueltoTrue(h: Historial): boolean {
    return h.devuelto;
  }
  
  devueltoFalse(h: Historial): boolean {
    return !h.devuelto;
  }
}
