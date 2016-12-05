import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

/**
 * Phrase App components and services
 */
import { PhraseAppDashboardComponent } from './phrase-app/phrase-app-dashboard/phrase-app-dashboard.component';
import { MessageDetailsComponent } from './phrase-app/message-details/message-details.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'phrase-app-dashboard',
    component: PhraseAppDashboardComponent
  },
  {
    path: 'messageDetails/:key',
    component: MessageDetailsComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routedComponents = [
  PhraseAppDashboardComponent,
  MessageDetailsComponent,
  LoginComponent
];
