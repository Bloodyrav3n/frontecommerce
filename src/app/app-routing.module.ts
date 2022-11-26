import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
    path: "inicio",
    component: InicioComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/inicio"
  },
  {
    path: "seguridad",
    loadChildren: () => import ("./modulos/seguridad/seguridad.module").then(x=>x.SeguridadModule)
  },
  {
    path: "administracion",
    loadChildren: () => import("./modulos/administracion/administracion.module").then(x=>x.AdministracionModule)
  },
  {
    path: "busqueda",
    loadChildren: ()=> import ("./modulos/busqueda/busqueda.module").then(x=>x.BusquedaModule)
  },
  {
    path:"compras",
    loadChildren:() => import ("./modulos/compras/compras.module").then(x=>x.ComprasModule)
  },
  { path: "**",
  component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
