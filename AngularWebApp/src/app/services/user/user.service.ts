import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getUserData(email:string) {
    return this.httpClient.get('http://localhost:52295/api/Account/GetUser?email=' + email);
  }
  getUserInfo() {
    return this.httpClient.get('http://localhost:52295/api/Account/UserInfo');
  }

  uploadImage(image: any): Observable<any>{
    console.log('servis' + image);
    return this.httpClient.post(`http://localhost:52295/api/Account/UploadPhoto/`, image);
  }

  downloadImage(email: string): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:52295/api/Account/DownloadPhoto?email=`+email);
  }

  getNotActiveUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:52295/api/Account/GetNotActiveUsers`);
  }

  validateUser(email: any, validate: boolean): Observable<any>{//
    return this.httpClient.post<any>(`http://localhost:52295/api/Account/ValidateUser?email=${email}&validate=${validate}`, [email, validate]);
  }
}
