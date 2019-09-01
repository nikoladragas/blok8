import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import { RegisterComponent } from './components/register/register.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProfileComponent} from './components/profile/profile.component';
import {StationsComponent} from './components/stations/stations.component';
import { LinesComponent} from './components/lines/lines.component';
import { AdminPricelistComponent } from './components/admin-pricelist/admin-pricelist.component';
import { AdminTimetableComponent } from './components/admin-timetable/admin-timetable.component';
import { TicketValidatingComponent } from './components/ticket-validating/ticket-validating.component';
import {UserValidatingComponent } from './components/user-validating/user-validating.component';

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
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'stations',
  component: StationsComponent
},
{
  path: 'lines',
  component: LinesComponent
},
{
  path: 'admin-pricelist',
  component: AdminPricelistComponent
},
{
  path: 'admin-timetable',
  component: AdminTimetableComponent
},
{
  path: 'ticket-validating',
  component: TicketValidatingComponent
},
{
  path: 'user-validating',
  component: UserValidatingComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
