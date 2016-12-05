import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import './rxjs-extensions';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

/**
 * Application components, Any new componenets goes in here
 */
import { AppComponent } from './app.component';
/**
 * Phrase App Imports
 */
import { PhraseAppSearchComponent } from './phrase-app/phrase-app-search/phrase-app-search.component';
import { PhraseAppAdvancedSearchComponent } from './phrase-app/phrase-app-advanced-search/phrase-app-advanced-search.component';
import { PhraseAppService } from './services/phrase-app.service';
import { PhraseAppDataService } from './services/phrase-app-data.service';
import { PhraseAppSearchService } from './services/phrase-app-search.service';
import { LoginService } from './services/login-app.service';
import { AuthService } from './services/auth.service';
import { ProgressBarService } from './progress-bar/progress-bar.service';

/**
 * Progress Bar
 */
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


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
    PhraseAppAdvancedSearchComponent,
    ProgressBarComponent,
    routedComponents
  ],
  providers: [
    PhraseAppService,
    PhraseAppDataService,
    PhraseAppSearchService,
    LoginService,
    AuthService,
    ProgressBarService,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
