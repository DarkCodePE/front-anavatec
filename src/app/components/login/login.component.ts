import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import {UserStore} from "../../store/user.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: any;

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService,
              public formBuilder: FormBuilder,
    private service: AuthService,
    private store: UserStore,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  logar() {
    this.service.authenticate(this.loginFormGroup.value).subscribe({
      next: (v) => {
        this.store.saveEmail(this.loginFormGroup.value.email);
        this.service.successfulLogin(v.headers.get('Authorization').substring(7));
        this.router.navigate([''])
      },
      error: (e) => this.toast.error('Usuario o contraseña no validos')
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
