import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import {filter, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SolutionFormStore} from "../../../store/solutionForm.store";
import {TicketSolutionComponent} from "../ticket-solution/ticket-solution.component";

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {
  private createSolutionLoading: boolean;

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
    productId: 0,
    solution:false,
    isSolution: false
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private solutionFormStore: SolutionFormStore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (resposta) => {
        console.log(resposta)
        this.chamado = resposta;
      },
      error: (ex) => {
        this.toastService.error(ex.error.error);
      }
    })
  }

  onDeleteFile() {

  }
  update(): void {
    this.createSolutionLoading = true;
      this.createSolutionLoading = false;
      this.chamadoService.update(this.chamado).subscribe({
        next: () => {
          this.toastService.success('Ticket actualizado exitosamente', 'Actualizar ticket');
          this.router.navigate(['chamados']);
        },
        error: (erro) => {
          this.toastService.error(erro.error.error);
        }
      })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    }) 
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
           this.status.valid     &&
           this.titulo.valid     &&
           this.observacoes.valid  &&
           this.tecnico.valid    &&
           this.cliente.valid    
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABIERTO'
    }
    else if(status == '1') {
      return 'EN PROCESO'
    } else {
      return 'CERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAJA'
    }
    else if(prioridade == '1') {
      return 'MEDIA'
    } else {
      return 'ALTA'
    }
  }

  OpenModal() {
    this.dialog.open(TicketSolutionComponent, {
      panelClass: 'custom-modalbox',
      width: 'auto',
      height: 'auto',
      maxHeight: '88vh',
      data:{
        ticketId: this.chamado.id
      }
    }).afterClosed()
        .subscribe((result?: boolean) => {
          if (result===true) {
            console.log(result)
          }
        });
  }

  submitSolution() {

  }

}
