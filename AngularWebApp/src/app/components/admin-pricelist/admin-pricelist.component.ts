import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-admin-pricelist',
  templateUrl: './admin-pricelist.component.html',
  styleUrls: ['./admin-pricelist.component.css']
})
export class AdminPricelistComponent implements OnInit {

  editPricelistForm = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    hour: ['', Validators.required],
    day: ['', Validators.required],
    month: ['', Validators.required],
    year: ['', Validators.required],
  });
  
  addPricelistForm = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    hour: ['', Validators.required],
    day: ['', Validators.required],
    month: ['', Validators.required],
    year: ['', Validators.required],
  });

  pricelistId: any;
  pricelistVersion: number;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private ticketService: TicketService) { }

  ngOnInit() {
    this.getPrices();
  }

  getPrices(){
    this.ticketService.getPricelist().subscribe(data =>{
      this.editPricelistForm.controls.hour.setValue(data[0]);
      this.editPricelistForm.controls.day.setValue(data[1]);
      this.editPricelistForm.controls.month.setValue(data[2]);
      this.editPricelistForm.controls.year.setValue(data[3]);
      this.editPricelistForm.controls.from.setValue(data[12]);
      this.editPricelistForm.controls.to.setValue(data[13]);

      this.pricelistId = data[14];
      this.pricelistVersion = data[15];

      console.log(data);
    } );
  }
  
  editPricelist(){
    this.adminService.editPricelist(this.pricelistId, this.editPricelistForm.controls.hour.value, this.editPricelistForm.controls.day.value, this.editPricelistForm.controls.month.value, this.editPricelistForm.controls.year.value, this.pricelistVersion).subscribe(
      data => 
      {
        if(data == 200)
        {
          this.getPrices();
          window.alert('Pricelist edited.');
        }
       else if(data == 203)
       {
        window.alert('Other admin already deleted this pricelist. Refresh page.');
       }
       else
       {
        window.alert('Other admin already edited this departure. Refresh page.');
       }
      }
    );
  }

  addPricelist(){
    this.adminService.addPricelist(this.addPricelistForm.controls.to.value, this.editPricelistForm.controls.hour.value, this.addPricelistForm.controls.day.value, this.addPricelistForm.controls.month.value, this.addPricelistForm.controls.year.value).subscribe(
      data => 
      {
          this.addPricelistForm.reset();
          this.getPrices();
          window.alert('Pricelist added.');
      }
    );
  }
}
