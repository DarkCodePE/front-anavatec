import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../services/product.service";
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {ProductStore} from "../../../../store/product.store";
import {Category} from "../../../../models/Product";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productFormGroup!: any;
  file?:File |null;
  errorMessage: string = '';
  private createProductLoading: boolean;
  categories: Category[] = [];
  constructor(
      public productDialog: MatDialogRef<ProductCreateComponent>,
      private store:ProductStore,
      public dialog: MatDialog,
      public formBuilder: FormBuilder,
      public service: ProductService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCategories();
  }
  getAllCategories(){
    this.service.getAllCategories().subscribe({
        next: (res: any) => {
            this.categories = res;
        }
    })
  }
  createForm(){
    this.productFormGroup = this.formBuilder.group({
      sku: ['', [Validators.required]],
      title: ['', [Validators.required]],
      categoryId: [''],
      summary: ['',],
      fileSaver: ['']
    });
  }
  attachFileChange($event: Event) {
    // @ts-ignore
    const  file = $event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / 1024 / 1024;
      const allowedFileTypes = ['gif', 'jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileSizeMB <= 3.5 && allowedFileTypes.includes(fileExtension)) {
        // El archivo cumple con los requisitos, puedes realizar las operaciones necesarias aquí
        //console.log(file);
        this.errorMessage = '';
        this.file = file;
      } else {
        // El archivo no cumple con los requisitos, establecemos el mensaje de error correspondiente
        if (fileSizeMB > 3.5) {
          this.errorMessage = 'El archivo excede el tamaño máximo permitido (3.5 MB).';
        } else if (!allowedFileTypes.includes(fileExtension)) {
          this.errorMessage = 'Formato de archivo no válido. Se admiten solo archivos .doc, .docx o .pdf.';
        }
      }
    }
  }

  enviar() {
    this.createProductLoading = true;
    this.service.create(this.productFormGroup.value, this.file).subscribe({
      next: (res: any) => {
        this.createProductLoading = false;
        this.productDialog.close(true);
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
  public items: Array<any> = [
    { code: 1, name: "Micrófonos y sonido" },
    { code: 2, name: "Adaptadores Hub" },
    { code: 3, name: "Mouses y Teclados" },
    { code: 4, name: "Fotografía y Video" }
  ];

  closeModal() {
    this.productDialog.close(false);
  }

  onDeleteFile() {

  }

  deleteCv(id) {
    
  }
}
