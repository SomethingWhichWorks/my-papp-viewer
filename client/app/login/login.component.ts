import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.login();
  }
}
