import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import {Product} from "../../../models/Product";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {
  products : Product[] = [];
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
    isSolution: false,
    solution:false,
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])
  productId : FormControl = new FormControl(null, [Validators.required])
  constructor(
      private service: ProductService,
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
      private toastService: ToastrService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.findAll();
  }
  findAll(): void {
    this.service.findAll().subscribe(resp => {
      this.products = resp;
    })
  }
  create(): void {
    this.chamadoService.create(this.chamado).subscribe({
      next: () => {
        this.toastService.success('Ticket creada exitosamente', 'Nuevo Ticket');
        this.router.navigate(['chamados']);
      },
    error: (e) => {
      this.toastService.error(e.error.error);
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
        this.productId.valid &&
           this.status.valid     &&
           this.titulo.valid     &&
           this.observacoes.valid  &&
           this.tecnico.valid    &&
           this.cliente.valid    
  }

}
