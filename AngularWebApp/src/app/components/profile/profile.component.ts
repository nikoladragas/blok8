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
    email: ['', Validators.required],
    userType: ['', Validators.required],
    photo: ['']
  });

  userData: any;
  userProfileActivated: any;
  tmpDate = new Date();
  selectValue: any;
  userRole: any;
  imageFile: any;

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
  

  deleter(){
    console.log('jel udje');
    this.authServ.deleter(this.profileForm.value).subscribe();
    window.alert('Profile is deleted.');
    //this.authServ.logout();
    localStorage.clear();
    window.location.href = "/login";
  }

  edit(){

    let formData = new FormData();

    if(this.imageFile != null){
      formData.append('image', this.imageFile, this.imageFile.name);
      formData.append('email', this.profileForm.controls.email.value);
      this.profileForm.controls.activated.setValue('0');
      
    }

    this.authServ.edit(this.profileForm.value).subscribe(
      data=>
      {
        if(this.imageFile != null){
          this.userService.uploadImage(formData).subscribe();
        }
      }
    );
    window.alert('Profile is edited.');
  }

  onImageChange(event){
    this.imageFile = <File>event.target.files[0];
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
        this.profileForm.controls.dateOfBirth.setValue(`${bday[0]}`);   
      }
      if(this.userData.Email)
      {
        this.profileForm.controls.email.setValue(this.userData.Email);
      }
      if(this.userData.UserType)
      {
        console.log(this.userData.UserType);
        this.profileForm.controls.userType.setValue(this.userData.UserType);
      }
      });
    }
  }
}
