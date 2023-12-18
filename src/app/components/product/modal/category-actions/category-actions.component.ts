import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductStore} from "../../../../store/product.store";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../services/product.service";
import {CategoryStore} from "../../../../store/category.store";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category-actions',
  templateUrl: './category-actions.component.html',
  styleUrls: ['./category-actions.component.css']
})
export class CategoryActionsComponent implements OnInit {
  categoryFormGroup!: any;
  private createCategoryLoading: boolean;
  errorMessage: string = '';
  constructor(
        public categoryDialog: MatDialogRef<CategoryActionsComponent>,
        private store:CategoryStore,
               public dialog: MatDialog,
               public formBuilder: FormBuilder,
               public service: ProductService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.categoryFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }
  enviar() {
    this.createCategoryLoading = true;
    this.service.saveCategory(this.categoryFormGroup.value).subscribe({
      next: (res: any) => {
        this.createCategoryLoading = false;
        this.categoryDialog.close(true);
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

  closeModal() {
    this.categoryDialog.close(false);
  }

}
