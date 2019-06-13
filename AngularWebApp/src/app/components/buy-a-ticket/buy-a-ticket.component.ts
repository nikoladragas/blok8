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
  userType: any;

  constructor(private userService: UserService, private ticketService: TicketService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    this.ticketType = "HourTicket";
    this.getUser();
    //this.ticketService.getPrice(this.ticketType, this.userType).subscribe( tmp => this.price = tmp);
  }

  ticketTypeChanged(type: any){
    this.ticketType = type.target.value;
    console.log(this.ticketType + "promena");
    this.ticketService.getPrice(this.ticketType, this.userType).subscribe( tmp => this.price = tmp);
  }

  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
      this.userData = data;
      this.userProfileActive = this.userData.Activated;
      this.userType = this.userData.UserType;
      if(!this.userProfileActive)
      {
        this.userType = 0;
      }
      console.log(this.userType + "get user" )
      this.ticketService.getPrice(this.ticketType, this.userType).subscribe( data => this.price = data);

    });
    }
    else
    {
      console.log("ovde");
      this.ticketService.getPrice(this.ticketType, 0).subscribe( data => this.price = data);
    }
  } 

  buyTicket() {
    this.ticketService.buyTicket(this.price, this.ticketType, localStorage.getItem('name')).subscribe(tmp => this.addTicket = tmp);
    window.alert("Your ticket is bought!");
  }
}
