import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { LoginService } from '../services/login-app.service';

class UserDetails {
  username: string;
  password: string;
};

const LoginStatus = {
  OK: 'OK', 
  NOT_OK:'NOT_OK'
};

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  userDetails: UserDetails
  errorMessage: string

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.userDetails = new UserDetails();
  }

  validateUser() {
    //Resetting message to blank
    this.errorMessage = '';
    this.loginService.authenticateUser(this.userDetails)
      .subscribe((userDetails) => {
        if (userDetails && userDetails.status === LoginStatus.OK) {
          console.log('user', userDetails.userName, ' authenticated');
          this.errorMessage = '';
          this.router.navigate(['phrase-app-dashboard']);
        } else {
          this.errorMessage = 'username or password incorrect, please try again';
          this.userDetails.username = '';
          this.userDetails.password = '';
        }
      }, (err) => {
        this.errorMessage = 'username or password incorrect, please try again';
        this.userDetails.username = '';
        this.userDetails.password = '';
      });
  }
}
