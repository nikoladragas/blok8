import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import {PricelistComponent} from './components/pricelist/pricelist.component';
import { LoginComponent} from './components/login/login.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'mainmenu', 
  pathMatch: 'full' 
},
{
  path: 'buy-a-ticket', 
  component: BuyATicketComponent
},
{
  path: 'pricelist',
  component: PricelistComponent
},
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
