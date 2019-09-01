import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-validating',
  templateUrl: './ticket-validating.component.html',
  styleUrls: ['./ticket-validating.component.css']
})
export class TicketValidatingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private ticketService: TicketService) { }

  validatingTicketForm = this.formBuilder.group({
    id: ['', Validators.required],
    
  });

  ticketState: any = '';

  ngOnInit() {
  }

  validate(){
    this.ticketService.getTicket(this.validatingTicketForm.controls.id.value).subscribe(
      data=>{
        if(data == 200){
          this.ticketState = 'Ticket is valid';
        }
        else if(data == 204){
          this.ticketState = 'Ticket is invalid';
        }
      }
    );
  }
}
