import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from "@angular/material/table";
import {Solution} from "../../../models/Product";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {SolutionStore} from "../../../store/solution.store";

@Component({
  selector: 'app-solution-list',
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.css']
})
export class SolutionListComponent implements OnInit {
  @Input() solution: any;
  ELEMENT_DATA_SOLUTIONS: Solution[] = [];
  constructor( private service: ProductService,
               private _sanitizer: DomSanitizer,
               private solutionStore: SolutionStore,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAllSolutions();
  }
  decodeImage(base64Image: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + base64Image);
  }
  findAllSolutions(): void {
    this.service.findAllSolutions().subscribe(resp => {
      this.ELEMENT_DATA_SOLUTIONS = resp;
      //this.solutionStore.saveState(resp);
      //this.dataSource.paginator = this.paginator;
    })
  }
}
