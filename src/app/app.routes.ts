import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoanReturnComponent } from './views/loan-return/loan-return.component';
import { EventsComponent } from './views/events/events.component';
import { SalesDonationsComponent } from './views/sales-donations/sales-donations.component';
import { ReportsComponent } from './views/reports/reports.component';
import { BooksComponent } from './views/books/books.component';
import { UserComponent } from './views/user/user.component';
import { ReviewsComponent } from './views/reviews/reviews.component';

export const ROUTES: Routes = [
    { path: 'events', component: EventsComponent },
    { path: 'loan-return', component: LoanReturnComponent },
    { path: 'user', component: UserComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'sales-donations', component: SalesDonationsComponent },
    { path: 'books', component: BooksComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: '', component: WelcomeComponent },
    { path: '**', redirectTo: '' }
]
