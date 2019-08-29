import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Line, Station } from 'src/app/models/models';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  lineForm = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    
  });

  selectedLineId: any;
  lines: Line[] = [];
  stations: Station[] = [];
  selectedStations: Station[] = []; 
  lineStationsIds: any[] = [];
  i: any;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.getLines();
    this.getStations();
  }

  onSelect(event : any){
    this.selectedLineId = event.target.value;
    console.log(this.selectedLineId); 

    for(this.i = 0; this.i < this.lines.length; this.i++){
      if(this.lines[this.i].Id == this.selectedLineId){
        this.lineForm.controls.lineName.setValue(this.lines[this.i].LineName);
        this.lineForm.controls.lineType.setValue(this.lines[this.i].LineType);    //servis.getLine umesto fora?
      }
    }

    if(this.selectedLineId == '')
    {
      for(this.i = 0; this.i < this.stations.length; this.i++){
        this.stations[this.i].Exist = false;
      }
      this.lineForm.reset();
    }
    else
    {
      //TO DO
    }
  }
  

  getLines(){
    this.adminService.getLines().subscribe( data => { this.lines = data;console.log(this.lines);} );
  }

  getStations(){
    this.adminService.getStations().subscribe(data=>{
      this.stations = data;
    });
  }

  addLine(){
    this.adminService.addLine(this.lineForm.value, this.lineForm.controls.name, this.lineForm.controls.type).subscribe( data => 
      {
        window.alert('Line with ID: ' + data.Id + ' added!');
        this.getLines();
        this.lineForm.reset();
        this.getStations();

        for(this.i = 0; this.i < this.stations.length; this.i++){
          this.stations[this.i].Exist = false;
        }
      });
  }

  checkValue(event: any, id: any){
    console.log(id);
    console.log(event.currentTarget.checked);
    if(event.currentTarget.checked){
      this.lineStationsIds.push(id);
    }
    else{
      for(this. i = 0; this.i < this.lineStationsIds.length; this.i++){
        if(this.lineStationsIds[this.i] == id){
          this.lineStationsIds = this.lineStationsIds.filter(s => s != id);
        }
      }
      //this.lineStationsIds = this.lineStationsIds.filter(id); jel radi samo ovo
    }
    console.log(this.lineStationsIds);
  }
}
