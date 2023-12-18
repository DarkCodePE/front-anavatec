import {Component, Inject, OnInit} from '@angular/core';
import {TecnicoService} from "../../../services/tecnico.service";
    import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PerfilCreateComponent} from "../modal/perfil-create/perfil-create.component";
import {UserStore} from "../../../store/user.store";
import {Observable} from "rxjs";
import {Product} from "../../../models/Product";
import {Profile, ProfileState, TecnicoState} from "../../../models/tecnico";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    profile$:Observable<TecnicoState> = this.userStore.state$;
    file: Blob = new Blob();
    files: File =  new File([""], "filename");
    url: string = '';
    errorMessage: string = '';
    jwt = new JwtHelperService();
  constructor(private service: TecnicoService,
              public dialog: MatDialog,
              private toastService: ToastrService,
              private _sanitizer: DomSanitizer,
              private userStore: UserStore,
            ) { }

  ngOnInit(): void {
  }
  /*getProfile(){
    this.service.getProfile().subscribe(resp => {
        console.log(resp);
    });
  }*/
  OpenModal() {
    //TODO MODAL
    this.dialog.open(PerfilCreateComponent, {
        width: 'auto',
        height: 'auto',
        maxHeight: '88vh',
    });
  }

    uploadImageFile($event: Event) {
        // @ts-ignore
        this.files = $event.target.files[0];
        if (this.files) {
            let reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                this.userStore.saveAvatar(this.url);
            }
            reader.readAsDataURL(this.files);
        }
        const fileSizeMB = this.files.size / 1024 / 1024;
        const allowedFileTypes = ['gif', 'jpg', 'jpeg', 'png'];
        const fileExtension = this.files.name.split('.').pop()?.toLowerCase();
        if (fileSizeMB <= 3.5 && allowedFileTypes.includes(fileExtension)) {
            //  TODO: SEND FILE TO PROFILE SERVICE
            const token = localStorage.getItem('token');
            const decode = this.jwt.decodeToken(token);
            console.log(decode.sub);
            this.service.uploadImage(this.files, decode.sub).subscribe(resp => {
                if (resp) {
                    this.errorMessage = '';
                        this.toastService.success('Su avatar se cargado exitosamente', 'Avatar cargado');
                    this.userStore.saveState(resp, resp.profile.avatar);
                }
            }, error => {
                console.log(error);
                this.errorMessage = error.message;
                this.toastService.error(this.errorMessage);
            });
        } else {
            if (fileSizeMB > 3.5) {
                this.errorMessage = 'El archivo excede el tamaño máximo permitido (3.5 MB).';
            } else if (!allowedFileTypes.includes(fileExtension)) {
                this.errorMessage = 'Formato de archivo no válido. Se admiten solo archivos .doc, .docx o .pdf.';
            }
        }

    }
}
