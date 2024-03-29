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
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { ControllerGuardGuard } from './guards/controller-guard.guard';
import { UserGuardGuard } from './guards/user-guard.guard';
import { VisitorGuardGuard } from './guards/visitor-guard.guard';
import { MapComponent } from './components/map/map.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'pricelist',
  component: PricelistComponent,
  canActivate: [UserGuardGuard]
},
{
  path: 'buy-a-ticket',
  component: BuyATicketComponent,
  canActivate: [UserGuardGuard]
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'timetable',
  component: TimetableComponent,
  canActivate: [UserGuardGuard]
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [VisitorGuardGuard]
},
{
  path: 'stations',
  component: StationsComponent,
  canActivate: [AdminGuardGuard]
},
{
  path: 'lines',
  component: LinesComponent,
  canActivate: [AdminGuardGuard]
},
{
  path: 'admin-pricelist',
  component: AdminPricelistComponent,
  canActivate: [AdminGuardGuard]
},
{
  path: 'admin-timetable',
  component: AdminTimetableComponent,
  canActivate: [AdminGuardGuard]
},
{
  path: 'ticket-validating',
  component: TicketValidatingComponent,
  canActivate: [ControllerGuardGuard]
},
{
  path: 'user-validating',
  component: UserValidatingComponent,
  canActivate: [ControllerGuardGuard]
},
{
  path: 'map',
  component: MapComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
