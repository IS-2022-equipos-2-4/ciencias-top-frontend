import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/crear', component: UsuariosComponent },
  { path: 'usuarios/actualizar/:id', component: UsuariosComponent },
  { path: 'usuarios/actualizar/pumapuntos/:id', component: UsuariosComponent },
  { path: 'productos', component: ProductosComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
