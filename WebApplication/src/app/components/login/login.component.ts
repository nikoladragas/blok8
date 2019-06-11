import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(public router: Router, private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logIn(){
    console.log('Nikola picka mala');
    this.authService.logIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      res => {
        console.log(res.access_token);

        let jwt = res.access_token;
        let jwtData = jwt.split('.')[1]
        let decodedJwtJasonData = window.atob(jwtData)
        let decodetJwtData = JSON.parse(decodedJwtJasonData)

        let role = decodetJwtData.role
        
        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
        console.log(decodetJwtData)
        console.log('Role: ' + role)
        let a = decodetJwtData.unique_name
        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role)
        localStorage.setItem('name',a);
        window.location.href = "/pricelist"
      }
    );
  }
}
