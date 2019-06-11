import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  isLoggedIn = false;
  baseUrl = "http://localhost:52295"

  register(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.baseUrl+"/api/Account/Register",user);
  }

  logIn(email: any, password: any){
    //console.log(email + password);
    let data = `username=${email}&password=${password}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append( "Content-type","application/x-www-fore-urlencoded");

    if(!localStorage.jwt){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      return this.httpClient.post(this.baseUrl+"/oauth/token",data,{"headers":headers}) as Observable<any>
    }
    else{
     // window.location.href = "/home";
    }
  
    // let httpOptions = {
    //   headers: {
    //     "Content-type":"application/x-www-fore-urlencoded"
    //   }
    // }
    // this.http.post(this.base_url+"/oauth/token",data,httpOptions).subscribe(data => {
    //   localStorage.jwt = data.access_token;
    // });
  }
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }
}
