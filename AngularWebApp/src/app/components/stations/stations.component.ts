import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import {AdminService} from 'src/app/services/admin/admin.service';
import { Station } from 'src/app/models/models';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stationForm = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    xCoordinate: ['', Validators.required],
    yCoordinate: ['', Validators.required],
  });

  stations : Station[] = [];
  selectedStationId: any = 'Add station';

  constructor(private formBuilder: FormBuilder,private adminService: AdminService) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(){
    this.adminService.getStations().subscribe(data=>{
      this.stations = data;
    });
  }

  onSelect(event : any){
    this.selectedStationId = event.target.value;
    this.adminService.getStation(this.selectedStationId).subscribe(data=>{
      this.stationForm.controls.name.setValue(data.Name);
      this.stationForm.controls.address.setValue(data.Address);
      this.stationForm.controls.xCoordinate.setValue(data.XCoordinate);
      this.stationForm.controls.yCoordinate.setValue(data.YCoordinate);
    });
    console.log(this.selectedStationId); 
  }

  editStation(){
    this.adminService.editStation(this.stationForm.value, this.selectedStationId).subscribe(
      data=>{
        this.getStations();
        window.alert("Successfully edited station ");
        this.stationForm.reset();
      }
    );
    this.getStations();
  }

  deleteStation(){
    this.adminService.deleteStation(this.selectedStationId).subscribe(
      d=>{
        this.getStations();
        window.alert("Successfully deleted station ");
        this.selectedStationId = "";
        this.stationForm.reset();
      }
    );
  }

  addStation(){
    console.log(this.stationForm.controls.name.value + '  ' + this.stationForm.controls.address.value + '  ' + this.stationForm.controls.xCoordinate.value + '  '  + this.stationForm.controls.yCoordinate.value);
    this.adminService.addStation(this.stationForm.value).subscribe( data=>
      {
        window.alert('Station added!');
        this.getStations();
        this.stationForm.reset();
      });
  }
}
