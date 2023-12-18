import {Component, Input, OnInit} from '@angular/core';
import {Chamado} from "../../../models/chamado";
import {Solution} from "../../../models/Product";
import {ProductService} from "../../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {SolutionStore} from "../../../store/solution.store";

@Component({
  selector: 'app-solution-card',
  templateUrl: './solution-card.component.html',
  styleUrls: ['./solution-card.component.css']
})
export class SolutionCardComponent implements OnInit {
  @Input() ticket: Chamado;
  ELEMENT_DATA_SOLUTIONS: Solution[] = [];
  day: string = "";
  month: string = "";
  year: string = ""
  status: boolean;
  constructor(private service: ProductService,
  private solutionStore: SolutionStore,
  private _sanitizer: DomSanitizer,
  public dialog: MatDialog,) { }

  ngOnInit(): void {
    let date: string[] = this.ticket.dataAbertura.split("/");
    this.day = date[0];
    this.month= date[1];
    this.year = date[2];
  }


  findTicketsByProductId(ticketID:number): void {
    this.service.findSolutionsByTickets(ticketID).subscribe(resp => {
      this.ELEMENT_DATA_SOLUTIONS = resp;
      console.log("DATA SOLUTIONS", resp);
      this.solutionStore.saveState(resp);
      this.status = true;
    }, error => {
        this.status = false;
        console.log(error)
    })
  }
}
