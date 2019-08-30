import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  base_url = "http://localhost:52295";
  constructor(private httpClient: HttpClient, private http: Http) { }

  getStations(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+"/api/Stations");
  }

  getStation(id: any): Observable<any>{
    return this.httpClient.get<any>(this.base_url+`/api/Stations/${id}`);
  }

  addStation(station: any): Observable<any>{
    console.log();
    return this.httpClient.post<any>(this.base_url+"/api/Stations/Add ",station);
  }

  deleteStation(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.base_url+`/api/Stations/Delete?id=${id}`);
  }

  editStation(station: any, id: any): Observable<any>{
    console.log(station.Name);
  //let options = {headers: {"Content-type": "application/json"}};
    return this.httpClient.post<any>(this.base_url+`/api/Stations/Edit?station=${station}&id=${id}`, station, id);
  }

  getLines(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+"/api/Lines");
  }

  addLine(stations: any, lineName: any, lineType: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url + `/api/Lines?stations=${stations}&lineName=${lineName}&lineType=${lineType}`, [stations, lineName, lineType]);
  }

  editLine(stations: any, lineName: any, lineType: any, id: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url + `/api/Lines/Edit?stationsIds=${stations}&lineName=${lineName}&lineType=${lineType}&id=${id}`, [stations, lineName, lineType, id]);
  }

  getLineStations(id: any): Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+`/api/Lines/GetLineStations?id=${id}`);
  }

  deleteLine(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.base_url + `/api/Lines/Delete?id=${id}`);
  }

  editPricelist(id: any, hour: any, day: any, month: any, year: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url + `/api/Pricelist/EditPricelist?id=${id}&hourTicket=${hour}&dayTicket=${day}&monthTicket=${month}&yearTicket=${year}`, [id, hour, day, month, year]);
  }

  addPricelist(to: any, hour: any, day: any, month: any, year: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url + `/api/Pricelist/AddPricelist?to=${to}&hourTicket=${hour}&dayTicket=${day}&monthTicket=${month}&yearTicket=${year}`, [hour, day, month, year]);
  }
}
