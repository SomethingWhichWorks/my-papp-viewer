import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
/**
 * Application components, Any new componenets goes in here
 */
import { AppComponent } from './app.component';
/**
 * Phrase App Imports
 */
import { PhraseAppSearchComponent } from './phrase-app/phrase-app-search/phrase-app-search.component';
import { PhraseAppService } from './services/phrase-app.service';
import { PhraseAppSearchService } from './services/phrase-app-search.service';
import { LoginService } from './services/login-app.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2BootstrapModule    
  ],
  declarations: [
    AppComponent,
    PhraseAppSearchComponent,
    routedComponents
  ],
  providers: [
    PhraseAppService,
    PhraseAppSearchService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
