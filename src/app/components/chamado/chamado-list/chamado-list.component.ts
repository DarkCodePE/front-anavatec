import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import {ProductCreateComponent} from "../../product/modal/product-create/product-create.component";
import {MatDialog} from "@angular/material/dialog";
import {TicketSolutionComponent} from "../ticket-solution/ticket-solution.component";

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  numeroBaixo: Number = 0;

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'DataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
      

      let counter = 0;
      for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
        if (this.ELEMENT_DATA[i].prioridade == '1') counter++;
      }
      

      console.log(counter);

    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status) list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  OpenModal() {
    this.dialog.open(TicketSolutionComponent, {
      panelClass: 'custom-modalbox',
      width: '700px',
      height: 'auto',
      maxHeight: '88vh',
    }).afterClosed()
        .subscribe((result?: boolean) => {
          if (result===true) {
            console.log(result)
          }
        });
  }

}
