import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {filter, switchMap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {SolutionFormStore} from "../../../store/solutionForm.store";
import {ChamadoService} from "../../../services/chamado.service";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/Product";
import {Chamado} from "../../../models/chamado";

@Component({
  selector: 'app-ticket-solution',
  templateUrl: './ticket-solution.component.html',
  styleUrls: ['./ticket-solution.component.css']
})
export class TicketSolutionComponent implements OnInit {
  solutionFormGroup!: any;
  file?:File |null;
  errorMessage: string = '';
  tickets : Chamado[] = [];
  private ticketId: number;
  constructor(public dialog: MatDialog,
              private chamadoService: ChamadoService,
              private service: ProductService,
              public formBuilder: FormBuilder,
              public dialogSolution: MatDialogRef<TicketSolutionComponent>,
              private toastService: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private solutionFormStore: SolutionFormStore,
              @Inject(MAT_DIALOG_DATA) public modalData: {
                ticketId: number,
              }
              ) {
    this.ticketId = this.modalData.ticketId;
    console.log(this.ticketId)
  }

  ngOnInit(): void {
    this.createForm();
    this.findAllProduct();
  }
  findAllProduct(): void {
    this.chamadoService.findAll().subscribe(resp => {
      this.tickets=resp;
    });
  }
  createForm(){
    this.solutionFormGroup = this.formBuilder.group({
      id: [''],
      ticketId: [''],
      title: ['', [Validators.required]],
      summary: ['',  [Validators.required]],
      imageUrl: [''],
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
  submitSolution() {
    //save state solution form
    this.solutionFormGroup.get("ticketId").setValue(this.ticketId);

    this.chamadoService.createSolution(this.solutionFormGroup.value, this.file).subscribe({
      next: () => {
        this.toastService.success('Solucion registrada exitosamente', 'Crear Solucion');
        this.router.navigate(['chamados']);
        this.dialogSolution.close();
      },
      error: (erro) => {
        this.toastService.error(erro.error.error);
      }
    })
  }

  onDeleteFile() {

  }

  closeModal() {
    this.dialogSolution.close();
  }
}
