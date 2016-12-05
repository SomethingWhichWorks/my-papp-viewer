import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'Phrase App Viewer';

   constructor(
    private authService: AuthService,
    private router: Router) { }

    ngOnInit() {
      this.authService.logout();
    }

    ngOnDestroy() {
      this.authService.logout();
    }
}
