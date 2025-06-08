import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/securityService/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User;
  twoFactorCode: string = "";
  isTwoFactorEnabled: boolean = false;
  userId: string = ""; // Almacenar el ID del usuario para la segunda etapa

  constructor(private seguridadService: SecurityService, private router: Router) {
    this.user = { email: "", password: "" };
  }

  login() {
    if (!this.isTwoFactorEnabled) {
      // Primera etapa: Validar credenciales
      this.seguridadService.login(this.user.email, this.user.password).subscribe({
        next: (data: any) => {
          this.userId = data.user._id; // Guardar el ID del usuario para la segunda etapa
          this.isTwoFactorEnabled = true;
          Swal.fire("Por favor, ingrese el código enviado a su correo.", "info");
        },
        error: (error: any) => {
          Swal.fire("Error de autenticación", "Usuario o contraseña inválidos.", "error");
        }
      });
    } else {
      // Segunda etapa: Validar código 2FA
      this.seguridadService.validateTwoFactor(this.twoFactorCode).subscribe({
        next: (data: any) => {
          this.seguridadService.saveSession(data);
          this.router.navigate(["tablero"]);
        },
        error: (error: any) => {
          Swal.fire("Error de autenticación", "Código 2FA inválido.", "error");
        }
      });
    }
  }

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngOnDestroy(): void {
    // Limpieza del componente
  }
}
