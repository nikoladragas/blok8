import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Line, Station, Polyline, GeoLocation, MarkerInfo } from 'src/app/models/models';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private adminService: AdminService) { }

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

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "assets/images/ftn.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selectedLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.getLines();
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

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    this.lineStations = [];
    this.getStations();
  }
}
