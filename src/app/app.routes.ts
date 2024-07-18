import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { LoanReturnComponent } from './views/loan-return/loan-return.component';
import { EventsComponent } from './views/events/events.component';
import { SalesDonationsComponent } from './views/sales-donations/sales-donations.component';
import { ReportsComponent } from './views/reports/reports.component';

export const ROUTES: Routes = [
    { path: 'events', component: EventsComponent },
    { path: 'loan-return', component: LoanReturnComponent },
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'sales-donations', component: SalesDonationsComponent },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '' }
]
