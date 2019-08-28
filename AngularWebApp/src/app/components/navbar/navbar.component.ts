import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: any;

  constructor(private auth: AuthenticationService) { }
  ngOnInit() {
    this.loggedIn = localStorage['role'];
  }

  logout() {
    this.auth.logout();
    window.location.href = "/login"
  }
}
