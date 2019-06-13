import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user/user.service';
import { TicketService} from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  price: any;
  ticketType: any;
  addTicket: any;
  loggedIn: any;
  userData: any;
  userProfileActive: any;
  userProfileType: any;

  constructor(private userService: UserService, private ticketService: TicketService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    this.ticketType = "TimeTicket";
    this.getUser();
  }

  ticketTypeChanged(type: any){
    this.ticketType = type.target.value;
  }

  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
      this.userData = data;
      this.userProfileActive = this.userData.Activated;
      this.userProfileType = this.userData.UserType;
      if(!this.userProfileActive)
      {
        this.userProfileType = 0;
      }
      this.ticketService.getCena(this.ticketType, this.userProfileType).subscribe( data => this.price = data);

    });
    }
    else
    {
      this.ticketService.getCena(this.ticketType, 0).subscribe( data => this.price = data);
    }
  } 

  buyTicket() {
    this.ticketService.buyTicket(this.price, this.ticketType, localStorage.getItem('name')).subscribe(tmp => this.addTicket = tmp);
    window.alert("Your ticket is bought!");
  }
}
