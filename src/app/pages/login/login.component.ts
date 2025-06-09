import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { SeguridadService } from 'src/app/services/seguridadService/seguridadService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: Usuario
  twoFactorCode: string = "";
  requiresTwoFactor: boolean = false;

  constructor(private seguridadService: SeguridadService, private router: Router) {
    this.user = { email: "", password: "" }
  }

  login() {
    this.seguridadService.login(this.user.email, this.user.password).subscribe({
      next: (data) => {
        if (data.requiresTwoFactor || data.twoFactorCode) {
          this.requiresTwoFactor = true;
          this.twoFactorCode = data.twoFactorCode;
        } else {
          this.seguridadService.saveSession(data);
        }
      },
      error: () => {
        Swal.fire("Autenticación Inválida", "Usuario o contraseña inválido", "error");
      }
    });
  }

  validateTwoFactorCode() {
    this.seguridadService.validateTwoFactorCode(this.twoFactorCode).subscribe({
      next: (data) => {
        this.seguridadService.saveSession(data);
        this.router.navigate(["/tablero"]);
      },
      error: (error) => {
        Swal.fire("Código Inválido", "El código de autenticación es incorrecto", "error");
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}