import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/services/timetable/timetable.service';
import { Router} from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Line, Departure} from 'src/app/models/models'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private timetableService : TimetableService , public router: Router, private fb: FormBuilder) { }

  Lines : Line[] = [];
  Departures : Departure[] = [];
 
  selectedDayType : any = 'Weekday';
  selectedLineType : any = 'City';
  selectedLineName: any;

  timetableForm = this.fb.group({
    dayType: [''],
    lineType: [''],
    lineName: [''],
  });

  getLines(event : any)
  {    
    this.selectedDayType = this.timetableForm.controls.dayType.value;
    this.selectedLineType = this.timetableForm.controls.lineType.value;
    this.selectedLineName = this.timetableForm.controls.lineName.value;
    this.timetableForm.controls.lineName.setValue('');
    this.timetableService.getLines(this.selectedLineType).subscribe(c=>this.Lines = c);
    
    console.log("DayType: " + this.selectedDayType + "\nLineType: " + this.selectedLineType + "\nLineName: " + this.selectedLineName + "\nLines: " + this.Lines.length);
  }

  getTimetable()
  {
    console.log("DayType: " + this.selectedDayType + "\nLineType: " + this.selectedLineType + "\nLineName: " + this.timetableForm.controls.lineName.value + "\nLines: " + this.Lines.length);
    this.selectedDayType = this.timetableForm.controls.dayType.value;
    this.selectedLineType = this.timetableForm.controls.lineType.value;
    this.selectedLineName = this.timetableForm.controls.lineName.value;
    this.timetableService.getSchedule(this.selectedDayType , this.selectedLineType , this.timetableForm.controls.lineName.value).subscribe((c: Departure[]) => this.Departures = c)
    console.log(this.Departures.length);
  }
}
