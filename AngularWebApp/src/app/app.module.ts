import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import { RegisterComponent } from './components/register/register.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StationsComponent } from './components/stations/stations.component';
import { LinesComponent } from './components/lines/lines.component';
import { AdminPricelistComponent } from './components/admin-pricelist/admin-pricelist.component';
import { AdminTimetableComponent } from './components/admin-timetable/admin-timetable.component';
import { TicketValidatingComponent } from './components/ticket-validating/ticket-validating.component';
import { UserValidatingComponent } from './components/user-validating/user-validating.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PricelistComponent,
    BuyATicketComponent,
    RegisterComponent,
    TimetableComponent,
    ProfileComponent,
    StationsComponent,
    LinesComponent,
    AdminPricelistComponent,
    AdminTimetableComponent,
    TicketValidatingComponent,
    UserValidatingComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'
   })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
