import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login.component';
import { HeaderComponent } from './header/header.component';
import { CrearProductosComponent } from './productos/crear-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { EjemplaresComponent } from './productos/ejemplares.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HistoProdRentComponent } from './histo-prod-rent/histo-prod-rent.component';
import { EditarProductoComponent } from './productos/editar-producto.component';
import { VerReportesComponent } from './ver-reportes/ver-reportes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'usuarios/crear',
    component: CrearUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin'],
      redirectionRoute: '/login',
    },
  },  
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin', 'provider', 'user'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'productos/crear',
    component: CrearProductosComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin', 'provider'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'perfil/historial-rentas',
    component: HistoProdRentComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin', 'provider', 'user'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'productos/editar/:id',
    component: EditarProductoComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin', 'provider'],
      redirectionRoute: '/login',
    },
  },
  {
    path: 'productos/:id/ejemplares',
    component: EjemplaresComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['admin'],
      redirectionRoute: '/login',
    },
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    UsuariosComponent,
    CrearProductosComponent,
    LoginComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
    HistoProdRentComponent,
    EditarProductoComponent,
    EjemplaresComponent,
    VerReportesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
