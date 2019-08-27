import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import { RegisterComponent } from './components/register/register.component';
import { TimetableComponent } from './components/timetable/timetable.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'nav-bar',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'pricelist',
  component: PricelistComponent
},
{
  path: 'buy-a-ticket',
  component: BuyATicketComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'timetable',
  component: TimetableComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
