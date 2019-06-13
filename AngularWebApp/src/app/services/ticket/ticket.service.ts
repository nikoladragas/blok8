import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getPricelist(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:52295/api/Tickets/GetPricelist`);
  }

  buyTicket(price: any, type: any, email: any) : Observable<any> {
    return this.http.post("http://localhost:52295/api/Tickets/BuyTicket",[price, type, email]);
  } 

  getCena(ticketType:any , userType : any ): Observable<number> {   //mozes obrisati vrv
    //console.log(this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`));
    return this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`);
  }
}
