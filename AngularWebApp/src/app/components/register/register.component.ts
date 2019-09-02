import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AuthenticationService} from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailTaken: any;
  userType: any = 'RegularUser';
  photoFile: any;
  constructor(public router: Router, private fb: FormBuilder, private authService: AuthenticationService, private userService: UserService) { }

  regForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    userType: ['RegularUser', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    photo: [''],
  }, {validator: this.checkPassword});

  ngOnInit() {
    console.log(this.regForm.valid);
  }

  onSelect(event : any)
  {
    this.userType = event.target.value;
    console.log(this.userType);

  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  register(){
    this.authService.register(this.regForm.value).subscribe( data=>{

      console.log(data);
      if(!data)
      {
        window.alert('User with email: ' + this.regForm.controls.email.value + ' already registered!')
        this.emailTaken = true;
      }
      else if (data.toString() == 200) 
      {
        let formData = new FormData();

        if(this.photoFile != null){
          formData.append('image', this.photoFile, this.photoFile.name);
          formData.append('email', this.regForm.controls.email.value);
        }
        if(this.photoFile != null){
          this.userService.uploadImage(formData).subscribe();
        }
        window.alert('Successfully registered!');
        this.emailTaken = false;
        this.login();
      }
    });
  }

  onImageChange(event){
    this.photoFile = <File>event.target.files[0];
  }

  login(){//e
    this.authService.login(this.regForm.controls.email.value, this.regForm.controls.password.value).subscribe(
      res => {
        console.log(res.access_token);
        console.log('JEL SELOGINUJE JEBOTE');

        let jwt = res.access_token;
        let jwtData = jwt.split('.')[1]
        let decodedJwtJasonData = window.atob(jwtData)
        let decodetJwtData = JSON.parse(decodedJwtJasonData)

        let role = decodetJwtData.role
        //let temp = decodetJwtData.email
        
        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
        console.log(decodetJwtData)
        console.log('Role: ' + role)
        //console.log('Password' + temp)

        let a = decodetJwtData.unique_name
        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role)
        localStorage.setItem('name',a);
        //localStorage.setItem('password', temp);
        window.location.href = "/pricelist"
      }
    );
  }

}
