import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports para forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// imports Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteDeleteComponent } from './components/cliente/tecnico-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChartComponent } from './components/charts/chart/chart.component';
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import { ProductCreateComponent } from './components/product/modal/product-create/product-create.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionCardComponent } from './components/solution/solution-card/solution-card.component';
import { SolutionDetailComponent } from './components/solution/solution-detail/solution-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SolutionListComponent } from './components/solution/solution-list/solution-list.component';
import { SolutionGridComponent } from './components/solution/solution-grid/solution-grid.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { TicketSolutionComponent } from './components/chamado/ticket-solution/ticket-solution.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { MetricsComponent } from './components/home/metrics/metrics.component';
import { GantComponent } from './components/home/gant/gant.component';
import { CategoryComponent } from './components/product/category/category.component';
import { CategoryActionsComponent } from './components/product/modal/category-actions/category-actions.component';
import { PerfilComponent } from './components/home/perfil/perfil.component';
import {NamInitPipe} from "./pipes/NamInitPipe.pipe";
import { PerfilCreateComponent } from './components/home/modal/perfil-create/perfil-create.component';
import {DndDirective} from "./directives/DndDirective.directive";
import {ProgressComponent} from "./components/util/progress/progress.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteCreateComponent,
    ClienteListComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChartComponent,
    ProductListComponent,
    ProductCreateComponent,
    SolutionComponent,
    SolutionCardComponent,
    SolutionDetailComponent,
    LoaderComponent,
    SolutionListComponent,
    SolutionGridComponent,
    TicketSolutionComponent,
    MetricsComponent,
    GantComponent,
    CategoryComponent,
    CategoryActionsComponent,
    PerfilComponent,
    NamInitPipe,
    PerfilCreateComponent,
    DndDirective,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatTooltipModule,
    NgApexchartsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
