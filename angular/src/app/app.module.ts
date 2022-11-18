import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrearProductosComponent } from './productos/crear-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { SumarPumaPuntosComponent } from './puma-puntos/sumar-puma-puntos.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SumarPumaPuntosComponent } from './puma-puntos/sumar-puma-puntos.component';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/crear', component: CrearUsuarioComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },
  {
    path: 'usuarios/sumar-pumapuntos/:id',
    component: SumarPumaPuntosComponent,
  },

  { path: 'productos', component: ProductosComponent },
  { path: 'productos/crear', component: CrearProductosComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrearProductosComponent,
    SumarPumaPuntosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
