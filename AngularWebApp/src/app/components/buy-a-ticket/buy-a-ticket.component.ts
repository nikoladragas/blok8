import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user/user.service';
import { TicketService} from 'src/app/services/ticket/ticket.service';
import { Validators, FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;

  price: any;
  ticketType: any;
  addTicket: any;
  loggedIn: any;
  userData: any;
  userProfileActive: any;
  userType: any;
  email: any;

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    
  });

  constructor(private userService: UserService, private ticketService: TicketService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    this.email = localStorage['name'];
    this.ticketType = "HourTicket";
    this.getUser();
    this.initConfig();
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
      console.log("ovde gledaj" + this.userData.UserType);
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
      this.userType = 0;
      this.ticketService.getPrice(this.ticketType, 0).subscribe( data => this.price = data);
    }
  } 

  buyTicket() {
    if(this.emailForm.controls.email.value != '')
    {
      this.email = this.emailForm.controls.email.value;
      this.ticketService.buyTicket(this.price, this.ticketType, localStorage.getItem('name'), this.email).subscribe(tmp => this.addTicket = tmp);
    }
    window.alert("Your ticket is bought!");
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: (this.price/100).toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: (this.price/100).toString()
              }
            }
          },
          payee: {
            email_address: 'sb-vj435n550635@personal.example.com'
          },
          items: [
            {
              name: 'Bus Ticket',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: (this.price/100).toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    
    style: {
      label: 'paypal',
      layout: 'vertical',
      shape: 'pill',
      tagline: false,
    },

    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      if(this.emailForm.controls.email.value != '')
      {
        console.log(this.emailForm.controls.email.value);
        this.email = this.emailForm.controls.email.value;
        this.ticketService.buyTicket(this.price, this.ticketType, localStorage.getItem('name'), this.email).subscribe(tmp => this.addTicket = tmp);
      }
      //this.showSuccess = true;
      window.alert("Successful!");
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}

