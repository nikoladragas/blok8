import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  register(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.base_url+"/api/Account/Register",user);
  }

  login(email: any, password: any){
    let data = `username=${email}&password=${password}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append( "Content-type","application/x-www-fore-urlencoded");
    console.log(email + password);

    if(!localStorage.jwt){
      this.isLoggedIn = true;
      //console.log(this.isLoggedIn);
      return this.httpClient.post(this.base_url+"/oauth/token",data,{"headers":headers}) as Observable<any>
    }
    else{
      window.location.href = "/login";
     console.log("ovde")
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

  edit(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.base_url+"/api/Account/Edit",user);
  }

  deleter(user): Observable<any>{
    console.log('deleter service');
    return this.httpClient.post(this.base_url + "/api/Account/DeleteUser", user);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
  }

  validateUser(email: any, validate: boolean): Observable<any>{//
    return this.httpClient.post<any>(`http://localhost:52295/api/Account/ValidateUser?email=${email}&validate=${validate}`, [email, validate]);
  }

  // getVehicleTypes() : Observable<any> {
  //   return this.getVehicleTypes1();
  // }
  getTypes() {
    return this.httpClient.get(this.base_url+"/api/Types/GetTypes");
  }
}
