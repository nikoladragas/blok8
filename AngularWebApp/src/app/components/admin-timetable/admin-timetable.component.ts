import { Component, OnInit } from '@angular/core';
import { Line, Departure, Station} from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TimetableService } from 'src/app/services/timetable/timetable.service';
import { Validators, FormBuilder } from '@angular/forms';
 
@Component({
  selector: 'app-admin-timetable',
  templateUrl: './admin-timetable.component.html',
  styleUrls: ['./admin-timetable.component.css']
})
export class AdminTimetableComponent implements OnInit {

  lines: Line[] = [];
  departures: Departure[] = [];
  selectedLineId: any;
  selectedLineType: any;
  selectedLineName: any;
  selectedDay: any = 'Weekday';
  i: any;
  selectedDeparture: any = '';
  selectedDepartureId: any;
  timetableVersion: number;

  useForm = this.formBuilder.group({
    selectedDeparture : ['', Validators.required],
    useDeparture: ['', Validators.required],
    addDeparture: ['', Validators.required],
  });

  constructor(private adminService: AdminService, private timetableService: TimetableService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getLines();
    this.selectedLineId = "Choose line";
    this.selectedDepartureId = '';
  }

  getLines(){
    this.adminService.getLines().subscribe( data => { this.lines = data;console.log(this.lines);} );

  }

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    if(this.selectedLineId == "Choose line")
    {
      this.departures = [];
      this.useForm.reset();
    }
    else
    {
      for(this.i = 0; this.i < this.lines.length; this.i++){
        if(this.lines[this.i].Id == event.target.value){
          this.selectedLineType = this.lines[this.i].LineType;
          this.selectedLineName = this.lines[this.i].LineName;
        }
      }
      this.getDepartures();
    }
  }

  onSelectDay(event: any){
    this.selectedDay = event.target.value;
    this.getDepartures();
  }

  getDepartures(){
    this.timetableService.getSchedule(this.selectedDay, this.selectedLineType, this.selectedLineName).subscribe(
      data =>
      {
        this.departures = data;
        console.log(data);
      }
    );
    //izloguj ovo do sad da vidis jel radi
  }
  onSelectDeparture(event: any){
    this.selectedDepartureId = event.target.value;
    for(this.i = 0; this.i < this.departures.length; this.i++){
      if(this.departures[this.i].Id == event.target.value){
        this.selectedDeparture = this.departures[this.i].Departures;
        this.useForm.controls.useDeparture.setValue(this.departures[this.i].Departures);
        this.timetableVersion = this.departures[this.i].Version;
        console.log(this.timetableVersion);
      }
    }
  }

  onClickEdit(){
    this.adminService.editDeparture(this.selectedDepartureId, this.useForm.controls.useDeparture.value, this.timetableVersion).subscribe(
      data =>{
        if(data == 200){
          this.getDepartures();
          this.useForm.reset();
          this.selectedDepartureId = '';
        }
        else if(data == 203)
        {
          window.alert('Other admin already deleted this departure. Refresh page.');
        }
        else{
          window.alert('Other admin already edited this departure. Refresh page.');
        }
      }
    );
  }

  onClickDelete(){
    this.adminService.deleteDeparture(this.selectedDepartureId).subscribe(
      data =>{
        if(data == 200){
          this.getDepartures();
          this.useForm.reset();
        }
        else
          window.alert('Other admin already deleted this!');
      }
    );
  }

  onClickAdd(){
    this.adminService.addDepartures(this.selectedLineId, this.selectedDay, this.useForm.controls.addDeparture.value).subscribe(
      data =>{
        this.getDepartures();
        this.useForm.reset();
      }
    );
  }

}
