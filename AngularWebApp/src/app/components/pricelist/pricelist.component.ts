import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  price : any[] = [];
  
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getPrices();
  }
  getPrices(){
    this.ticketService.getPricelist().subscribe(data =>{
      this.price = data;
    } );
  } 
}
