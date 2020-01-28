import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Station } from '../../models/models';

declare var $: any;

@Injectable()
export class NotificationService {
  
  private proxy: any;  
  private proxyName: string = 'notifications';  
  private connection: any;  
  public connectionExists: Boolean; 

  public notificationReceived: EventEmitter < string >;  

  constructor() {  
      this.notificationReceived = new EventEmitter<string>();
      this.connectionExists = false;  
      // create a hub connection  
      console.log('pre');
      this.connection = $.hubConnection("http://localhost:52295/");
      //this.connection = new HubConnectionBuilder().withUrl("http://localhost:52295/").build();
      console.log('posle');
      console.log('JWT' + localStorage.jwt);
      this.connection.qs = { "token" : "Bearer" + localStorage.jwt }
      // create new proxy with the given name 
      this.proxy = this.connection.createHubProxy(this.proxyName);  
      
  }  
 
  // browser console will display whether the connection was successful    
  public startConnection(): Observable<Boolean> { 
      
    return Observable.create((observer) => {
       
        this.connection.start()
        .done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
            this.connectionExists = true;

            observer.next(true);
            observer.complete();
        })
        .fail((error: any) => {  
            console.log('Could not connect ' + error);
            this.connectionExists = false;

            observer.next(false);
            observer.complete(); 
        });  
      });
  }

 
  public registerForTimerEvents() : Observable<string> {
      
    return Observable.create((observer) => {

        this.proxy.on('setRealTime', (data: string) => {  
            //console.log('received time: ' + data);  
            observer.next(data);
        });  
    });      
  }

  public StopTimer() {
      this.proxy.invoke("StopTimeServerUpdates");
  }

  public StartTimer(stations: Station[]) {
      this.proxy.invoke("TimeServerUpdates", stations);
  }
}