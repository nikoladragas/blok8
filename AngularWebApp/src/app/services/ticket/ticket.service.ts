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


  buyTicket(price: any, type: any, userName: any, email: any, transactionId: any, payerId: any, payerEmail: any) : Observable<any> {
    return this.http.post(`http://localhost:52295/api/Tickets/BuyTicket?price=${price}&type=${type}&name=${userName}&email=${email}&transactionId=${transactionId}&payerId=${payerId}&payerEmail=${payerEmail}`,[price, type, userName, email, transactionId, payerId, payerEmail]);
  } 

  getPrice(ticketType:any , userType : any ): Observable<number> {   //mozes obrisati vrv
    //console.log(this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`));
    console.log(ticketType + userType + "uServ");
    return this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`);
  }

  getTicket(id: any): Observable<any>{
    return this.http.get<any>("http://localhost:52295/api/Tickets/GetTicket?id="+id);
  }
}
