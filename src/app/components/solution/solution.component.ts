import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {Product, Solution} from "../../models/Product";

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  ELEMENT_DATA_SOLUTIONS: Solution[] = [];
  FILTERED_DATA_SOLUTIONS: Solution[] = [];
  ELEMENT_DATA_PRODUCTS: Product[] = [];
  FILTERED_DATA_PRODUCTS: Product[] = [];
  loading=false;
  visible=true;
  displayedColumns = ['sku', 'titulo', 'precio', 'categoria'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA_PRODUCTS);
  constructor( private service: ProductService,
               private _sanitizer: DomSanitizer,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.findAllSolutions();
    this.findAllProducts();
  }

  findAllSolutions(): void {
    this.service.findAllSolutions().subscribe(resp => {
      console.log(resp)
      this.ELEMENT_DATA_SOLUTIONS = resp;
      this.dataSource = new MatTableDataSource<any>(resp);
      //this.dataSource.paginator = this.paginator;
    })
  }

  decodeImage(base64Image: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + base64Image);
  }
  findAllProducts(): void {
    this.service.findAll().subscribe(resp => {
      console.log(resp)
      this.ELEMENT_DATA_PRODUCTS = resp;
      this.dataSource = new MatTableDataSource<any>(resp);
      //this.dataSource.paginator = this.paginator;
    })
  }
}
