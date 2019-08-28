import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', Validators.required]
  });

  userData: any;
  userTypeProfileType: any;
  userProfileActivated: any;
  tmpDate = new Date();
  selectValue: any;
  userRole: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, public router: Router, private authServ: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
    this.userRole = localStorage['role'];
  }

  onSelect(event: any)
  {
    this.selectValue = event.target.value;
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

      return pass == confirmPass ? null : {notSame: true}
  }
  mrs(){
    console.log("aa");
  }

  deleter(){
    console.log('jel udje');
    this.authServ.deleter(this.profileForm.value).subscribe();
    //window.alert('Profile is deleted.');
    //this.authServ.logout();
    localStorage.clear();
    //window.location.href = "/login";
  }

  edit(){
    this.authServ.edit(this.profileForm.value).subscribe();
    window.alert('Profile is edited.');
  }

  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe(data => {
      this.userData = data
      
      this.userProfileActivated = this.userProfileActivated;
      console.log('Name' + this.userData.Name + 'name' + this.userData.name)
      if(data == null)
        console.log('sranje');
      else
        console.log(data);
      
      if(this.userData.Name)
      {
        
        this.profileForm.controls.name.setValue(this.userData.Name);
      }
      if(this.userData.LastName)
      {
        this.profileForm.controls.lastName.setValue(this.userData.LastName);
      }
      if(this.userData.Address)
      {
        this.profileForm.controls.address.setValue(this.userData.Address);
      }
      if(this.userData.DateOfBirth)
      {
        console.log(this.userData.DateOfBirth)
        let bday = this.userData.DateOfBirth.split('T',2);
        this.profileForm.controls.dateOfBirth.setValue(`${bday[0]}`);   //koji je ovo apostrof
      }
      if(this.userData.Email)
      {
        this.profileForm.controls.email.setValue(this.userData.Email);
      }

      });
    }
  }
}
