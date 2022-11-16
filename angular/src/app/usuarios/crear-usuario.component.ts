import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  titulo: string = "Añadir usuario";
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}
  
  nombre : String = "juan";
  public crear():void{
    console.log(this.usuario);
  }
}
