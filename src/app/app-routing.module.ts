import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/tecnico-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChartComponent } from './components/charts/chart/chart.component';
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {SolutionComponent} from "./components/solution/solution.component";
import {SolutionGridComponent} from "./components/solution/solution-grid/solution-grid.component";
import {SolutionDetailComponent} from "./components/solution/solution-detail/solution-detail.component";
import {CategoryComponent} from "./components/product/category/category.component";
import {PerfilComponent} from "./components/home/perfil/perfil.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: '', component: NavComponent, canActivate: [AuthGuard] , children: [
    { path: 'home', component: HomeComponent},
    { path: 'tecnicos', component: TecnicoListComponent},
    { path: 'tecnicos/create', component: TecnicoCreateComponent},
    { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
    { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent},

    { path: 'home', component: HomeComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'clientes', component: ClienteListComponent},
    { path: 'clientes/create', component: ClienteCreateComponent},
    { path: 'clientes/update/:id', component: ClienteUpdateComponent},
    { path: 'clientes/delete/:id', component: ClienteDeleteComponent},

    { path: 'chamados', component: ChamadoListComponent},
    { path: 'chamados/create', component: ChamadoCreateComponent},
    { path: 'chamados/update/:id', component: ChamadoUpdateComponent},
    { path: 'product', component: ProductListComponent},
    { path: 'category', component: CategoryComponent},

    {path: 'graficos', component: ChartComponent},
    {path: 'soluciones', component: SolutionComponent},
    { path: 'soluciones/producto/:id', component: SolutionGridComponent },

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
