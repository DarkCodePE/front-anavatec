import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Category, Product} from "../../../models/Product";
import {CategoryStore} from "../../../store/category.store";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductCreateComponent} from "../modal/product-create/product-create.component";
import {CategoryActionsComponent} from "../modal/category-actions/category-actions.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category$:Observable<Category[]> = this.store.state$;
  displayedColumns = ['id', 'name','actions'];
  CATEGORY_DATA: Category[] = [];
  dataSource = new MatTableDataSource<any>(this.CATEGORY_DATA);
  constructor(
      private service: ProductService,
      private store: CategoryStore,
      public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    this.service.getAllCategories().subscribe(resp => {
      this.store.saveState(resp);
      //this.dataSource = new MatTableDataSource<any>(resp);
    })
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.store.filterStateByNames(filterValue);
  }
  OpenModal() {
    this.dialog.open(CategoryActionsComponent, {
      panelClass: 'custom-modalbox',
      width: '700px',
      height: 'auto',
      maxHeight: '88vh',
    });
  }
  deleteCategory(id: any){
    this.service.deleteCategory(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.store.saveState(res);
      },
      error: (err: any) => {
        this.messageError(err.message);
      }
    })
  }
  messageError(message: string){
    Swal.fire({
      icon:"error",
      title:"Ocurrió un error",
      text: message
    });
  }
}
