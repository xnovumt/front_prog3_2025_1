import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { NonAuthenticatedGuard } from 'src/app/guards/non-authenticated.guard';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', canActivate: [NonAuthenticatedGuard], component: LoginComponent },
    { path: 'register', canActivate: [NonAuthenticatedGuard], component: RegisterComponent },
];
