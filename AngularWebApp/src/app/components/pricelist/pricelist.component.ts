import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  prices: number[];
  prices2: number[];
  broj: number;

  
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    //this.ticketService.getPricelist().subscribe(tempPrices => this.prices = tempPrices);
    //this.prices[0] = 0;
    /*
    this.prices[1] = 1;
    this.prices[2] = 2;

    console.log(this.prices[1]);
    console.log(this.prices[2]);*/

    //this.broj = this.ticketService.getCena("HourTicket", "RegularUser");
  }

}
