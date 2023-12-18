import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {Solution} from "../../../models/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {Chamado} from "../../../models/chamado";
import {Observable} from "rxjs";
import {SolutionStore} from "../../../store/solution.store";
import {FormBuilder, Validators} from "@angular/forms";
import {ChamadoStore} from "../../../store/chamado.store";

@Component({
  selector: 'app-solution-grid',
  templateUrl: './solution-grid.component.html',
  styleUrls: ['./solution-grid.component.css']
})
export class SolutionGridComponent implements OnInit {
  ELEMENT_DATA_TICKETS: Chamado[] = [];
  solutions$:Observable<Solution[]> = this.solutionStore.state$;
  recommendationFormGroup!: any;
  chamados$:Observable<Chamado[]> = this.chamadoStore.state$;
  constructor(private service: ProductService,
              private _sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private solutionStore: SolutionStore,
              private route: ActivatedRoute,
              public formBuilder: FormBuilder,
              private chamadoStore: ChamadoStore,
              private router: Router  ) { }

  ngOnInit(): void {
    const productID = this.route.snapshot.paramMap.get('id');
    console.log(productID);
    this.findTicketsByProductId(Number(productID));
    this.createForm();

  }
  createForm(){
    this.recommendationFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      productId: [''],
    });
  }
  findTicketsByProductId(productID:number): void {
    this.service.findTicketsByProductId(productID).subscribe(resp => {
      this.chamadoStore.saveState(resp);
    })
  }

  findSolution() {
    this.recommendationFormGroup.get('productId').setValue(this.route.snapshot.paramMap.get('id'));
    /*this.service.searchSolutionsByTitle(this.recommendationFormGroup.value).subscribe(resp => {
      this.solutionStore.saveState(resp);
    })*/
    this.service.searchChamaodosByTitle(this.recommendationFormGroup.value).subscribe(resp => {
      this.chamadoStore.saveState(resp);
    });
  }
}
