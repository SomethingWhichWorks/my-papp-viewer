import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Message } from '../models/message';
import { PhraseAppService } from '../../services/phrase-app.service';
import { PhraseAppDataService } from '../../services/phrase-app-data.service';
import { ProgressBarService } from '../../progress-bar/progress-bar.service';


@Component({
  moduleId: module.id,
  selector: 'phrase-app-dashboard',
  templateUrl: 'phrase-app-dashboard.component.html',
  styleUrls: ['phrase-app-dashboard.component.css']
})

export class PhraseAppDashboardComponent implements OnInit {
  disableAll: boolean;
  lastLoadedTime: string;
  
  constructor(
    private router: Router,
    private phraseAppService: PhraseAppService,
    private PhraseAppDataService: PhraseAppDataService,
    private progessBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    var currentDate = moment().format();
    this.lastLoadedTime = currentDate;
  }

  // To be used phrase-app-search
  refreshPhraseAppData(): void {
    this.progessBarService.showDialog('Please wait until we download keys from phrase app....');
    this.disableAll = true;
    this.phraseAppService.getMessages(true).then(() => {
        var currentDate = moment().format();
        this.lastLoadedTime = currentDate;
        this.disableAll = false;
        this.progessBarService.hideDialog();
    }, () => {
       this.disableAll = false;
       this.progessBarService.hideDialog(); 
    });
  }

    // To be used phrase-app-advanced-search
    refreshPhraseAppKeys(): void {
    this.progessBarService.showDialog('Please wait until we download keys from phrase app....');
    this.disableAll = true;
    this.PhraseAppDataService.getMessages(true).then(() => {
        var currentDate = moment().format();
        this.lastLoadedTime = currentDate;
        this.disableAll = false;
        this.progessBarService.hideDialog();
    }, () => {
       this.disableAll = false;
       this.progessBarService.hideDialog(); 
    });
  }

  getLastLoaded() {
    return moment(this.lastLoadedTime).calendar();
  }
}
