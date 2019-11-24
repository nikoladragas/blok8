import { Component, OnInit, NgZone } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Line, Station, Polyline, GeoLocation, MarkerInfo } from 'src/app/models/models';
import { AgmCoreModule } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/location/location.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [NotificationService]
})
export class MapComponent implements OnInit {

  isConnected: Boolean;
  time: string;

  constructor(private locationService: NotificationService, private ngZone: NgZone, private adminService: AdminService, private formBuilder: FormBuilder) {
    this.isConnected = false;
   }

  

  stationForm = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    xCoordinate: ['', Validators.required],
    yCoordinate: ['', Validators.required],
  });

  selectedLineId: any;
  lines: Line[] = [];
  stations: Station[] = [];
  initBool: Boolean = true;
  i: any;
  j: any;
  selectedLine: Polyline;
  lineStations: Station[] = [];
  lineStationsIds: any[] = [];
  markerInfo: MarkerInfo;
  loggedIn: any;
  busMarker: MarkerInfo;
  busicon: string;
  markericon: string;
  ngOnInit() {
    this.markericon = "../../../assets/markericon.png";
    this.busicon = '../../../assets/busicon.png';
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "../../../assets/markericon.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selectedLine = new Polyline([], 'red', { url:"../../../assets/markericon.png", scaledSize: {width: 30, height: 30}});
    this.getLines();
    this.loggedIn = localStorage['role'];

    this.getStations()
    console.log(this.lineStations);
    this.checkConnection();
    this.subscribeForTime();

  }

  inic(){
    this.checkConnection();
    this.subscribeForTime();
  }

  private checkConnection(){
    this.locationService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          this.locationService.StartTimer(this.lineStations)
          this.busMarker = new MarkerInfo(new GeoLocation(45.226464990461565, 19.771512), "../../../assets/busicon.png", 'bus', 'labela', "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
        }
    });
  }

  subscribeForTime() {
    this.locationService.registerForTimerEvents().subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: any){
    this.ngZone.run(() => { 
       //this.time = time;
       this.busMarker.location.latitude = time[0];
       this.busMarker.location.longitude = time[1];
      console.log('STIZE' + time);
    });  
  }

  public startTimer() {
    
  this.locationService.StartTimer(this.lineStations);
  }

  public stopTimer() {
    this.locationService.StopTimer();
    console.log('stop timer log');
  }


  getLines(){
    this.adminService.getLines().subscribe( 
      response => {
        this.lines = response;
        if(this.lines.length > 0){
          if(this.initBool === true){
            this.selectedLineId = this.lines[0].Id;
            this.initBool = false;
          }
        }
        this.getStations();
      });
  }

  getStations(){
    this.selectedLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.adminService.getStations().subscribe(
      data=>{
        this.stations = data;
        this.adminService.getLineStations(this.selectedLineId).subscribe(
          data=>{
            this.lineStationsIds = data;
            for(this.i = 0; this.i < this.stations.length; this.i++){
              for(this.j = 0; this.j < this.lineStationsIds.length; this.j++){
                if(this.stations[this.i].Id == this.lineStationsIds[this.j]){
                  this.lineStations.push(this.stations[this.i]);
                  this.selectedLine.addLocation(new GeoLocation(this.stations[this.i].XCoordinate, this.stations[this.i].YCoordinate));
                }
              }
            }
          }
        );
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

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    this.lineStations = [];
    this.getStations();
    console.log(this.lineStations);
  }

  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.stationForm.controls.xCoordinate.setValue($event.coords.lat);
    this.stationForm.controls.yCoordinate.setValue($event.coords.lng);
  }




}
