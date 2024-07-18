import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { BooksComponent } from './views/books/books.component';

export const ROUTES: Routes = [
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'books', component: BooksComponent },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '' }
]
