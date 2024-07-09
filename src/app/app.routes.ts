import { Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const ROUTES: Routes = [
    { path: 'register-user', component: RegisterUserComponent },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '' }
]
