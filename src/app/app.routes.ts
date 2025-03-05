import { Routes } from '@angular/router';
import { TransactionsViewComponent } from './pages/transactions-view/transactions-view.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
      { path : '', component : HomeComponent},
      { path: 'transactions', component: TransactionsViewComponent },
    //   { path: '', redirectTo: '/transactions', pathMatch: 'full' }, // Default route
      { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route (404 handling)
];
