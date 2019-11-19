import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-user-validating',
  templateUrl: './user-validating.component.html',
  styleUrls: ['./user-validating.component.css']
})
export class UserValidatingComponent implements OnInit {

  users: any[] = [];
  selectedUserEmail: any;
  photo: any;
  i: any;

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userType: ['', Validators.required],
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getNotActiveUsers();
  }

  onSelectUser(event: any){
    this.selectedUserEmail = event.target.value;
    this.loadInfo();
  }

  getNotActiveUsers(){
    this.userService.getNotActiveUsers().subscribe(
      data =>{
        console.log(data);
        this.users = data;
        if(this.users.length > 0){
          this.selectedUserEmail = this.users[0].Email;
          this.loadInfo();
        }
      }
    );
  }

  validate(){
    this.authService.validateUser(this.userForm.controls.email.value, true).subscribe(
      data =>{
        this.userForm.reset();
        this.getNotActiveUsers();
        this.photo = null;
      }
    );
  }

  deny(){
    this.authService.validateUser(this.userForm.controls.email.value, false).subscribe(
      data =>{
        this.userForm.reset();
        this.getNotActiveUsers();
        this.photo = null;
      }
    );
  }

  loadInfo(){
    for(this.i = 0; this.i < this.users.length; this.i++){
      if(this.users[this.i].Email == this.selectedUserEmail){
        this.userForm.controls.name.setValue(this.users[this.i].Name);
        this.userForm.controls.lastName.setValue(this.users[this.i].LastName);
        this.userForm.controls.address.setValue(this.users[this.i].Address);
        this.userForm.controls.dateOfBirth.setValue(this.users[this.i].DateOfBirth.split('T',1));
        this.userForm.controls.email.setValue(this.users[this.i].Email);
        this.userForm.controls.userType.setValue(this.users[this.i].UserType);
        this.userService.downloadImage(this.selectedUserEmail).subscribe(
          response => {
            if(response.toString() != "204"){
            this.photo = 'data:image/jpeg;base64,' + response;
          }
          console.log(this.photo);
          }
        );
      }
    }
  }
}
